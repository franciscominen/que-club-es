import useStore from "lib/store/state";

const Result = () => {
  const POINTS = useStore((state) => state.POINTS);
  return (
    <>
      <h3>Resultado:</h3>
      <h1>{POINTS}</h1>
    </>
  );
};

export default Result;
