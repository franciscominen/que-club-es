import InputAndKeyboard from "@/components/InputAndKeyboard";
import useActions from "lib/store/actions";
import useStore from "lib/store/state";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Play = () => {
  const router = useRouter();
  const RANDOM_TEAMS = useStore((state) => state.RANDOM_TEAMS);
  const PLAYED = useStore((state) => state.PLAYED);

  const { incrementPoints, setToPlayed, setPlayedTeams } = useActions();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [disable, setDisable] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [chances, setChances] = useState(1);

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
    PLAYED ? router.push("result") : null;
  }, [PLAYED, router]);

  useEffect(() => {
    teamName.length ? setDisable(false) : setDisable(true);
  }, [teamName]);

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <h3>{currentIndex + 1} </h3>
        <img
          src={RANDOM_TEAMS[currentIndex]?.img}
          alt="Please Reload"
          style={{ width: "150px" }}
        />
        <button disabled={disable} onClick={handleClick}>
          SIGUIENTE
        </button>
        <p>Chances: {chances}/2</p>

        <InputAndKeyboard teamName={teamName} setTeamName={setTeamName} />
      </div>
    </>
  );
};

export default Play;
