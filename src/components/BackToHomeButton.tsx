import Image from "next/image";
import styled from "styled-components";

const BackToHomeButton = ({ handleHowToPlay }: any) => {
  return (
    <BackButton onClick={handleHowToPlay}>
      <Image src="/assets/back-icon.svg" alt="<" width={22} height={22} />
    </BackButton>
  );
};

export default BackToHomeButton;

const BackButton = styled.button`
  width: 38px;
  height: 38px;
  border-radius: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  mix-blend-mode: screen;
  position: absolute;
  top: 5%;
  left: 5%;
`;
