import { ReactNode } from "react";
import styled from "styled-components";
import Footer from "./Footer";

interface Props {
  children?: ReactNode;
}

const Layout = ({ children, ...props }: Props) => {
  return (
    <MainContainer>
      {children}
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
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
