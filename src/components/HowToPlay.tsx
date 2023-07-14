import { fadeIn } from "@/styles/animations";
import styled from "styled-components";

const HowToPlay = ({ handleHowToPlay }: any) => {
  return (
    <HowToPlayWrapper>
      <TextsWrapper>
        <p>
          <span>¿Qué club e’?</span> Es un Web Quiz que se basa
        en adivinar el nombre de cinco escudos
        pertenecientes a clubes del Futbol Argentino.
        </p>
        <p>
          Los escudos comprenden desde la Liga Profesional
        hasta la Primera D, pasando por las 6 categorías.
        </p>
        <p>
          Al clickear en Jugar, deberas escribir el nombre
        del equipo al cual pertenece el escudo en pantalla.
        Contando con 2 chances y 30 segundos por escudo.
        </p>
        <img
          src="/assets/howtoplay/1.svg"
          alt=""
          style={{ margin: "16px 0" }}
        />
        <p>
          Por cada escudo que aciertes sumaras 1 punto.
        Pudiendo lograr un maximo de 5 puntos.
        </p>
        <p>
          Al finalizar, veras tu puntaje final y las respuestas
        de los escudos de hoy.
        </p>
        <img src="/assets/howtoplay/2.svg" alt="" />
        <p>
          El contador, indica el tiempo restante para que los
        cinco escudos se actualicen y poder volver a jugar,
        esto pasa una vez por dia.
        </p>
        <img src="/assets/howtoplay/3.svg" alt="" />
        <p>
          Finalmente, podes compartir tu resultado del
        dia con quien quieras.
        </p>
        <img
          src="/assets/howtoplay/4.svg"
          alt=""
          style={{ marginBottom: "32px" }}
        />
        <HomeButton onClick={handleHowToPlay}>Inicio</HomeButton>
      </TextsWrapper>
    </HowToPlayWrapper>
  );
};

export default HowToPlay;

const HowToPlayWrapper = styled.div`
  max-width: 700px;
  padding: 1em 5% 0 5%;
  height: 80vh;
  overflow-y: overlay;
  animation: ${fadeIn} 0.4s ease-in 0.2s both;
  ::-webkit-scrollbar {
    opacity: 0;
    width: 5px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #ffffff5a;
    border-radius: 5px;
  }
`;

const TextsWrapper = styled.div`
  text-align: center;
  color: var(--light);
  display: flex;
  flex-direction: column;
  gap: 18px;
  align-items: center;

  p {
    font-family: var(--alternativeFont);
    font-size: 18px;
    line-height: 1.4;
    font-weight: 500;
  }
`;

const HomeButton = styled.button`
  background: var(--light);
  padding: 14px 38px;
  margin-bottom: 20px;
  border-radius: 50px;
  font-size: 22px;
  transition: all 0.2s;
  mix-blend-mode: screen;

  &:hover {
    transform: scale(1.05);
  }
`;
