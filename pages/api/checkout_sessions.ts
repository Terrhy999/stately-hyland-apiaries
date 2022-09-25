import { NextApiRequest, NextApiResponse } from "next";

import Stripe from "stripe";

if (!process.env["STRIPE_SECRET_KEY"]) {
  throw new Error("Missing Stripe secret key");
}

const stripe = new Stripe(process.env["STRIPE_SECRET_KEY"], {
  apiVersion: "2020-08-27",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const getLineItems = () => {
    return JSON.parse(req.body);
  };

  if (req.method === "POST") {
    try {
      const session: Stripe.Checkout.Session =
        await stripe.checkout.sessions.create({
          line_items: getLineItems(),
          mode: "payment",
          shipping_address_collection: {
            allowed_countries: ["US"],
          },
          // shipping_rates: ["shr_1JPwtaKnxKfZHThpPxgjhI86"],
          shipping_options: [
            {
              shipping_rate: "shr_1JPwtaKnxKfZHThpPxgjhI86",
            },
            {
              shipping_rate: "shr_1LQ9bIKnxKfZHThpH2EcDqqV",
            },
          ],
          success_url: `${req.headers.origin}`,
          cancel_url: `${req.headers.origin}/cart`,
        });
      res.status(200).json(session);
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err });
    }
  }
}
