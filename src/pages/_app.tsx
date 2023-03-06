import { ReactElement, ReactNode, useEffect, useState } from "react";
import type { AppProps } from "next/app";
import { NextPage } from "next";
import useClearLocalStorage from "lib/hooks/useClearLocalStorage";
import useActions from "lib/store/actions";

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const { fetchTeams } = useActions();
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    fetchTeams();
    setIsSSR(false);
  }, []);

  if (isSSR) return null;

  return <Component {...pageProps} />;
}
