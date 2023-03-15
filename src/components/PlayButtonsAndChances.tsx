import Image from "next/image";
import styled from "styled-components";

interface Props {
  onTryToAnswer: () => void;
  onPass: () => void;
}

const PlayButtonsAndChances = ({ onTryToAnswer, onPass }: Props) => {
  return (
    <Wrapper>
      <PlayButton continueButton={false} onClick={onPass}>
        PASO
      </PlayButton>
      <ChancesWrapper>
        <Image src="/assets/chances-icon.svg" alt="" width={40} height={40} />
        <Image src="/assets/chances-icon.svg" alt="" width={40} height={40} />
      </ChancesWrapper>
      <PlayButton continueButton={true} onClick={onTryToAnswer}>
        OK
      </PlayButton>
    </Wrapper>
  );
};

export default PlayButtonsAndChances;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const PlayButton = styled.button<{ continueButton: boolean }>`
  background-color: ${(props) =>
    props.continueButton ? `var(--green)` : `var(--red)`};
  font-size: 24px;
  color: var(--light);
  width: 5em;
  padding: 10px 0;
  border-radius: 8px;
`;

const ChancesWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
`;
