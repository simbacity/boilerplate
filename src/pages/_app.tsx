import Head from "next/head";
import { type AppType } from "next/app";

import { Toaster } from "@/components/ui/toaster";

import { api } from "@/utils/api";

import "@/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ClerkProvider
        {...pageProps}
        appearance={{
          layout: {
            logoImageUrl: "/logo.svg",
            socialButtonsVariant: "blockButton",
            socialButtonsPlacement: "bottom",
          },
          variables: {
            colorPrimary: "#d1d5db",
            borderRadius: "4px",
          },
          elements: {
            card: "shadow-none border-slate-200",
            footerActionLink: "text-slate-500 hover:text-slate-600",
            headerSubtitle: "hidden",
          },
        }}
      >
        <Component {...pageProps} />
        <Toaster />
      </ClerkProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
