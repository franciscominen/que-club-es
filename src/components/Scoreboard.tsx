import { clubAnimation, slideInTop } from "@/styles/animations";
import useStore from "lib/store/state";
import styled from "styled-components";

interface Props {
  small: boolean;
}

const Scoreboard = ({ small }: Props) => {
  const SCOREBOARD = useStore((state) => state.SCOREBOARD);

  return (
    <>
      <ScoreboardContainer>
        <ScoreboardImg
          src="/assets/scoreboard.svg"
          alt=""
          style={{ position: "absolute" }}
          small={small}
        />
        <ScorboardWrapper small={small}>
          {SCOREBOARD.map((score: string, index: number) => {
            return score === "✅" ? (
              <img src="/assets/circle.svg" alt="✅" key={index} />
            ) : (
              <img src="/assets/cross.svg" alt="❌" key={index} />
            );
          })}
        </ScorboardWrapper>
      </ScoreboardContainer>
    </>
  );
};

export default Scoreboard;

const ScoreboardContainer = styled.div`
  animation: ${slideInTop} 0.8s ease both;
`

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
    animation: ${clubAnimation} .3s ease-in both;
  }
`;
