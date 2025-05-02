import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";

const formControlStyle = {
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
  "& svg": {
    color: "#b0b0b0",
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
      <FormControl fullWidth sx={formControlStyle} size="medium">
        <InputLabel id="login-label">Логин</InputLabel>
        <Select
          labelId="login-label"
          value={login}
          label="Логин"
          onChange={(e: SelectChangeEvent) => setLogin(e.target.value)}
          input={<OutlinedInput label="Логин" />}
        >
          <MenuItem value="">Select platform</MenuItem>
          <MenuItem value="option1">Option 1</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth sx={formControlStyle} size="medium">
        <InputLabel id="password-label">Пароль</InputLabel>
        <Select
          labelId="password-label"
          value={password}
          label="Пароль"
          onChange={(e: SelectChangeEvent) => setPassword(e.target.value)}
          input={<OutlinedInput label="Пароль" />}
        >
          <MenuItem value="">Select platform</MenuItem>
          <MenuItem value="option1">Option 1</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth sx={formControlStyle} size="medium">
        <InputLabel id="complete-after-label">
          Завершать после оплаты через
        </InputLabel>
        <Select
          labelId="complete-after-label"
          value={completeAfterPayment}
          label="Завершать после оплаты через"
          onChange={(e: SelectChangeEvent) =>
            setCompleteAfterPayment(e.target.value)
          }
          input={<OutlinedInput label="Завершать после оплаты через" />}
        >
          <MenuItem value="">Select platform</MenuItem>
          <MenuItem value="option1">Option 1</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth sx={formControlStyle} size="medium">
        <InputLabel id="register-after-label">
          Оформлять после завершения через
        </InputLabel>
        <Select
          labelId="register-after-label"
          value={registerAfterComplete}
          label="Оформлять после завершения через"
          onChange={(e: SelectChangeEvent) =>
            setRegisterAfterComplete(e.target.value)
          }
          input={<OutlinedInput label="Оформлять после завершения через" />}
        >
          <MenuItem value="">Select platform</MenuItem>
          <MenuItem value="option1">Option 1</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default SettingsPage;
