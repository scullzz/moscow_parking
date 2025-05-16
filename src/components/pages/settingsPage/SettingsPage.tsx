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
// import { tg } from "../../../main";

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
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [completeAfterPayment, setCompleteAfterPayment] = useState("");
  const [registerAfterComplete, setRegisterAfterComplete] = useState("");

  const [dirty, setDirty] = useState(false);
  const [loading, setLoading] = useState(true);

  const getAllSettings = async () => {
    try {
      const r = await fetch("https://api.projectdevdnkchain.ru/users/me", {
        method: "GET",
        headers: { "Content-Type": "application/json", auth: "123" },
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
        headers: { "Content-Type": "application/json", auth: "123" },
        body: JSON.stringify({
          website_login: login,
          website_password: password,
          complete_after_payment: completeAfterPayment,
          reissue_after_completion: registerAfterComplete,
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
              <IconButton onClick={() => setShowPassword((p) => !p)} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <TextField
        label="Завершать после оплаты через"
        fullWidth
        value={completeAfterPayment}
        onChange={(e) => {
          setCompleteAfterPayment(e.target.value);
          setDirty(true);
        }}
        sx={inputStyle}
        size="medium"
      />

      <TextField
        label="Оформлять после завершения через"
        fullWidth
        value={registerAfterComplete}
        onChange={(e) => {
          setRegisterAfterComplete(e.target.value);
          setDirty(true);
        }}
        sx={inputStyle}
        size="medium"
      />

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
