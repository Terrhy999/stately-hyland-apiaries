import { NextApiRequest, NextApiResponse } from "next";
import { connectToStripe } from "../../lib/stripeUtils";
import Stripe from "stripe";

const stripe = connectToStripe();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const lineItems = JSON.parse(req.body);

  const shipping_options_live = [
    {
      shipping_rate: "shr_1JPwtaKnxKfZHThpPxgjhI86",
    },
    {
      shipping_rate: "shr_1LQ9bIKnxKfZHThpH2EcDqqV",
    },
  ];

  // const shipping_options_test = [
  //   {
  //     shipping_rate: "shr_1MIYs2KnxKfZHThpqp9e7XLl",
  //   },
  //   {
  //     shipping_rate: "shr_1MIYrkKnxKfZHThp0aTqPLGk",
  //   },
  // ];

  if (req.method === "POST") {
    try {
      const session: Stripe.Checkout.Session =
        await stripe.checkout.sessions.create({
          line_items: lineItems,
          mode: "payment",
          shipping_address_collection: {
            allowed_countries: ["US"],
          },
          shipping_options: shipping_options_live,
          success_url: `${req.headers.origin}/order/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${req.headers.origin}/cart`,
        });
      res.status(200).json(session);
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err });
    }
  }
}
