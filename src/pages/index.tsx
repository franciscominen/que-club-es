import useStore from "lib/store/state";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  const router = useRouter();
  const PLAYED = useStore((state) => state.PLAYED);

  const onClickPlay = () => {
   /*  if (PLAYED) {
      return router.push("result");
    } else {
    } */
    return router.push("play");
  };

  return (
    <main>
      <h1>Que Club es?</h1>
      <button onClick={onClickPlay}>JUGAR</button>
    </main>
  );
};

export default Home;
