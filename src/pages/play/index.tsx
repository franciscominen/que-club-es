import useActions from "lib/store/actions";
import useStore from "lib/store/state";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Play = () => {
  const router = useRouter();
  const IS_LOADING = useStore((state) => state.IS_LOADING);
  const RANDOM_TEAMS = useStore((state) => state.RANDOM_TEAMS);
  const { getLogos, incrementPoints } = useActions();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [disable, setDisable] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [chances, setChances] = useState(1);

  const handleChange = (e) => {
    setTeamName(e.target.value);
  };

  const handleClick = () => {
    if (teamName === RANDOM_TEAMS[currentIndex].name.toLowerCase()) {
      if (currentIndex < RANDOM_TEAMS.length - 1) {
        incrementPoints();
        setCurrentIndex(currentIndex + 1);
        setTeamName("");
        setChances(1);
      }
      if (currentIndex === 4) {
        incrementPoints();
        router.push("result");
      }
    } else if (chances === 3) {
      if (currentIndex === 4) {
        router.push("result");
      } else {
        setCurrentIndex(currentIndex + 1);
        setTeamName("");
        setChances(1);
      }
    } else {
      setChances(chances + 1);
    }
  };

  useEffect(() => {
    teamName.length ? setDisable(false) : setDisable(true);
  }, [teamName]);

  /* useEffect(() => {
    getLogos();
  }, []); */

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
          <p>Chances: {chances}/3</p>
        </div>
      )}
    </>
  );
};

export default Play;
