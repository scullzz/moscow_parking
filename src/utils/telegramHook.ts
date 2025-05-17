// src/lib/useTelegram.ts
import { useLayoutEffect, useState } from "react";

export function useTelegram() {
  // «Ленивая» инициализация: пробуем взять WebApp ещё до первого рендера
  const [tg, setTg] = useState(() => window.Telegram?.WebApp ?? null);

  useLayoutEffect(() => {
    if (tg) {
      tg.ready(); // рекомендация Telegram
      return;
    }
    // Если пришли сюда, значит WebApp появился позже (iOS / старые Android)
    const webApp = window.Telegram?.WebApp;
    if (webApp) {
      webApp.ready();
      setTg(webApp);
    }
  }, [tg]);

  return tg;
}
