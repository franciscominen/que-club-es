import AnswerAnimation from "@/components/AnswerAnimation";
import ClubImage from "@/components/ClubImage";
import InputAndKeyboard from "@/components/InputAndKeyboard";
import PlayButtonsAndChances from "@/components/PlayButtonsAndChances";
import Scoreboard from "@/components/Scoreboard";
import { slideInBottom, slideInTop } from "@/styles/animations";
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

  const successSound = new Audio("/assets/sounds/success-answer.mp3");
  const errorSound = new Audio("/assets/sounds/error-answer.mp3");

  const {
    incrementPoints,
    setToPlayed,
    setPlayedTeams,
    updateScoreboard,
    nextStep,
  } = useActions();

  const [teamName, setTeamName] = useState("");
  const [chances, setChances] = useState<number>(1);
  const [correct, setCorrect] = useState(false);
  const [showClub, setShowClub] = useState(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  const onPass = () => {
    if (STEPS < RANDOM_TEAMS.length - 1) {
      setTeamName("");
      setChances(1);
      setCorrect(false);
      setShowClub(true);
      clearInterval(intervalId as NodeJS.Timeout);
      errorSound.play();
      setTimeout(() => {
        setShowClub(false);
        updateScoreboard("❌");
        nextStep();
      }, 2500);
    } else {
      setCorrect(false);
      setShowClub(true);
      clearInterval(intervalId as NodeJS.Timeout);
      errorSound.play();
      setTimeout(() => {
        setShowClub(false);
        updateScoreboard("❌");
        setPlayedTeams(RANDOM_TEAMS);
        setToPlayed();
        router.push("result");
      }, 2450);
    }
  };

  const ifIsCorrect = (isCorrectAnswer: boolean) => {
    if (isCorrectAnswer) {
      incrementPoints();
      setCorrect(true);
      setShowClub(true);
      clearInterval(intervalId as NodeJS.Timeout);
      successSound.play();
      setTimeout(() => {
        setShowClub(false);
        updateScoreboard("✅");
      }, 2500);

      if (STEPS < RANDOM_TEAMS.length - 1) {
        setTimeout(() => {
          nextStep();
          setTeamName("");
          setChances(1);
        }, 2500);
      } else {
        clearInterval(intervalId as NodeJS.Timeout);
        successSound.play();
        setTimeout(() => {
          setPlayedTeams(RANDOM_TEAMS);
          setToPlayed();
          router.push("result");
        }, 2450);
      }
    }
    return;
  };

  const ifIsNotCorrect = (isCorrectAnswer: boolean) => {
    if (!isCorrectAnswer) {
      if (chances > 0) {
        errorSound.play();
        setChances(chances - 1);
      } else {
        onPass();
      }
    }
    return;
  };

  const handleAnswer = () => {
    const isCorrectAnswer =
      teamName.toLowerCase() === RANDOM_TEAMS[STEPS].name.toLowerCase();

    ifIsCorrect(isCorrectAnswer);
    ifIsNotCorrect(isCorrectAnswer);
  };

  useEffect(() => {
    PLAYED ? router.push("result") : null;
  }, [PLAYED, router]);

  useEffect(() => {
    const newIntervalId = setInterval(() => {
      onPass();
    }, 33000);
    setIntervalId(newIntervalId);

    return () => {
      clearInterval(newIntervalId);
    };
  }, [STEPS]);

  return (
    <>
      <MainContainer>
        <PlayWrapper>
          <ScoreboardContainer>
            <Scoreboard small={false} />
          </ScoreboardContainer>

          {showClub ? <AnswerAnimation isCorrect={correct} /> : <ClubImage />}

          <BottomContainer>
            <PlayButtonsAndChances
              handleAnswer={handleAnswer}
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

const ScoreboardContainer = styled.div`
  animation: ${slideInTop} 0.7s ease both;
`;
