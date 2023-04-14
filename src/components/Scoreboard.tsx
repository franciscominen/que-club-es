import { scaleInCenter } from "@/styles/animations";
import useStore from "lib/store/state";
import Image from "next/image";
import styled from "styled-components";

interface Props {
  small: boolean;
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

const ScoreboardImg = styled(Image)<{ small: boolean }>`
  max-width: ${(props) => (props.small ? `10.5em` : `none`)};
  max-height: ${(props) => (props.small ? `2.5em` : `none`)};
  top: ${(props) => (props.small ? `9.1em` : `none`)}!important;
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
    animation: ${scaleInCenter} 0.3s ease-in both;
  }
`;
