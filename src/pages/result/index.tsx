import Countdown from "@/components/Countdown";
import PointsSlider from "@/components/PointsSlider";
import SocialMediaButtons from "@/components/SocialMediaButtons";
import useStore from "lib/store/state";
import Image from "next/image";
import { useRouter } from "next/router";
import styled from "styled-components";

const Result = () => {
  const router = useRouter();
  const POINTS = useStore((state) => state.POINTS);
  const PLAYED = useStore((state) => state.PLAYED);

  const goToPlay = () => {
    return router.push("/play");
  };
  const goToHome = () => {
    return router.push("/");
  };

  return (
    <MainContainer>
      {PLAYED ? (
        <>
          <Countdown />
          <PointsSlider points={POINTS} />
          <SocialMediaButtons />
          <SytledButton onClick={goToHome}>Inicio</SytledButton>
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
          <SytledButton onClick={goToPlay}>Jugar</SytledButton>
        </NotPlayedWrapper>
      )}
    </MainContainer>
  );
};

export default Result;

const MainContainer = styled.main`
  width: 100%;
  min-height: 100vh;
  margin: 0 auto;
  background-image: url("/assets/backgrounds/bg-result.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position-y: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 10% 0;
`;

const SytledButton = styled.button`
  background: var(--light);
  padding: 8px 34px;
  border-radius: 50px;
  mix-blend-mode: screen;
  font-size: 24px;
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

  h3 {
    color: var(--light);
    font-size: 24px;
    font-weight: 300;
    text-align: center;
    margin-bottom: 32px;
  }
`;
