import { ReactElement, ReactNode, useEffect, useState } from "react";
import type { AppProps } from "next/app";
import { NextPage } from "next";
import Head from "next/head";
import useActions from "lib/store/actions";
import useStore from "lib/store/state";
import GlobalStyle from "@/styles/globals";
import Loader from "@/components/Loader";

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const { fetchTeams, checkIsPlayed } = useActions();
  const [isSSR, setIsSSR] = useState(true);
  const IS_LOADING = useStore((state) => state.IS_LOADING);
  const RANDOM_TEAMS = useStore((state) => state.RANDOM_TEAMS);

  useEffect(() => {
    setIsSSR(false);
    fetchTeams();
  }, []);

  useEffect(() => {
    checkIsPlayed();
  }, [RANDOM_TEAMS]);


  console.log(RANDOM_TEAMS);
  

  if (isSSR) return null;

  return (
    <>
      <Head>
        <link rel="icon" type="image/png" href="/assets/favicon.png" />
        <title>¿Qué club e?</title>
      </Head>
      <GlobalStyle />
      {IS_LOADING ? <Loader /> : <Component {...pageProps} />}
    </>
  );
}
