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
      <ClerkProvider {...pageProps}>
        <Component {...pageProps} />
        <Toaster />
      </ClerkProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
