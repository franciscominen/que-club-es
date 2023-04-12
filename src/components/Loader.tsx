import { loader } from "@/styles/animations";
import Image from "next/image";
import styled from "styled-components";

const Loader = () => {
  return (
    <>
      <MainContainer>
        <ImageWrapper>
          <Image
            src="/assets/chances-icon.svg"
            alt="Loading..."
            width={100}
            height={100}
            priority
          />
        </ImageWrapper>
      </MainContainer>
    </>
  );
};

export default Loader;

const MainContainer = styled.main`
  max-width: 100%;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ImageWrapper = styled.div`
    animation: ${loader} 1.5s infinite linear;
`