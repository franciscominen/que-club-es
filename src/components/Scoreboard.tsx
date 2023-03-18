import useStore from "lib/store/state";
import styled from "styled-components";

interface Props {
  small: boolean;
}

const Scoreboard = ({ small }: Props) => {
  const SCOREBOARD = useStore((state) => state.SCOREBOARD);

  return (
    <>
      <ScoreboardImg
        src="/assets/scoreboard.svg"
        alt=""
        style={{ position: "absolute" }}
        small={small}
      />
      <ScorboardWrapper small={small}>
        {SCOREBOARD.map((score: string) => {
          return score === "O" ? (
            <img src="/assets/circle.svg" alt="O" />
          ) : (
            <img src="/assets/cross.svg" alt="X" />
          );
        })}
      </ScorboardWrapper>
    </>
  );
};

export default Scoreboard;

const ScoreboardImg = styled.img<{ small: boolean }>`
  max-width: ${(props) => (props.small ? `10.5em` : `none`)};
`;

const ScorboardWrapper = styled.div<{ small: boolean }>`
  display: flex;
  align-items: center;
  width: ${(props) => (props.small ? `168px` : `210px`)};
  height: ${(props) => (props.small ? `36px` : `45px`)};
  gap: ${(props) => (props.small ? `14px` : `16px`)};
  img {
    width: ${(props) => (props.small ? `19px` : `26px`)};
    position: relative;
    left: 9px;
  }
`;
