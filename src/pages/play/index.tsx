import AnswerAnimation from "@/components/AnswerAnimation";
import ClubImage from "@/components/ClubImage";
import InputAndKeyboard from "@/components/InputAndKeyboard";
import PlayButtonsAndChances from "@/components/PlayButtonsAndChances";
import Scoreboard from "@/components/Scoreboard";
import { slideInBottom } from "@/styles/animations";
import useActions from "lib/store/actions";
import useStore from "lib/store/state";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Play = () => {
  const router = useRouter();
  const RANDOM_TEAMS = useStore((state) => state.RANDOM_TEAMS);
  const PLAYED = useStore((state) => state.PLAYED);
  const STEPS = useStore((state) => state.STEPS);

  const {
    incrementPoints,
    setToPlayed,
    setPlayedTeams,
    updateScoreboard,
    nextStep,
  } = useActions();

  const [teamName, setTeamName] = useState("");
  const [chances, setChances] = useState<number>(1);
  const [countdown, setCountdown] = useState(10);
  const [correct, setCorrect] = useState(false);
  const [showClub, setShowClub] = useState(false);

  const onTryToAnswer = () => {
    const isCorrectAnswer =
      teamName.toLowerCase() === RANDOM_TEAMS[STEPS].name.toLowerCase();

    if (isCorrectAnswer) {
      incrementPoints();
      setCorrect(true);
      setShowClub(true);
      setTimeout(() => {
        setShowClub(false);
        updateScoreboard("✅");
      }, 2500);

      if (STEPS < RANDOM_TEAMS.length - 1) {
        setTimeout(() => {
          nextStep();
          setTeamName("");
          setChances(1);
          setCountdown(10);
        }, 2500);
      } else {
        setTimeout(() => {
          setPlayedTeams(RANDOM_TEAMS);
          setToPlayed();
          router.push("result");
        }, 2400);
      }
    } else {
      if (chances > 0) {
        setChances(chances - 1);
      } else {
        if (STEPS < RANDOM_TEAMS.length - 1) {
          setChances(1);
          setCountdown(10);
          setCorrect(false);
          setShowClub(true);
          setTimeout(() => {
            setShowClub(false);
            updateScoreboard("❌");
            setTeamName("");
            nextStep();
          }, 2500);
        } else {
          setCorrect(false);
          setShowClub(true);
          setTimeout(() => {
            setShowClub(false);
            updateScoreboard("❌");
            setPlayedTeams(RANDOM_TEAMS);
            setToPlayed();
            router.push("result");
          }, 2500);
        }
      }
    }
  };

  const onPass = () => {
    if (STEPS < RANDOM_TEAMS.length - 1) {
      setTeamName("");
      setChances(1);
      setCountdown(10);
      setCorrect(false);
      setShowClub(true);
      setTimeout(() => {
        setShowClub(false);
        updateScoreboard("❌");
        nextStep();
      }, 2500);
    } else {
      setPlayedTeams(RANDOM_TEAMS);
      setToPlayed();
      updateScoreboard("❌");
      setCorrect(false);
      setTimeout(() => {
        setShowClub(true);
      }, 1300);
      router.push("result");
    }
  };

  useEffect(() => {
    PLAYED ? router.push("result") : null;
  }, [PLAYED, router]);

  /* useEffect(() => {
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
  }, [STEPS]); */

  return (
    <>
      <MainContainer>
        <PlayWrapper>
          <Scoreboard small={false} />

          {showClub ? <AnswerAnimation isCorrect={correct} /> : <ClubImage />}

          <BottomContainer>
            <PlayButtonsAndChances
              onTryToAnswer={onTryToAnswer}
              onPass={onPass}
              chances={chances}
              teamName={teamName}
              passDisabled={showClub}
            />
            <InputAndKeyboard teamName={teamName} setTeamName={setTeamName} />
          </BottomContainer>
        </PlayWrapper>
      </MainContainer>
    </>
  );
};

export default Play;

const MainContainer = styled.main`
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  background-image: url("/assets/backgrounds/bg-play.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position-y: center;
  background-position-x: right;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: 16px;
  overflow-y: hidden;
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

const BottomContainer = styled.div`
  width: 100%;
  animation: ${slideInBottom} 0.7s ease both;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
