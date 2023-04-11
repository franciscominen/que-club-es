import { fadeIn, slideInTop } from "@/styles/animations";
import moment from "moment-timezone";
import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Countdown: React.FC = () => {
  const [countdown, setCountdown] = useState<string>("");
  const [countDownDate, setCountDownDate] = useState<moment.Moment>(
    moment.tz("09:00:00", "HH:mm:ss", "America/Argentina/Buenos_Aires")
  );

  useEffect(() => {
    const interval = setInterval(() => {
      // Obtenemos la fecha y hora actual en hora Argentina
      const now = moment().tz("America/Argentina/Buenos_Aires");

      // Calculamos la diferencia entre la hora actual y la hora objetivo
      const diff = moment.duration(countDownDate.diff(now));

      // Mostramos el contador en un elemento HTML
      setCountdown(`${diff.hours()}:${diff.minutes()}:${diff.seconds()}hs`);

      // Si el contador llega a cero, reiniciamos la hora objetivo y el contador
      if (diff.asMilliseconds() <= 0) {
        setCountDownDate(countDownDate.add(1, "day"));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [countDownDate]);

  return (
    <CountdownWrapper>
      <h3>Próxima fecha en:</h3>
      <h2>{countdown}</h2>
    </CountdownWrapper>
  );
};

export default Countdown;

const CountdownWrapper = styled.div`
  color: var(--light);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: ${slideInTop} 0.3s ease-in-out 1.4s both;

  h3 {
    font-weight: 300;
    font-size: 20px;
  }

  h2 {
    font-weight: 300;
    font-size: 32px;
  }
`;
