import { scaleInCenter } from "@/styles/animations";
import useStore from "lib/store/state";
import Image from "next/image";
import styled from "styled-components";

interface Props {
  small: string;
}

const Scoreboard = ({ small }: Props) => {
  const SCOREBOARD = useStore((state) => state.SCOREBOARD);

  return (
    <>
      <div>
        <ScoreboardImg
          src="/assets/scoreboard.svg"
          alt=""
          style={{ position: "absolute" }}
          small={small}
          priority={true}
          fill
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
      </div>
    </>
  );
};

export default Scoreboard;

const ScoreboardImg = styled(Image)<{ small: string }>`
  max-width: ${(props) => (props.small === "true" ? `10.5em` : `none`)};
  max-height: ${(props) => (props.small === "true" ? `2.5em` : `2.4em`)};
  top: ${(props) => (props.small === "true" ? `9.1em` : `none`)}!important;
`;

const ScorboardWrapper = styled.div<{ small: string }>`
  display: flex;
  align-items: center;
  width: ${(props) => (props.small === "true" ? `168px` : `184px`)};
  height: ${(props) => (props.small === "true" ? `36px` : `39px`)};
  gap: ${(props) => (props.small === "true" ? `14px` : `12px`)};

  img {
    width: ${(props) => (props.small === "true" ? `19px` : `24px`)};
    position: relative;
    left: 9px;
    animation: ${scaleInCenter} 0.3s ease-in both;
  }
`;
