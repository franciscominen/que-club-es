import useActions from "lib/store/actions";
import { NextPage } from "next";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const router = useRouter();
  const { checkIsPlayed } = useActions();

  const onClickPlay = () => {
    if (checkIsPlayed()) {
      return router.push("result");
    } else {
      return router.push("play");
    }
  };

  return (
    <main>
      <h1>Que Club es?</h1>
      <button onClick={onClickPlay}>JUGAR</button>
    </main>
  );
};

export default Home;
