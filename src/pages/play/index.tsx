import AnswerAnimation from "@/components/AnswerAnimation";
import ClubImage from "@/components/ClubImage";
import InputAndKeyboard from "@/components/InputAndKeyboard";
import PlayButtonsAndChances from "@/components/PlayButtonsAndChances";
import Scoreboard from "@/components/Scoreboard";
import { fadeIn, slideInTop } from "@/styles/animations";
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
  const APP_SOUND_MUTED = useStore((state) => state.APP_SOUND_MUTED);

  const successSound = new Audio("/assets/sounds/success-answer.mp3");
  const errorSound = new Audio("/assets/sounds/error-answer.mp3");
  successSound.muted = APP_SOUND_MUTED;
  errorSound.muted = APP_SOUND_MUTED;

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
      console.log("Chances: ", chances);

      if (chances > 0) {
        errorSound.play();
        setChances(chances - 1);
        console.log("Chances");
      } else {
        console.log("On Pass");
        onPass();
      }
    }
    return;
  };

  const handleAnswer = (event: any) => {
    event.preventDefault();
    const isCorrectAnswer =
      teamName.toLowerCase() === RANDOM_TEAMS[STEPS].name.toLowerCase();

    ifIsCorrect(isCorrectAnswer);
    ifIsNotCorrect(isCorrectAnswer);
  };

  useEffect(() => {
    PLAYED ? router.push("result") : null;
  }, [PLAYED, router]);

/*   useEffect(() => {
    const newIntervalId = setInterval(() => {
      onPass();
    }, 33000);
    setIntervalId(newIntervalId);

    return () => {
      clearInterval(newIntervalId);
    };
  }, [STEPS]); */

  return (
    <PlayWrapper>
      <ScoreboardContainer>
        <Scoreboard small={false} />
      </ScoreboardContainer>

      {showClub ? (
        <AnswerAnimation isCorrect={correct} />
      ) : (
        <ClubImage imageSource={RANDOM_TEAMS[STEPS]?.img} steps={STEPS} />
      )}

      <BottomContainer onSubmit={handleAnswer}>
        <PlayButtonsAndChances
          onPass={onPass}
          chances={chances}
          teamName={teamName}
          passDisabled={showClub}
        />
        <InputAndKeyboard teamName={teamName} setTeamName={setTeamName} />
      </BottomContainer>
    </PlayWrapper>
  );
};

export default Play;

const PlayWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  // gap: 16px;
  width: 100%;
  height: calc(var(--vh, 1vh) * 100);
  max-width: 550px;
  padding: 1em 2% 2.5em 2%;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    height: calc(var(--vh, 1vh) * 90);
    justify-content: flex-start;
    gap: 16px;
  }
`;

const BottomContainer = styled.form`
  flex: 0 0 auto;
  width: 100%;
  animation: ${fadeIn} 0.7s ease both;
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (max-width: 376px) {
    gap: 8px;
  }
`;

const ScoreboardContainer = styled.div`
  flex: 0 0 auto;
  animation: ${slideInTop} 0.7s ease both;
`;
