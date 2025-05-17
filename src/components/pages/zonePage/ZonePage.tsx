// ZonePage.tsx
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTelegram } from "../../../utils/telegramHook";

/* ---------- типы из бекенда ---------- */
interface Session {
  id: number;
  vehicle_id: number;
  option_id: number;
  parking_id: string;
  start_time: string;
  end_time: string;
  duration: string;
  type: "standard" | "advanced";
  status: "active" | "completed";
}

interface User {
  balance: number;
}

/* ---------- утилита ---------- */
const fmt = (iso: string) =>
  new Date(iso).toLocaleString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "2-digit",
  });

/* ---------- карточка ---------- */
const ZoneCard = ({
  zone,
  vehicle,
  start,
  end,
  duration,
  showButton = false,
  onFinish,
}: {
  zone: string;
  vehicle: string;
  start: string;
  end: string;
  duration: string;
  showButton?: boolean;
  onFinish?: () => void;
}) => (
  <Card
    sx={{
      borderRadius: "16px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
      mb: 2,
    }}
  >
    <CardContent sx={{ p: 2 }}>
      <Typography fontWeight="bold" sx={{ mb: 1 }}>
        Зона: {zone}
      </Typography>
      <Typography variant="body2">🚗 Транспорт: {vehicle}</Typography>
      <Typography variant="body2">📅 Начало: {start}</Typography>
      <Typography variant="body2">📅 Окончание: {end}</Typography>
      <Typography variant="body2">⏱️ Длительность: {duration}</Typography>

      {showButton && (
        <Button
          variant="contained"
          fullWidth
          sx={{
            mt: 2,
            backgroundColor: "#d32f2f",
            ":hover": { backgroundColor: "#b71c1c" },
            borderRadius: "10px",
            fontWeight: "bold",
            height: "30px",
          }}
          onClick={onFinish}
        >
          Завершить
        </Button>
      )}
    </CardContent>
  </Card>
);

/* ---------- страница ---------- */
const ZonePage = () => {
  const nav = useNavigate();
  const tg = useTelegram();

  const [active, setActive] = useState<Session[] | null>(null);
  const [history, setHistory] = useState<Session[] | null>(null);
  const [balance, setBalance] = useState<number | null>(null);

  /* ------ загрузка данных ------ */
  const loadData = () => {
    Promise.all([
      fetch(`https://api.projectdevdnkchain.ru/users/me`, {
        headers: {
          "Content-Type": "application/json",
          auth: tg?.initData,
        },
      }),
      fetch(`https://api.projectdevdnkchain.ru/parking/active`, {
        headers: {
          "Content-Type": "application/json",
          auth: tg?.initData,
        },
      }),
      fetch(`https://api.projectdevdnkchain.ru/parking/history`, {
        headers: {
          "Content-Type": "application/json",
          auth: tg?.initData,
        },
      }),
    ])
      .then(async ([u, a, h]) => {
        if (u.ok) {
          const user: User = await u.json();
          setBalance(user.balance);
        }
        if (a.ok) setActive(await a.json());
        if (h.ok) setHistory(await h.json());
      })
      .catch(console.error);
  };

  useEffect(loadData, []);

  useEffect(() => {
    if (!tg) return; // ждём, пока hook положит WebApp
    alert(tg.initData || "(пусто)");
  }, [tg]);

  /* ------ завершение сессии ------ */
  const endSession = async (sessionId: number) => {
    const res = await fetch(
      `https://api.projectdevdnkchain.ru/parking/end/${sessionId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          auth: tg?.initData,
        },
      }
    );
    if (res.ok) loadData(); // перезагрузить баланс / активные / историю
  };

  /* ------ JSX ------ */
  return (
    <Box
      sx={{
        p: 2,
        pb: 16,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
      }}
    >
      {/* баланс */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Box
          sx={{
            backgroundColor: "#fff",
            px: 2,
            py: 1,
            borderRadius: "999px",
            boxShadow: "0 0 8px rgba(0,0,0,0.1)",
            fontWeight: "bold",
            height: "30px",
            display: "flex",
            alignItems: "center",
          }}
        >
          {balance === null ? <CircularProgress size={18} /> : `${balance} 🪙`}
        </Box>
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          pr: 0.5,
        }}
      >
        {history === null ? (
          <CircularProgress
            size={24}
            sx={{ display: "block", mx: "auto", my: 4 }}
          />
        ) : history.length === 0 ? (
          <Typography align="center" color="gray" sx={{ my: 2 }}>
            История пуста
          </Typography>
        ) : (
          history.map((s) => (
            <ZoneCard
              key={s.id}
              zone={String(s.option_id)}
              vehicle={String(s.vehicle_id)}
              start={fmt(s.start_time)}
              end={fmt(s.end_time)}
              duration={s.duration}
            />
          ))
        )}
      </Box>

      {/* ---------- АКТИВНЫЕ (фиксируются внизу) ---------- */}
      <Typography
        variant="body2"
        sx={{
          textAlign: "center",
          mt: 2,
          mb: 1,
          color: "gray",
          fontStyle: "italic",
        }}
      >
        ------- Активные зоны -------
      </Typography>

      {active === null ? (
        <CircularProgress
          size={24}
          sx={{ display: "block", mx: "auto", my: 2 }}
        />
      ) : active.length === 0 ? (
        <Typography align="center" color="gray" sx={{ mb: 2 }}>
          Нет активных сессий
        </Typography>
      ) : (
        active.map((s) => (
          <ZoneCard
            key={s.id}
            zone={String(s.option_id)}
            vehicle={String(s.vehicle_id)}
            start={fmt(s.start_time)}
            end={fmt(s.end_time)}
            duration={s.duration}
            showButton
            onFinish={() => endSession(s.id)}
          />
        ))
      )}

      {/* ---------- КНОПКА «АРЕНДОВАТЬ» ---------- */}
      <Box
        sx={{
          position: "fixed",
          bottom: 56,
          left: 0,
          right: 0,
          px: 2,
          py: 1.5,
          backgroundColor: "#fff",
          boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.06)",
          zIndex: 100,
        }}
      >
        <Button
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: "#2962ff",
            ":hover": { backgroundColor: "#0039cb" },
            borderRadius: "12px",
            fontWeight: "bold",
            height: "48px",
          }}
          onClick={() => nav("/list")}
        >
          + Арендовать парковку
        </Button>
      </Box>
    </Box>
  );
};

export default ZonePage;
