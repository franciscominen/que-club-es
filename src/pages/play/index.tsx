import useActions from "lib/store/actions";
import useStore from "lib/store/state";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Play = () => {
  const router = useRouter();
  const IS_LOADING = useStore((state) => state.IS_LOADING);
  const RANDOM_TEAMS = useStore((state) => state.RANDOM_TEAMS);

  const { checkIsPlayed, incrementPoints, setToPlayed, setPlayedTeams } =
    useActions();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [disable, setDisable] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [chances, setChances] = useState(1);

  const handleChange = (e: any) => {
    setTeamName(e.target.value);
  };

  const handleClick = () => {
    const isCorrectAnswer =
      teamName.toLowerCase() === RANDOM_TEAMS[currentIndex].name.toLowerCase();

    if (isCorrectAnswer) {
      incrementPoints();

      if (currentIndex < RANDOM_TEAMS.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setTeamName("");
        setChances(1);
      } else {
        setPlayedTeams(RANDOM_TEAMS);
        setToPlayed();
        router.push("result");
      }
    } else {
      const maxChances = 2;

      if (chances < maxChances) {
        setChances(chances + 1);
      } else {
        if (currentIndex < RANDOM_TEAMS.length - 1) {
          setCurrentIndex(currentIndex + 1);
          setTeamName("");
          setChances(1);
        } else {
          setPlayedTeams(RANDOM_TEAMS);
          setToPlayed();
          router.push("result");
        }
      }
    }
  };

  useEffect(() => {
    if (checkIsPlayed()) {
      router.push("result");
    }
  }, [checkIsPlayed, router]);

  useEffect(() => {
    teamName.length ? setDisable(false) : setDisable(true);
  }, [teamName]);

  return (
    <>
      {IS_LOADING ? (
        <h1>CARGANDO...</h1>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <h3>{currentIndex + 1} </h3>
          <img
            src={RANDOM_TEAMS[currentIndex]?.img}
            alt="Please Reload"
            style={{ width: "150px" }}
          />
          <input type="text" value={teamName} onChange={handleChange} />
          <button disabled={disable} onClick={handleClick}>
            SIGUIENTE
          </button>
          <p>Chances: {chances}/2</p>
        </div>
      )}
    </>
  );
};

export default Play;
