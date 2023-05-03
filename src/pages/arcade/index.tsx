import AnswerAnimation from "@/components/AnswerAnimation";
import ArcadeChancesAndButton from "@/components/ArcadeChancesAndButton";
import ClubImage from "@/components/ClubImage";
import InputAndKeyboard from "@/components/InputAndKeyboard";
import { fadeIn } from "@/styles/animations";
import useActions from "lib/store/actions";
import useStore from "lib/store/state";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Arcade = () => {
  const router = useRouter();
  const { incrementArcadePoints } = useActions();
  const ALL_TEAMS = useStore((state) => state.ALL_TEAMS);
  const ARCADE_STEPS = useStore((state) => state.ARCADE_STEPS);
  const APP_SOUND_MUTED = useStore((state) => state.APP_SOUND_MUTED);

  const successSound = new Audio("/assets/sounds/success-answer.mp3");
  const errorSound = new Audio("/assets/sounds/error-answer.mp3");
  successSound.muted = APP_SOUND_MUTED;
  errorSound.muted = APP_SOUND_MUTED;

  const [teamName, setTeamName] = useState("");
  const [correct, setCorrect] = useState(false);
  const [showClub, setShowClub] = useState(false);
  const [chances, setChances] = useState<number>(1);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  const ifIsCorrect = (isCorrectAnswer: boolean) => {
    if (isCorrectAnswer) {
      incrementArcadePoints();
      setCorrect(true);
      setShowClub(true);
      setTeamName("");
      clearInterval(intervalId as NodeJS.Timeout);
      successSound.play();
      setTimeout(() => {
        setShowClub(false);
      }, 2500);
    }
  };

  const ifIsNotCorrect = (isCorrectAnswer: boolean) => {
    if (!isCorrectAnswer) {
      if (chances > 0) {
        errorSound.play();
        setChances(chances - 1);
      } else {
        setCorrect(false);
        setShowClub(true);
        clearInterval(intervalId as NodeJS.Timeout);
        errorSound.play();
        setTimeout(() => {
          setShowClub(false);
          router.push("arcade-result");
        }, 2450);
      }
    }
    return;
  };

  const handleAnswer = (event: any) => {
    event.preventDefault();
    const isCorrectAnswer =
      teamName.toLowerCase() === ALL_TEAMS[ARCADE_STEPS].name.toLowerCase();

    ifIsCorrect(isCorrectAnswer);
    ifIsNotCorrect(isCorrectAnswer);
  };

  useEffect(() => {
    const newIntervalId = setInterval(() => {
      setCorrect(false);
      setShowClub(true);
      clearInterval(intervalId as NodeJS.Timeout);
      errorSound.play();
      setTimeout(() => {
        setShowClub(false);
        router.push("arcade-result");
      }, 2450);
    }, 33000);
    setIntervalId(newIntervalId);

    return () => {
      clearInterval(newIntervalId);
    };
  }, [ARCADE_STEPS]);

  return (
    <ArcadeContainer>
      <PointsContainer>
        <h1>
          {ARCADE_STEPS} <span>Pts</span>
        </h1>
      </PointsContainer>
      <div style={{ height: "calc(60vh - 200px)", margin: "8px 0" }}>
        {showClub ? (
          <AnswerAnimation isCorrect={correct} />
        ) : (
          <ClubImage
            imageSource={ALL_TEAMS[ARCADE_STEPS]?.img}
            steps={ARCADE_STEPS}
          />
        )}
      </div>
      <BottomContainer onSubmit={handleAnswer}>
        <ArcadeChancesAndButton chances={chances} teamName={teamName} />
        <InputAndKeyboard teamName={teamName} setTeamName={setTeamName} />
      </BottomContainer>
    </ArcadeContainer>
  );
};

export default Arcade;

const ArcadeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
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

const PointsContainer = styled.div`
    display: flex;
    align-items: center:
    justify-content: center;

    h1 {
        color: var(--light);
        font-weight: 100;
        font-size: 42px;
        line-height: 1;

        span {
            font-size: 20px;
        }
    }
`;
