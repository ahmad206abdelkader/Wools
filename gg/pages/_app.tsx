import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";

import Layout from "@/components/Layout";
import RegisterModal from "@/components/modals/RegisterModal";
import LoginModal from "@/components/modals/LoginModal";
import EditModal from "@/components/modals/EditModal";

import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    // if Latout have typeError that because not have children for layout file
    <SessionProvider session={pageProps.session}>
      <Toaster />
    <EditModal />
    <RegisterModal />
    <LoginModal />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}
