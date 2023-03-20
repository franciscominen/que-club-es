import Image from "next/image";
import styled from "styled-components";

interface Props {
  onTryToAnswer: () => void;
  onPass: () => void;
  chances: number;
  teamName: string;
}

const PlayButtonsAndChances = ({
  onTryToAnswer,
  onPass,
  chances,
  teamName,
}: Props) => {
  return (
    <Wrapper>
      <PlayButton continueButton={false} onClick={onPass}>
        PASO
      </PlayButton>
      <ChancesWrapper>
        {chances === 1 ? (
          <Image src="/assets/chances-icon.svg" alt="" width={40} height={40} />
        ) : null}
        {chances >= 0 ? (
          <Image src="/assets/chances-icon.svg" alt="" width={40} height={40} />
        ) : null}
      </ChancesWrapper>
      <PlayButton
        continueButton={true}
        onClick={onTryToAnswer}
        disabled={!teamName}
      >
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
  transition: all 0.2s;

  &:disabled {
    background-color: #797979;
  }
`;

const ChancesWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
`;

const ChancesIcon = styled.img<{ show: boolean }>`
  display: ${(props) => (props.show ? `none` : `block`)};
`;
