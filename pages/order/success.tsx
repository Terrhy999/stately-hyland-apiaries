import Head from "next/head";
import { connectToStripe, connectToTestStripe } from "../../lib/stripeUtils";
import { GetServerSidePropsContext } from "next";
import { useContext, useEffect } from "react";
import { CartContext } from "../../context/CartContext";

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const stripe = connectToTestStripe();

  const { session_id } = context.query;

  if (typeof session_id != "string") {
    throw new Error("No session id in query");
  }

  //Check shipping, if local pickup
  //tell them we we will contact them shortly on a convienent time to picup their order
  //display their order details
  //empty their cart

  const session = await stripe.checkout.sessions.retrieve(session_id);

  return {
    props: {
      session,
    },
  };
};

const Success = () => {
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
      <div>
        Success! Thank you for your purchase from Stately Hyland Apiaries, if
        you have any questions
      </div>
    </>
  );
};

export default Success;
