import "../styles/globals.css";
import Layout from "../components/Layout";
import type { AppProps } from "next/app";
import CartProvider from "../context/CartContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CartProvider>
  );
}

export default MyApp;
