import { Box, TextField } from "@mui/material";
import { useState } from "react";

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
  const [completeAfterPayment, setCompleteAfterPayment] = useState("");
  const [registerAfterComplete, setRegisterAfterComplete] = useState("");

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
        onChange={(e) => setLogin(e.target.value)}
        sx={inputStyle}
        size="medium"
      />
      <TextField
        label="Пароль"
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={inputStyle}
        size="medium"
        type="password"
      />
      <TextField
        label="Завершать после оплаты через"
        fullWidth
        value={completeAfterPayment}
        onChange={(e) => setCompleteAfterPayment(e.target.value)}
        sx={inputStyle}
        size="medium"
      />
      <TextField
        label="Оформлять после завершения через"
        fullWidth
        value={registerAfterComplete}
        onChange={(e) => setRegisterAfterComplete(e.target.value)}
        sx={inputStyle}
        size="medium"
      />
    </Box>
  );
};

export default SettingsPage;
