import "../styles/globals.css";
import Layout from "../components/Layout";
import type { AppProps } from "next/app";
import CartContext from "../context/CartContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartContext.Provider value={{ cart: [] }}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CartContext.Provider>
  );
}

export default MyApp;
