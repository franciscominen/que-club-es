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
          loop={false} // Desactiva el bucle
          speed={1.2}
          style={{ height: "236px", width: "236px" }}
          keepLastFrame={true} // Pausa la animación en el último frame
        />
      ) : (
        <Player
          src="/assets/lotties/error.json"
          autoplay
          loop={false} // Desactiva el bucle
          speed={1.2}
          style={{ height: "236px", width: "236px" }}
          keepLastFrame={true} // Pausa la animación en el último frame
        />
      )}
    </>
  );
};

export default AnswerAnimation;
