import BackToHomeButton from "@/components/BackToHomeButton";
import HowToPlay from "@/components/HowToPlay";
import { homeTitle, fadeIn } from "@/styles/animations";
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

  const handleHowToPlay = () => {
    return setHowToPlay(!howToPlay);
  };

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
          <BackToHomeButton handleHowToPlay={handleHowToPlay} />
          <HowToPlay handleHowToPlay={handleHowToPlay} />
        </>
      ) : (
        <>
          <StartButton onClick={onClickPlay}>Empezar</StartButton>
          <TutorialButton onClick={handleHowToPlay}>
            ¿Qué es esto?
          </TutorialButton>

          <Footer>
            <span>¿Qué club e’?</span> © 2023 v1.0.0 All rights reserved |
            <FooterLink> developed by Esk4s</FooterLink>.
          </Footer>
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
  transition: all 0.2s;
  animation: ${homeTitle} 1.2s ease-in 0.2s both;
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

const Footer = styled.footer`
  text-align: center;
  background-color: var(--dark);
  color: var(--light);
  font-family: var(--alternativeFont);
  font-size: 12px;
  width: 100%;
  position: fixed;
  bottom: 0;
  padding: 4px 0;
`;

const FooterLink = styled.a`
  color: var(--light);
  font-family: var(--alternativeFont);
  cursor: pointer;
  &:hover {
    color: #2a96bb;
  }
`;
