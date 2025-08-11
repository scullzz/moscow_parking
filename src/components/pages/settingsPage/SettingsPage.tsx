import {
  Box,
  TextField,
  IconButton,
  InputAdornment,
  Button,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useTelegram } from "../../../utils/telegramHook";

const minutesToHMS = (m: number | "") => {
  if (m === "") return "00:00:00";
  const min = Number(m);
  const h = Math.floor(min / 60);
  const mm = min % 60;
  return `${String(h).padStart(2, "0")}:${String(mm).padStart(2, "0")}:00`;
};

const HMSToMinutes = (t: string) => {
  const [h = "0", m = "0", s = "0"] = t.split(":");
  let minutes = Number(h) * 60 + Number(m);
  if (Number(s) >= 30) minutes += 1;
  return minutes;
};

const inputStyle = {
  mb: 2,
  "& .MuiOutlinedInput-root": {
    backgroundColor: "#fff",
    borderRadius: "16px",
    paddingRight: "8px",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#f0f0f0",
  },
  "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#59C36A",
  },
  "& .MuiInputLabel-root": {
    color: "#9e9e9e",
  },
  "& .Mui-focused .MuiInputLabel-root": {
    color: "#59C36A",
  },
};

const SettingsPage = () => {
  const tg = useTelegram();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [completeAfterPayment, setCompleteAfterPayment] = useState<number | "">(
    ""
  );
  const [registerAfterComplete, setRegisterAfterComplete] = useState<
    number | ""
  >("");

  const [dirty, setDirty] = useState(false);
  const [loading, setLoading] = useState(true);

  const getAllSettings = async () => {
    try {
      const r = await fetch("https://api.projectdevdnkchain.ru/users/me", {
        method: "GET",
        headers: { "Content-Type": "application/json", auth: tg?.initData },
      });
      const res = await r.json();

      setLogin(res.website_login ?? "");
      setPassword(res.website_password ?? "");
      setCompleteAfterPayment(res.complete_after_payment ?? "");
      setRegisterAfterComplete(res.reissue_after_completion ?? "");
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const updateSettings = async () => {
    try {
      await fetch("https://api.projectdevdnkchain.ru/users/me", {
        method: "PUT",
        headers: { "Content-Type": "application/json", auth: tg?.initData },
        body: JSON.stringify({
          website_login: login,
          website_password: password,
          complete_after_payment: completeAfterPayment || 0,
          reissue_after_completion: registerAfterComplete || 0,
        }),
      });
      setDirty(false);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getAllSettings();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        height: "100vh",
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        px: 3,
      }}
    >
      {/* ----------- данные аккаунта ---------------- */}
      <Box>
        <p
          style={{
            textAlign: "left",
            marginBlock: 10,
            fontSize: 17,
            lineHeight: "22px",
          }}
        >
          Московский паркинг parking.mos.ru
        </p>
        <TextField
          label="Логин"
          fullWidth
          value={login}
          onChange={(e) => {
            setLogin(e.target.value);
            setDirty(true);
          }}
          sx={inputStyle}
          size="medium"
        />

        <TextField
          label="Пароль"
          fullWidth
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setDirty(true);
          }}
          sx={inputStyle}
          size="medium"
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword((p) => !p)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Box>
        <p style={{ textAlign: "left", marginBottom: 15, fontSize: 17 }}>
          Настройки периодичности оплат за парковку
        </p>

        <TextField
          label="Оплачивать парковку (мин. знач. 00:01 минут)"
          fullWidth
          type="time"
          inputProps={{ step: 1, min: "00:01:00" }}
          value={minutesToHMS(completeAfterPayment)}
          onChange={(e) => {
            setCompleteAfterPayment(HMSToMinutes(e.target.value));
            setDirty(true);
          }}
          sx={inputStyle}
          size="medium"
        />

        <TextField
          label="Не оплачивать парковку (не больше 00:05 минут)"
          fullWidth
          type="time"
          inputProps={{ step: 1, min: "00:00:00" }}
          value={minutesToHMS(registerAfterComplete)}
          onChange={(e) => {
            setRegisterAfterComplete(HMSToMinutes(e.target.value));
            setDirty(true);
          }}
          sx={inputStyle}
          size="medium"
        />
      </Box>

      {dirty && (
        <Button
          variant="contained"
          sx={{
            mt: 2,
            borderRadius: "16px",
            alignSelf: "center",
            backgroundColor: "#31d158",
          }}
          onClick={updateSettings}
        >
          Сохранить
        </Button>
      )}
    </Box>
  );
};

export default SettingsPage;
