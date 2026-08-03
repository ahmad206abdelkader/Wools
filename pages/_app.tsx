import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import dynamic from "next/dynamic";

import AppLayout from "@/components/layout/AppLayout";
import RegisterModal from "@/components/modals/RegisterModal";
import LoginModal from "@/components/modals/LoginModal";
import "@/styles/globals.css";
import EditModal from "@/components/modals/EditModal";

const Toaster = dynamic(
  () => import("react-hot-toast").then((module) => module.Toaster),
  { ssr: false },
);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            background: "#171c22",
            color: "#f8fafc",
            border: "1px solid #2b333c",
          },
        }}
      />
      <EditModal />
      <RegisterModal />
      <LoginModal />
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </SessionProvider>
  );
}
