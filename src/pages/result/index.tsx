import Countdown from "@/components/Countdown";
import PointsSlider from "@/components/PointsSlider";
import SocialMediaButtons from "@/components/SocialMediaButtons";
import { fadeIn, scaleInCenter, slideInLeft } from "@/styles/animations";
import useStore from "lib/store/state";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import styled from "styled-components";

const Result = () => {
  const router = useRouter();
  const POINTS = useStore((state) => state.POINTS);
  const PLAYED = useStore((state) => state.PLAYED);

  const applauseSound = useMemo(
    () => new Audio("/assets/sounds/applause.wav"),
    []
  );
  const defeatSound = useMemo(
    () => new Audio("/assets/sounds/silbidos.mp3"),
    []
  );

  const goToPlay = () => {
    return router.push("/play");
  };
  const goToHome = () => {
    return router.push("/");
  };

  useEffect(() => {
    if (PLAYED) {
      if (POINTS >= 3) {
        applauseSound.play();
      } else {
        defeatSound.play();
      }
    }
  }, [PLAYED, POINTS, applauseSound, defeatSound]);

  return (
    <MainContainer>
      {PLAYED ? (
        <>
          <SytledButton onClick={goToHome}>
            <Image
              src={"/assets/home-icon.svg"}
              width={24}
              height={24}
              alt="<"
            />
          </SytledButton>
          <Countdown />
          <PointsSlider points={POINTS} />
          <SocialMediaButtons />
        </>
      ) : (
        <NotPlayedWrapper>
          <Image
            src={"/assets/offside-icon.png"}
            alt=""
            width={100}
            height={120}
          />
          <h3>
            Parece que todavía
            <br /> no jugaste!
          </h3>
          <PlayButton onClick={goToPlay}>Jugar</PlayButton>
        </NotPlayedWrapper>
      )}
    </MainContainer>
  );
};

export default Result;

const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;
  align-items: center;
  padding: 3% 0;
`;

const SytledButton = styled.button`
  position: absolute;
  top: 3%;
  left: 3%;
  background: var(--light);
  border-radius: 100%;
  mix-blend-mode: screen;
  width: 48px;
  height: 48px;
  animation: ${slideInLeft} 0.3s ease-in 1.5s both;
  img {
    position: relative;
    top: 1px;
  }
`;

const PlayButton = styled.button`
  background: var(--light);
  padding: 14px 38px;
  border-radius: 50px;
  font-size: 24px;
  mix-blend-mode: screen;
  transition: all 0.2s;
  animation: ${fadeIn} 0.4s ease-in 1s both;
  &:hover {
    transform: scale(1.05);
  }
`;

const NotPlayedWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto 0;
  gap: 16px;
  position: relative;
  bottom: 3em;

  img {
    animation: ${scaleInCenter} 0.4s ease-in 0.2s both;
  }

  h3 {
    color: var(--light);
    font-size: 24px;
    font-weight: 300;
    text-align: center;
    margin-bottom: 32px;
    animation: ${fadeIn} 0.4s ease-in 0.5s both;
  }
`;
