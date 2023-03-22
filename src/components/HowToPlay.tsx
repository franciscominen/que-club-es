import { fadeIn } from "@/styles/animations";
import styled from "styled-components";

const HowToPlay = ({ handleHowToPlay }: any) => {
  return (
    <HowToPlayWrapper>
      <TextsWrapper>
        <p>
          <span>¿Qué club e’?</span> Es un Web Quiz que se basa
          <br /> en adivinar el nombre de cinco escudos
          <br /> pertenecientes a clubes del Futbol Argentino.
        </p>
        <p>
          Los escudos comprenden desde la Liga Profesional
          <br /> hasta la Primera D, pasando por las 6 categorías.
        </p>
        <p>
          Al clickear en Jugar, deberas escribir el nombre
          <br /> del equipo al cual pertenece el escudo en pantalla.
          <br /> Contando con 2 chances y 30 segundos por escudo.
        </p>
        <img
          src="/assets/howtoplay/1.svg"
          alt=""
          style={{ margin: "16px 0" }}
        />
        <p>
          Por cada escudo que aciertes sumaras 1 punto.
          <br /> Pudiendo lograr un maximo de 5 puntos.
        </p>
        <p>
          Al finalizar, veras tu puntaje final y las respuestas
          <br /> de los escudos de hoy.
        </p>
        <img src="/assets/howtoplay/2.svg" alt="" />
        <p>
          El contador, indica el tiempo restante para que los
          <br /> cinco escudos se actualicen y poder volver a jugar,
          <br /> esto pasa una vez por dia.
        </p>
        <img src="/assets/howtoplay/3.svg" alt="" />
        <p>
          Finalmente, podes compartir tu resultado del
          <br /> dia con quien quieras.
        </p>
        <img
          src="/assets/howtoplay/4.svg"
          alt=""
          style={{ marginBottom: "32px" }}
        />
        <HomeButton onClick={handleHowToPlay}>Inicio</HomeButton>
      </TextsWrapper>
      <Footer>
        <span>¿Qué club e’?</span> © 2023 v1.0.0 All rights reserved | developed
        by esk4s
      </Footer>
    </HowToPlayWrapper>
  );
};

export default HowToPlay;

const HowToPlayWrapper = styled.div`
  max-width: 700px;
  padding: 0 5%;
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
  font-size: 28px;
  transition: all 0.2s;
  &:hover {
    transform: scale(1.05);
  }
`;

const Footer = styled.footer`
  color: var(--light);
  font-size: 12px;
  font-weight: bold;
  font-family: var(--alternativeFont);
  text-align: center;
`;
