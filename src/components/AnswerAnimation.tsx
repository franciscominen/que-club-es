import { Player } from "@lottiefiles/react-lottie-player";
import styled from "styled-components";

type Props = {
  isCorrect: boolean;
};

const AnswerAnimation = ({ isCorrect }: Props) => {
  return (
    <>
      {isCorrect ? (
        <AnimationPlayer
          src="/assets/lotties/check.json"
          autoplay
          loop={false}
          speed={1.2}
          keepLastFrame={true}
        />
      ) : (
        <AnimationPlayer
          src="/assets/lotties/error.json"
          autoplay
          loop={false}
          speed={1.2}
          keepLastFrame={true}
        />
      )}
    </>
  );
};

export default AnswerAnimation;

const AnimationPlayer = styled(Player)`
  width: 100%;
  height: calc(58vh - 200px);
  object-fit: contain;
`;
