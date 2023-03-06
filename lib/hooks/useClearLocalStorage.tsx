import { useEffect } from "react";
import moment from "moment-timezone";
import useStore from "lib/store/state";

function useClearLocalStorage() {
  const PLAYED = useStore((state) => state.PLAYED);

  useEffect(() => {
    // Define la función para borrar el localStorage
    function clearLocalStorage() {
      localStorage.clear();
    }

    // Obtiene la fecha actual en la zona horaria de ARG
    const now = moment().tz("America/Argentina/Buenos_Aires");

    // Calcula la fecha y hora del próximo evento (8:58 am hora ARG)
    const nextEvent = now.clone().startOf("day").add({ hours: 15, minutes: 28 });

    // Si ya pasó el evento de hoy, espera hasta el próximo evento de mañana
    if (now.isAfter(nextEvent)) {
      nextEvent.add(1, "day");
    }

    // Calcula el tiempo restante hasta el próximo evento
    const timeToNextEvent = nextEvent.diff(now);

    // Espera el tiempo restante y luego llama a la función para borrar el localStorage
    setTimeout(clearLocalStorage, timeToNextEvent);
  }, []);
}

export default useClearLocalStorage;
