import { fadeIn, slideInLeft } from "@/styles/animations";
import useStore from "lib/store/state";
import Image from "next/image";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import styled from "styled-components";
import Footer from "./Footer";
import Loader from "./Loader";

interface Props {
  children?: ReactNode;
}

const Layout = ({ children, ...props }: Props) => {
  const router = useRouter();
  const IS_LOADING = useStore((state) => state.IS_LOADING);

  const goToHome = () => {
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
  min-height: 100vh;
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
