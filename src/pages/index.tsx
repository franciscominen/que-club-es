import BackToHomeButton from "@/components/BackToHomeButton";
import HowToPlay from "@/components/HowToPlay";
import useActions from "lib/store/actions";
import useStore from "lib/store/state";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";

const Home: NextPage = () => {
  const router = useRouter();
  const { resetPoints } = useActions();
  const PLAYED = useStore((state) => state.PLAYED);

  const [howToPlay, setHowToPlay] = useState(false);

  const onClickPlay = () => {
    if (PLAYED) {
      router.push("result");
    } else {
      resetPoints();
      router.push("play");
    }
  };

  return (
    <MainContainer>
      <HomeTitle howToPlay={howToPlay}>¿Qué club e’?</HomeTitle>
      {howToPlay ? (
        <>
          <BackToHomeButton howToPlay={howToPlay} setHowToPlay={setHowToPlay} />
          <HowToPlay />
        </>
      ) : (
        <>
          <StartButton onClick={onClickPlay}>Empezar</StartButton>
          <TutorialButton
            onClick={() => {
              setHowToPlay(!howToPlay);
            }}
          >
            ¿Qué es esto?
          </TutorialButton>
        </>
      )}
    </MainContainer>
  );
};

export default Home;

const MainContainer = styled.main`
  max-width: 100%;
  min-height: 100vh;
  margin: 0 auto;
  background-image: url("/assets/backgrounds/bg-home.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position-y: center;
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
`;

const StartButton = styled.button`
  background: var(--light);
  padding: 14px 38px;
  margin-bottom: 20px;
  border-radius: 50px;
  font-size: 28px;
  mix-blend-mode: screen;
  transition: all 0.2s;
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

  &:hover {
    transform: scale(1.05);
  }
`;
