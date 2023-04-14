import ActiveSoundModal from "@/components/ActiveSoundModal";
import BackToHomeButton from "@/components/BackToHomeButton";
import HowToPlay from "@/components/HowToPlay";
import { fadeIn, cascadeAnimation, typing, blink } from "@/styles/animations";
import useActions from "lib/store/actions";
import useStore from "lib/store/state";
import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Home: NextPage = () => {
  const router = useRouter();
  const { resetGame, fetchAllTeams, resetArcadePoints } = useActions();
  const PLAYED = useStore((state) => state.PLAYED);
  const APP_SOUND_MUTED = useStore((state) => state.APP_SOUND_MUTED);
  const SHOW_SOUND_MODAL = useStore((state) => state.SHOW_SOUND_MODAL);

  const startSound = new Audio("/assets/sounds/startgame.mp3");
  const intro = useRef(new Audio("/assets/sounds/intro.mp3"));
  startSound.muted = APP_SOUND_MUTED;

  const [howToPlay, setHowToPlay] = useState(false);

  const handleHowToPlay = () => {
    return setHowToPlay(!howToPlay);
  };

  const onClickPlay = () => {
    if (PLAYED) {
      router.push("result");
    } else {
      startSound.play();
      resetGame();
      router.push("play");
    }
  };

  const goToArcadeMode = () => {
    startSound.play();
    resetArcadePoints();
    fetchAllTeams();
    router.push("/arcade");
  };

  useEffect(() => {
    intro.current.muted = APP_SOUND_MUTED;
    intro.current.play();
  }, [APP_SOUND_MUTED]);

  return (
    <>
      {SHOW_SOUND_MODAL ? (
        <ActiveSoundModal />
      ) : (
        <MainContainer>
          {howToPlay ? (
            <>
              <HowToPlay handleHowToPlay={handleHowToPlay} />
            </>
          ) : (
            <>
              <HomeTitle>¿Qué club e’? </HomeTitle>
              <StartButton onClick={onClickPlay}>Comenzar</StartButton>
              <StartButton onClick={goToArcadeMode}>Arcade</StartButton>
              <TutorialButton onClick={handleHowToPlay}>
                ¿Qué es esto?
              </TutorialButton>
            </>
          )}
          <audio
            ref={intro}
            src="/assets/sounds/intro.mp3"
            autoPlay
            muted
            loop
          ></audio>
        </MainContainer>
      )}
    </>
  );
};

export default Home;

const MainContainer = styled.main`
  max-width: 100%;
  min-height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const HomeTitle = styled.h1`
  width: 10.1ch;
  padding: 0 5px;
  animation: ${typing} 2.5s steps(20), ${blink} 1s step-end infinite;
  white-space: nowrap;
  overflow: hidden;
  border-right: 1px solid;
  z-index: 2;
  height: 63px;
  line-height: 1;
  font-size: 3.5em;
  color: var(--light);
  font-weight: 100;
  margin-bottom: 1em;

  @media (max-width: 426px) {
    font-size: 3em;
    height: 55px;
  }
`;

const StartButton = styled.button`
  background: var(--light);
  padding: 10px;
  width: 7em;
  margin-bottom: 20px;
  border-radius: 50px;
  font-size: 28px;
  mix-blend-mode: screen;
  transition: all 0.2s;
  animation: ${fadeIn} 0.4s ease-in 1s both;
  &:hover {
    transform: scale(1.05);
  }
  @media (max-width: 376px) {
    padding: 10px 32px;
    font-size: 24px;
  }
`;

const TutorialButton = styled.button`
  background-color: transparent;
  color: var(--light);
  text-decoration: underline;
  font-size: 22px;
  transition: all 0.2s;
  margin-bottom: 4em;
  animation: ${fadeIn} 0.4s ease-in 1.4s both;

  &:hover {
    transform: scale(1.05);
  }
`;
