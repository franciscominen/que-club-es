import InputAndKeyboard from "@/components/InputAndKeyboard";
import PlayButtonsAndChances from "@/components/PlayButtonsAndChances";
import Scoreboard from "@/components/Scoreboard";
import useActions from "lib/store/actions";
import useStore from "lib/store/state";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Play = () => {
  const router = useRouter();
  const RANDOM_TEAMS = useStore((state) => state.RANDOM_TEAMS);
  const PLAYED = useStore((state) => state.PLAYED);

  const { incrementPoints, setToPlayed, setPlayedTeams, updateScoreboard } =
    useActions();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [disable, setDisable] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [chances, setChances] = useState<number>(1);
  const [countdown, setCountdown] = useState(10);

  const onTryToAnswer = () => {
    const isCorrectAnswer =
      teamName.toLowerCase() === RANDOM_TEAMS[currentIndex].name.toLowerCase();

    if (isCorrectAnswer) {
      incrementPoints();
      updateScoreboard("O");

      if (currentIndex < RANDOM_TEAMS.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setTeamName("");
        setChances(1);
        setCountdown(10);
      } else {
        setPlayedTeams(RANDOM_TEAMS);
        setToPlayed();
        router.push("result");
      }
    } else {
      // const maxChances = 2;
      console.log(chances);

      if (chances > 0) {
        setChances(chances - 1);
      } else {
        if (currentIndex < RANDOM_TEAMS.length - 1) {
          setCurrentIndex(currentIndex + 1);
          setTeamName("");
          setChances(1);
          setCountdown(10);
          updateScoreboard("X");
        } else {
          updateScoreboard("X");

          setPlayedTeams(RANDOM_TEAMS);
          setToPlayed();
          router.push("result");
        }
      }
    }
  };

  const onPass = () => {
    if (currentIndex < RANDOM_TEAMS.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setTeamName("");
      setChances(1);
      setCountdown(10);
      updateScoreboard("X");
    } else {
      setPlayedTeams(RANDOM_TEAMS);
      setToPlayed();
      updateScoreboard("X");

      router.push("result");
    }
  };

  useEffect(() => {
    PLAYED ? router.push("result") : null;
  }, [PLAYED, router]);

  useEffect(() => {
    teamName.length ? setDisable(false) : setDisable(true);
  }, [teamName]);

  /*   useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(countdown - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [countdown]);

  useEffect(() => {
    const interval = setInterval(() => {
      onPass();
      setCountdown(10);
    }, 10000);

    return () => clearInterval(interval);
  }, [currentIndex]); */

  return (
    <>
      <MainContainer>
        <PlayWrapper>
          <Scoreboard small={false} />
          <img
            src={RANDOM_TEAMS[currentIndex]?.img}
            alt="Please Reload"
            style={{ width: "150px" }}
          />
          <PlayButtonsAndChances
            onTryToAnswer={onTryToAnswer}
            onPass={onPass}
            chances={chances}
          />
          <InputAndKeyboard teamName={teamName} setTeamName={setTeamName} />
        </PlayWrapper>
      </MainContainer>
    </>
  );
};

export default Play;

const MainContainer = styled.main`
  width: 100%;
  min-height: 100vh;
  margin: 0 auto;
  background-image: url("/assets/backgrounds/bg-play.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position-y: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const PlayWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 16px;
  width: 100%;
  max-width: 500px;
  padding: 0 4%;
`;
