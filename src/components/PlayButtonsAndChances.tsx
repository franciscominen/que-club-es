import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";

interface Props {
  handleAnswer: () => void;
  onPass: () => void;
  chances: number;
  teamName: string;
  passDisabled: boolean;
}

const PlayButtonsAndChances = ({
  handleAnswer,
  onPass,
  chances,
  teamName,
  passDisabled,
}: Props) => {
  return (
    <Wrapper>
      <PlayButton
        continueButton={false}
        onClick={onPass}
        disabled={passDisabled}
      >
        PASO
      </PlayButton>
      <ChancesWrapper>
        {chances === 1 ? (
          <Image
            src="/assets/chances-icon.svg"
            alt=""
            width={40}
            height={40}
            priority={true}
          />
        ) : null}
        {chances >= 0 ? (
          <Image
            src="/assets/chances-icon.svg"
            alt=""
            width={40}
            height={40}
            priority={true}
          />
        ) : null}
      </ChancesWrapper>
      <PlayButton
        continueButton={true}
        onClick={handleAnswer}
        disabled={!teamName || passDisabled}
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
