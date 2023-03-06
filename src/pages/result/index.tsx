import Countdown from "@/components/Countdown";
import useStore from "lib/store/state";
import { useRouter } from "next/router";

const Result = () => {
  const router = useRouter();
  const POINTS = useStore((state) => state.POINTS);
  const PLAYED = useStore((state) => state.PLAYED);

  const goToPlay = () => {
    return router.push("/play");
  };

  return (
    <>
      {PLAYED ? (
        <>
          <Countdown />
          <h3>Resultado:</h3>
          <h1>{POINTS}</h1>
        </>
      ) : (
        <>
          <h3>Parece que todavia no jugaste!</h3>
          <button onClick={goToPlay}>Jugar</button>
        </>
      )}
    </>
  );
};

export default Result;
