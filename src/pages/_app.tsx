import { ReactElement, ReactNode, useEffect, useState } from "react";
import type { AppProps } from "next/app";
import { NextPage } from "next";
import Head from "next/head";
import useActions from "lib/store/actions";
import useStore from "lib/store/state";
import GlobalStyle from "@/styles/globals";
import Loader from "@/components/Loader";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const { fetchFiveTeams, checkIsPlayed, fetchAllTeams } = useActions();
  const [isSSR, setIsSSR] = useState(true);
  const RANDOM_TEAMS = useStore((state) => state.RANDOM_TEAMS);

  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: any) => {
      useStore.setState({ IS_LOADING: true });
    };

    const handleRouteChangeComplete = () => {
      useStore.setState({ IS_LOADING: false });
    };

    router.events.on("routeChangeStart", handleRouteChange);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, [router.events]);

  useEffect(() => {
    setIsSSR(false);
    fetchFiveTeams();
    fetchAllTeams();
  }, []);

  useEffect(() => {
    checkIsPlayed();
  }, [RANDOM_TEAMS]);

  if (isSSR) return null;

  return (
    <>
      <Head>
        <link rel="icon" type="image/png" href="/assets/favicon.png" />
        <title>¿Qué club e’?</title>

        <meta property="og:url" content="https://queclube.vercel.app/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="¿Qué club e’?" />
        <meta
          property="og:description"
          content="Cinco escudos aleatorios del Fútbol Argentino cada 24hs. Los sacas? 🤔"
        />
        <meta
          property="og:image"
          itemProp="image"
          content="https://firebasestorage.googleapis.com/v0/b/que-club-e.appspot.com/o/seo-cover.png?alt=media&token=9929e60f-48dd-4913-a358-7265fdb2a5a1"
        />
        <meta
          property="og:image:secure_url"
          content="https://firebasestorage.googleapis.com/v0/b/que-club-e.appspot.com/o/seo-cover.png?alt=media&token=9929e60f-48dd-4913-a358-7265fdb2a5a1"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@superlista_ar" />
        <meta name="twitter:creator" content="@franminen" />
        <meta name="twitter:title" content="¿Qué club e’?" />
        <meta
          name="twitter:description"
          content="Cinco escudos aleatorios del Fútbol Argentino cada 24hs. Los sacas? 🤔"
        />
        <meta
          name="twitter:image"
          content="https://firebasestorage.googleapis.com/v0/b/que-club-e.appspot.com/o/seo-cover.png?alt=media&token=9929e60f-48dd-4913-a358-7265fdb2a5a1"
        />
      </Head>
      <GlobalStyle />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
