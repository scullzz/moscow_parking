// src/lib/useTelegram.ts
import { useEffect, useState } from "react";

export type TelegramWebApp = typeof window.Telegram.WebApp | null;

export function useTelegram(): TelegramWebApp {
  const [tg, setTg] = useState<TelegramWebApp>(null);

  useEffect(() => {
    // ждём появления объекта во view Telegram
    const webApp = window.Telegram?.WebApp ?? null;
    if (webApp) webApp.ready(); // рекомендует сам Telegram
    setTg(webApp);
  }, []);

  return tg;
}
