import { fadeIn, slideInLeft } from "@/styles/animations";
import useStore from "lib/store/state";
import Image from "next/image";
import { useRouter } from "next/router";
import { ReactNode, useState } from "react";
import styled from "styled-components";
import AbandonGameModal from "./AbandonGameModal";
import Footer from "./Footer";
import Loader from "./Loader";

interface Props {
  children?: ReactNode;
}

const Layout = ({ children, ...props }: Props) => {
  const router = useRouter();
  const IS_LOADING = useStore((state) => state.IS_LOADING);
  const APP_SOUND_MUTED = useStore((state) => state.APP_SOUND_MUTED);
  const [showModal, setShowModal] = useState(false);

  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);

  const togglePlayAudio = () => {
    useStore.setState((state) => ({
      ...state,
      SHOW_SOUND_MODAL: false,
    }));

    if (!APP_SOUND_MUTED) {
      return useStore.setState((state) => ({
        ...state,
        APP_SOUND_MUTED: true,
      }));
    } else {
      return useStore.setState((state) => ({
        ...state,
        APP_SOUND_MUTED: false,
      }));
    }
  };

  const goToHome = () => {
    if (router.pathname === "/play") {
      return setShowModal(true);
    }
    return router.push("/");
  };

  return (
    <MainContainer>
      <SytledButton onClick={goToHome}>
        <Image
          src={"/assets/home-icon.svg"}
          width={20}
          height={20}
          alt="<"
          priority={true}
        />
      </SytledButton>

      {showModal && <AbandonGameModal setShowModal={setShowModal} />}

      <AudioButton onClick={togglePlayAudio}>
        {!APP_SOUND_MUTED ? (
          <Image
            src={"assets/unmuted.svg"}
            alt=""
            width={22}
            height={22}
            priority={true}
          />
        ) : (
          <Image
            src={"assets/muted.svg"}
            alt=""
            width={22}
            height={22}
            priority={true}
          />
        )}
      </AudioButton>
      {IS_LOADING ? <Loader /> : children}
      <Footer />
    </MainContainer>
  );
};

export default Layout;

const MainContainer = styled.main`
  background-image: url("/assets/backgrounds/bg-home.svg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position-y: center;
  max-width: 100%;
  height: calc(var(--vh, 1vh) * 100);
  // padding: 2% 0;
`;

const SytledButton = styled.button`
  animation: ${slideInLeft} 0.3s ease-in 1.5s both;
  position: absolute;
  top: 2%;
  left: 2%;
  mix-blend-mode: screen;
  width: 38px;
  height: 38px;
  border-radius: 100%;

  img {
    position: relative;
    top: 2px;
  }
`;

const AudioButton = styled.button`
  position: absolute;
  top: 2%;
  right: 2%;
  mix-blend-mode: screen;
  width: 38px;
  height: 38px;
  border-radius: 100%;
  z-index: 11;

  img {
    position: relative;
    top: 2px;
    animation: ${fadeIn} 0.2s ease-in;
  }
`;
