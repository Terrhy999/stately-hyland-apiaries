import type { NextApiRequest, NextApiResponse } from "next";
import { connectToStripe } from "../../lib/stripeUtils";
import Stripe from "stripe";

export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = connectToStripe();

if (process.env["STRIPE_WEBHOOK_SECRET"] == undefined) {
  throw new Error("Missing Stripe webhook secret");
}
if (process.env["PUSHOVER_USER_KEY"] == undefined) {
  throw new Error("Missing Pushover User Key");
}
if (process.env["PUSHOVER_ACCESS_TOKEN"] == undefined) {
  throw new Error("Missing Pushover Access Token");
}
const endpointSecret = process.env["STRIPE_WEBHOOK_SECRET"];
const pushoverUserKey = process.env["PUSHOVER_USER_KEY"]; // Your Pushbullet API token
const pushoverAccessToken = process.env["PUSHOVER_ACCESS_TOKEN"];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).send("Method Not Allowed");

  const sig = req.headers["stripe-signature"];

  if (!sig) {
    console.error("Stripe signature is missing.");
    return res.status(400).send("Missing Stripe signature.");
  }

  const rawBody = await new Promise<Buffer>((resolve, reject) => {
    let data = "";

    req.on("data", (chunk) => {
      data += chunk;
    });

    req.on("end", () => {
      resolve(Buffer.from(data));
    });

    req.on("error", (err) => reject(err));
  });

  let event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
  } catch (err) {
    if (err instanceof Error) {
      console.error("Webhook signature verification failed.", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    console.error(
      "Webhook signature verification failed with an unknown error."
    );
    return res.status(400).send(`Webhook Error: Unkown Error`);
  }

  switch (event.type) {
    case "checkout.session.completed":
      if (isCheckoutSession(event.data.object)) {
        const session = event.data.object;
        const customerEmail =
          session.customer_details?.email || "Unknown Email";
        const customerName = session.shipping_details?.name || "Unknown Name";
        const shippingAddress = session.shipping_details?.address
          ? `${session.shipping_details.address.line1}, ${session.shipping_details.address.city}, ${session.shipping_details.address.country}`
          : "No shipping address";

        const lineItemsResponse = await stripe.checkout.sessions.listLineItems(
          session.id
        );

        const lineItems =
          lineItemsResponse.data
            .map((item) => {
              const quantity = item.quantity || 0;
              const name = item.description || "No Name";
              const price = item.amount_total / 100;
              return `${quantity} x ${name} - $${price.toFixed(2)}`;
            })
            .join("\n") || "No line items";

        const totalAmount = (session.amount_total || 0) / 100;
        const stripeLink = `https://dashboard.stripe.com/payments/${session.payment_intent}`;

        try {
          await sendPushNotification(
            `New Sale! Buyer: ${customerName} (${customerEmail})\n` +
              `Address: ${shippingAddress}\n\n` +
              `Items:\n${lineItems}\n\n` +
              `Total: $${totalAmount.toFixed(2)}\n` +
              `View in Stripe: ${stripeLink}`
          );
          res.status(200).send("Event received");
        } catch (error) {
          console.error("Error sending notification:", error);
          res.status(500).send("Failed to send notification.");
        }
      }
      break;

    default:
      console.log(`Unhandled event type: ${event.type}`);
      res.status(200).send("Event type not handled");
      break;
  }
}

function isCheckoutSession(object: any): object is Stripe.Checkout.Session {
  return object && object.object === "checkout.session";
}

async function sendPushNotification(message: string) {
  const url = "https://api.pushover.net:443/1/messages.json";

  const body = {
    token: pushoverAccessToken,
    user: pushoverUserKey,
    message,
    sound: "cashregister",
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/JSON",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(
      `Error sending Pushover notification: ${response.statusText}`
    );
  }
}
