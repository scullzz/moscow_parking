import { useLayoutEffect, useState } from "react";

export default function useTelegramWebAppInit() {
  const [tg, setTg] = useState(() => window.Telegram?.WebApp ?? null);

  useLayoutEffect(() => {
    // если объект уже есть
    if (tg) {
      tg.expand();
      tg.setBackgroundColor("#FFFFFF");
      tg.setHeaderColor("#229ED9");
      tg.MainButton?.setParams({
        text: "Сохранить",
        color: "#FFFFFF",
        text_color: "#000",
      });
      tg.MainButton?.hide();
      return;
    }

    // если скрипт ещё не успел инициализироваться
    function onLoad() {
      const webApp = window.Telegram?.WebApp;
      if (webApp) {
        setTg(webApp);
        tg.expand();
        tg.setBackgroundColor("#FFFFFF");
        tg.setHeaderColor("#229ED9");
        tg.MainButton?.setParams({
          text: "Сохранить",
          color: "#FFFFFF",
          text_color: "#000",
        });
        tg.MainButton?.hide();
      }
    }

    // ждём полной загрузки DOM или скрипта
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, [tg]);
}
