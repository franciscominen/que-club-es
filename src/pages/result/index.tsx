import Countdown from "@/components/Countdown";
import useStore from "lib/store/state";

const Result = () => {
  const POINTS = useStore((state) => state.POINTS);
  return (
    <>
      <Countdown />
      <h3>Resultado:</h3>
      <h1>{POINTS}</h1>
    </>
  );
};

export default Result;
