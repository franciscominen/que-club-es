import BackToHomeButton from "@/components/BackToHomeButton";
import HowToPlay from "@/components/HowToPlay";
import { fadeIn, cascadeAnimation } from "@/styles/animations";
import useActions from "lib/store/actions";
import useStore from "lib/store/state";
import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Home: NextPage = () => {
  const router = useRouter();
  const { resetGame } = useActions();
  const PLAYED = useStore((state) => state.PLAYED);

  const startSound = new Audio("/assets/sounds/startgame.mp3");
  const intro = useRef(new Audio("/assets/sounds/intro.mp3"));

  const [howToPlay, setHowToPlay] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

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

  const togglePlayAudio = () => {
    setIsPlayingAudio(!isPlayingAudio);
    if (isPlayingAudio) {
      intro.current.pause();
    } else {
      intro.current.muted = false;
      intro.current.play();
    }
  };

  useEffect(() => {
    intro.current.muted = false;
    intro.current.play();
  }, []);

  return (
    <MainContainer>
      <AudioButton onClick={togglePlayAudio}>
        {isPlayingAudio ? (
          <Image src={"assets/unmuted.svg"} alt="" width={22} height={22} priority={true}/>
        ) : (
          <Image src={"assets/muted.svg"} alt="" width={22} height={22} priority={true}/>
        )}
      </AudioButton>

      <HomeTitle howToPlay={howToPlay}>¿Qué club e’? </HomeTitle>
      {howToPlay ? (
        <>
          <BackToHomeButton handleHowToPlay={handleHowToPlay} />
          <HowToPlay handleHowToPlay={handleHowToPlay} />
        </>
      ) : (
        <>
          <StartButton onClick={onClickPlay}>Empezar</StartButton>
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

const HomeTitle = styled.h1<{ howToPlay: boolean }>`
  font-size: ${(props) => (props.howToPlay ? "2.2em" : "3.5em")};
  color: var(--light);
  font-weight: 100;
  margin-bottom: 1em;
  transition: all 0.2s;
  animation: ${cascadeAnimation} 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s
    both;
`;

const StartButton = styled.button`
  background: var(--light);
  padding: 14px 38px;
  margin-bottom: 20px;
  border-radius: 50px;
  font-size: 28px;
  mix-blend-mode: screen;
  transition: all 0.2s;
  animation: ${fadeIn} 0.4s ease-in 1s both;
  &:hover {
    transform: scale(1.05);
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

const AudioButton = styled.button`
  position: absolute;
  top: 5%;
  right: 5%;
  mix-blend-mode: screen;
  width: 38px;
  height: 38px;
  border-radius: 100%;

  img {
    position: relative;
    top: 2px;
    animation: ${fadeIn} 0.2s ease-in;
  }
`;
