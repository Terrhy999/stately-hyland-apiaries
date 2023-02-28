import "../styles/globals.css";
import Layout from "../components/Layout";
import type { AppProps } from "next/app";
import CartProvider from "../context/CartContext";
import { Analytics } from "@vercel/analytics/react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <Analytics />
    </CartProvider>
  );
}

export default MyApp;
