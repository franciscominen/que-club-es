import moment from "moment-timezone";
import React, { useState, useEffect } from "react";

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
      setCountdown(
        `${diff.hours()}:${diff.minutes()}:${diff.seconds()}hs`
      );

      // Si el contador llega a cero, reiniciamos la hora objetivo y el contador
      if (diff.asMilliseconds() <= 0) {
        setCountDownDate(countDownDate.add(1, "day"));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [countDownDate]);

  return (
    <div>
      <p>{countdown}</p>
    </div>
  );
};

export default Countdown;
