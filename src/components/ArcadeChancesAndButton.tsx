import Image from "next/image";
import styled from "styled-components";

interface Props {
  chances: number,
  teamName: string
}

const ArcadeChancesAndButton = ({ chances, teamName }: Props) => {
  return (
    <StyledWrapper>
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

      <StyledButton type="submit" disabled={!teamName}>
        LO CONOZCO!
      </StyledButton>
    </StyledWrapper>
  );
};

export default ArcadeChancesAndButton;

const StyledWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ChancesWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
`;

const StyledButton = styled.button`
  color: var(--light);
  background: var(--green);
  font-size: 20px;
  border-radius: 8px;
  padding: 8px 18px;
  &:disabled {
    background-color: #797979;
  }
`;
