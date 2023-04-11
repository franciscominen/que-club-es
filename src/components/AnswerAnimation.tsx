import { Player } from "@lottiefiles/react-lottie-player";

type Props = {
  isCorrect: boolean;
};

const AnswerAnimation = ({ isCorrect }: Props) => {
  return (
    <>
      {isCorrect ? (
        <Player
          src="/assets/lotties/check.json"
          autoplay
          loop={false}
          speed={1.2}
          style={{ height: "236px", width: "236px" }}
          keepLastFrame={true}
        />
      ) : (
        <Player
          src="/assets/lotties/error.json"
          autoplay
          loop={false}
          speed={1.2}
          style={{ height: "236px", width: "236px" }}
          keepLastFrame={true}
        />
      )}
    </>
  );
};

export default AnswerAnimation;
