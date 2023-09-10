import "@/styles/globals.css";
import type { AppProps } from "next/app";

import Layout from "@/components/Layout";
import RegisterModal from "@/components/modals/RegisterModal";
import LoginModal from "@/components/modals/LoginModal";

export default function App({ Component, pageProps }: AppProps) {
  return (
    // if Latout have typeError that because not have children for layout file
    <>
    <RegisterModal />
    <LoginModal />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
