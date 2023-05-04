import Countdown from "@/components/Countdown";
import PointsSlider from "@/components/PointsSlider";
import SocialMediaButtons from "@/components/SocialMediaButtons";
import { fadeIn, scaleInCenter } from "@/styles/animations";
import useStore from "lib/store/state";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import styled from "styled-components";

const Result = () => {
  const router = useRouter();
  const POINTS = useStore((state) => state.POINTS);
  const PLAYED = useStore((state) => state.PLAYED);
  const STEPS = useStore((state) => state.STEPS);
  const APP_SOUND_MUTED = useStore((state) => state.APP_SOUND_MUTED);

  const applauseSound = useMemo(
    () => new Audio("/assets/sounds/applause.wav"),
    []
  );
  const defeatSound = useMemo(
    () => new Audio("/assets/sounds/silbidos.mp3"),
    []
  );
  applauseSound.muted = APP_SOUND_MUTED;
  defeatSound.muted = APP_SOUND_MUTED;

  const goToPlay = () => {
    return router.push("/play");
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
          <Countdown />
          {STEPS === 4 ? (
            <PointsSlider points={POINTS} />
          ) : (
            <AbandonMessage>
              <Image
                src="/assets/red-card.png"
                alt="Red Card"
                width={80}
                height={80}
              />
              <h3>
                Abandonaste la <br />
                fecha de hoy.
              </h3>
            </AbandonMessage>
          )}
          <SocialMediaButtons isArcade={false} />
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
  justify-content: space-between;
  // gap: 16px;
  align-items: center;
  padding: 1em 2% 2.5em 2%;
  height: calc(var(--vh, 1vh) * 95);
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

const AbandonMessage = styled.div`
  animation: ${scaleInCenter} 0.3s ease-in 0.2s both;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 22px;
  padding-top: 22px;
  h3 {
    color: var(--light);
    text-align: center;
    font-weight: 100;
    line-height: 1.3;
    font-size: 22px;
  }
`;
