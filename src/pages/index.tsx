import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  const router = useRouter();

  const onClickPlay = () => {
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
