import useActions from "lib/store/actions";
import useStore from "lib/store/state";
import { NextPage } from "next";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const router = useRouter();
  const { resetPoints } = useActions();
  const PLAYED = useStore((state) => state.PLAYED);

  const onClickPlay = () => {
    if (PLAYED) {
      router.push("result");
    } else {
      resetPoints();
      router.push("play");
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
