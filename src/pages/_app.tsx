import { ReactElement, ReactNode, useEffect, useState } from "react";
import type { AppProps } from "next/app";
import { NextPage } from "next";

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  return <Component {...pageProps} />;
}
