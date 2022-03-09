import { NextApiRequest, NextApiResponse } from "next";

import Stripe from "stripe";

if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
  throw new Error("Missing Stripe secret key");
}

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY, {
  apiVersion: "2020-08-27",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const session: Stripe.Checkout.Session =
        await stripe.checkout.sessions.create({
          line_items: [
            {
              price: "pricePlaceholder",
              quantity: 1,
            },
          ],
          mode: "payment",
          success_url: `${req.headers.origin}/?sucess=true`,
          cancel_url: `${req.headers.origin}/?canceled=true`,
        });
      res.status(200).json(session);
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  }
}
