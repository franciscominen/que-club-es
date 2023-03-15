import Image from "next/image";
import styled from "styled-components";

const BackToHomeButton = ({ howToPlay, setHowToPlay }: any) => {
  return (
    <BackButton
      onClick={() => {
        setHowToPlay(!howToPlay);
      }}
    >
      <Image src="/assets/back-icon.svg" alt="<" width={24} height={24} />
    </BackButton>
  );
};

export default BackToHomeButton;

const BackButton = styled.button`
  width: 42px;
  height: 42px;
  border-radius: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  mix-blend-mode: screen;
  position: absolute;
  top: 5%;
  left: 5%;
`;
