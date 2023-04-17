import { fadeIn, scaleInCenter, slideInBottom } from "@/styles/animations";
import useStore from "lib/store/state";
import styled from "styled-components";
import SocialMediaButtons from "@/components/SocialMediaButtons";
import { useRouter } from "next/router";
import useActions from "lib/store/actions";
import { useEffect, useMemo } from "react";

export default function ArcadeResult() {
  const router = useRouter();
  const { fetchAllTeams, resetArcadePoints } = useActions();
  const ARCADE_STEPS = useStore((state) => state.ARCADE_STEPS);
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

  const goToArcadeMode = () => {
    resetArcadePoints();
    fetchAllTeams();
    router.push("/arcade");
  };

  useEffect(() => {
    if (ARCADE_STEPS >= 5) {
      applauseSound.play();
    } else {
      defeatSound.play();
    }
  }, [ARCADE_STEPS, applauseSound, defeatSound]);

  return (
    <MainContainer>
      <SocialMediaButtons isArcade={true} />
      <PointsWrapper>
        <ResultTitle>Puntuación:</ResultTitle>
        <Points>
          {ARCADE_STEPS}
          <span>Pts</span>
        </Points>
        <h3>
          Lograste una racha de {ARCADE_STEPS}
          <br /> clubes consecutivos.
        </h3>
      </PointsWrapper>
      <StyledButton onClick={goToArcadeMode}>Jugar de nuevo</StyledButton>
    </MainContainer>
  );
}

const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  // gap: 16px;
  align-items: center;
  padding: 1em 2% 2.5em 2%;
  height: calc(var(--vh, 1vh) * 100);
`;

const PointsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  // height: 20em;

  h3 {
    color: var(--light);
    font-weight: 100;
    text-align: center;
    animation: ${fadeIn} 0.4s ease-in 0.2s both;
  }
`;

const ResultTitle = styled.h1`
  color: var(--light);
  font-size: 28px;
  font-weight: 300;
  text-align: center;
  margin-bottom: 8px;
  animation: ${fadeIn} 0.4s ease-in 0.2s both;
`;

const Points = styled.div`
  color: var(--light);
  font-size: 140px;
  line-height: 1;
  text-align: center;
  margin-bottom: 8px;
  font-weight: 100;
  animation: ${scaleInCenter} 0.3s ease-in 0.6s both;
  span {
    font-size: 26px;
  }
`;

const StyledButton = styled.button`
  background: var(--light);
  padding: 12px 24px;
  margin-bottom: 20px;
  border-radius: 50px;
  font-size: 22px;
  transition: all 0.2s;
  mix-blend-mode: screen;
  animation: ${slideInBottom} 0.3s ease-in 1s both;
  &:hover {
    transform: scale(1.05);
  }
`;
