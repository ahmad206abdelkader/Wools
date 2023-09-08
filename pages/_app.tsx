import "@/styles/globals.css";
import type { AppProps } from "next/app";

import Layout from "@/components/Layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    // if Latout have typeError that because not have children for layout file 
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
