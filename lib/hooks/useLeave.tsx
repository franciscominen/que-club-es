import { useEffect } from "react";
import Router from "next/router";
import { useBeforeUnload } from "react-use";
import useActions from "lib/store/actions";

export const useLeavePageConfirm = (
  isConfirm = true,
  message = "Si confirmas esta acción el juego se dará por finalizado hasta la próxima fecha."
) => {
  useBeforeUnload(isConfirm, message);

  const { setToPlayed } = useActions();

  useEffect(() => {
    const handler = () => {
      if (isConfirm && window.confirm(message)) {
        setToPlayed();
      } else {
        throw "Route Canceled";
      }
    };

    Router.events.on("beforeHistoryChange", handler);

    return () => {
      Router.events.off("beforeHistoryChange", handler);
    };
  }, [isConfirm, message, setToPlayed]);
};
