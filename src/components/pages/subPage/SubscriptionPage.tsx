import { Box, Card, CardContent, Typography, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { format, parseISO } from "date-fns";
// import { tg } from "../../../main";

interface ITariff {
  id: string;
  name: string;
  description: string;
  days_count: number;
  price: number;
  filters_count: number;
}

export interface AssignedTariffSubscription {
  id: number;
  name: string;
  description: string;
  days_count: number;
  price: number;
  filters_count: number;
  create_dttm: string;
  update_dttm: string;
}

export interface IActiveSubscription {
  id: number;
  user_id: number;
  tariff: AssignedTariffSubscription;
  subscription_end: string;
  create_dttm: string;
  update_dttm: string;
}

function SubscriptionPage() {
  const [tariffs, setTariffs] = useState<ITariff[]>([]);
  const [activeSubscription, setActiveSubscription] =
    useState<IActiveSubscription | null>(null);

  const getAllTariffs = async () => {
    try {
      const response = await fetch(
        "https://api.projectdevdnkchain.ru/tariffs/",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            auth: "123",
          },
        }
      );

      const res = await response.json();
      setTariffs(res);
    } catch (err) {
      console.log(err);
    }
  };

  const getActiveSubscription = async () => {
    try {
      const r = await fetch(
        "https://api.projectdevdnkchain.ru/subscription/active",
        {
          method: "GET",
          headers: {
            auth: "123",
            "Content-Type": "application/json",
          },
        }
      );

      // back-end иногда шлёт 200 c `{ detail: "Подписка не найдена" }`
      const data = await r.json();

      // если detail есть — значит подписки нет
      if (!r.ok || (data && "detail" in data)) {
        setActiveSubscription(null);
      } else {
        setActiveSubscription(data as IActiveSubscription);
      }
    } catch (err) {
      console.log(err);
      setActiveSubscription(null); // на всякий случай
    }
  };

  useEffect(() => {
    getAllTariffs();
    getActiveSubscription();
  }, []);

  const activateSubscription = async (id: number) => {
    try {
      const response = await fetch(
        "https://api.projectdevdnkchain.ru/payhistory/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            auth: "123",
          },
          body: JSON.stringify({
            tariff_id: id,
            email: "moscow_parking@gmail.com",
            description: "Подписка на тариф #" + id,
          }),
        }
      );
      if (response.ok) {
        const res = await response.json();
        window.location.replace(res.payment_url);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      {activeSubscription && (
        <Card
          sx={{
            borderRadius: "16px",
            marginBottom: 2,
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
          }}
        >
          <CardContent>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginBottom: 10,
              }}
            >
              <Typography variant="h6" fontWeight="bold">
                {activeSubscription.tariff.name}
              </Typography>
              <Typography>{activeSubscription.tariff.description}</Typography>
            </div>
            <Typography variant="body2" sx={{ display: "flex", gap: 1 }}>
              💎 <b>Стоимость:</b> {activeSubscription.tariff.price} ₽
            </Typography>
            <Typography variant="body2" sx={{ display: "flex", gap: 1 }}>
              📅 <b>Длительность:</b> {activeSubscription.tariff.days_count}{" "}
              дней
            </Typography>
            <Button
              fullWidth
              variant="contained"
              sx={{
                backgroundColor: "#59C36A",
                borderRadius: "10px",
                marginTop: 2,
                ":hover": {
                  backgroundColor: "#45a055",
                },
                fontWeight: "bold",
              }}
            >
              Активно до{" "}
              {format(
                parseISO(activeSubscription.subscription_end),
                "dd.MM.yyyy"
              )}
            </Button>
          </CardContent>
        </Card>
      )}

      <Typography
        variant="body2"
        sx={{
          textAlign: "center",
          color: "gray",
          marginY: 2,
          fontStyle: "italic",
        }}
      >
        -------Все подписки-------
      </Typography>

      {tariffs.map((t, index) => (
        <Card
          key={index}
          sx={{
            borderRadius: "16px",
            marginBottom: 2,
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
          }}
        >
          <CardContent>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginBottom: 10,
              }}
            >
              <Typography variant="h6" fontWeight="bold">
                {t.name}
              </Typography>
              <Typography>{t.description}</Typography>
            </div>
            <Typography variant="body2" sx={{ display: "flex", gap: 1 }}>
              💎 <b>Стоимость:</b> {t.price} ₽
            </Typography>
            <Typography variant="body2" sx={{ display: "flex", gap: 1 }}>
              📅 <b>Длительность:</b> {t.days_count} дней
            </Typography>
            <Button
              fullWidth
              variant="contained"
              sx={{
                backgroundColor: "#2962ff",
                borderRadius: "10px",
                marginTop: 2,
                ":hover": {
                  backgroundColor: "#0039cb",
                },
                fontWeight: "bold",
              }}
              onClick={() => activateSubscription(+t.id)}
            >
              Активировать
            </Button>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

export default SubscriptionPage;
