import { ReactElement, ReactNode, useEffect } from "react";
import type { AppProps } from "next/app";
import { NextPage } from "next";
import api from "./api/api";

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  useEffect(() => {
    async function fetchTeams() {
      const data = await fetch("/api/data");
      const teams = await data.json();
      console.log(teams);
    }

    fetchTeams();
  }, []);
  return <Component {...pageProps} />;
}
