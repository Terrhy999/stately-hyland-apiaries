import Head from "next/head";
import { connectToStripe } from "../../lib/stripeUtils";
import { GetServerSidePropsContext } from "next";
import { useContext, useEffect } from "react";
import { CartContext } from "../../context/CartContext";

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const stripe = connectToStripe();

  const { session_id } = context.query;

  if (typeof session_id != "string") {
    throw new Error("No session id in query");
  }

  const checkoutSession = await stripe.checkout.sessions.retrieve(session_id);

  const shippingRate = await stripe.shippingRates.retrieve(
    checkoutSession.shipping_cost.shipping_rate
  );

  return {
    props: {
      shipping_id: shippingRate.id,
    },
  };
};

const Success = ({ shipping_id }: { shipping_id: string }) => {
  const { cartState, updateCart } = useContext(CartContext);

  useEffect(() => {
    updateCart(cartState, {
      type: "emptyCart",
      payload: null,
    });
  }, []);

  return (
    <>
      <Head>
        <title>Success!</title>
      </Head>
      <div className="flex flex-col w-full">
        <h1 className="text-4xl self-center">Success!</h1>

        <div className="py-2">
          Thank you for your purchase from Stately Hyland Apiaries!
        </div>

        {shipping_id == "shr_1MIYrkKnxKfZHThp0aTqPLGk" ? (
          <div className="py-2">
            You've chosen local pickup, we'll reach out to you shortly to let
            you know when your order is ready, then you can pick it up at 27
            Marquette rd, Montclair NJ 07043.
          </div>
        ) : (
          <div className="py-2">
            You've chosen USPS delivery, we will ship your order out shortly and
            you will receive a tracking number when we do!
          </div>
        )}

        <div>
          If you have and questions or concerns you can contact us at{" "}
          <a
            href="mailto:statelyhylandapiaries@gmail.com"
            className="text-shaGreen visited:text-purple-900"
          >
            StatelyHylandApiaries@gmail.com
          </a>
        </div>
      </div>
    </>
  );
};

export default Success;
