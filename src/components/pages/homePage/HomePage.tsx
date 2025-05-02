import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const nav = useNavigate();
  const [zone, setZone] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [type, setType] = useState("");

  const handleStart = () => {
    console.log("НАЧАТЬ", { zone, vehicle, type });
    nav('/list')
  };

  const handleCancel = () => {
    setZone("");
    setVehicle("");
    setType("");
  };

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

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#fff",
      }}
    >
      <Box
        sx={{
          flexGrow: 1,
          px: 3,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <FormControl fullWidth sx={formControlStyle} size="medium">
          <InputLabel id="zone-label">Зона</InputLabel>
          <Select
            labelId="zone-label"
            value={zone}
            label="Зона"
            onChange={(e: SelectChangeEvent) => setZone(e.target.value)}
            input={<OutlinedInput label="Зона" />}
          >
            <MenuItem value="">Select platform</MenuItem>
            <MenuItem value="zone1">Зона 1</MenuItem>
            <MenuItem value="zone2">Зона 2</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth sx={formControlStyle} size="medium">
          <InputLabel id="vehicle-label">Транспортное средство</InputLabel>
          <Select
            labelId="vehicle-label"
            value={vehicle}
            label="Транспортное средство"
            onChange={(e: SelectChangeEvent) => setVehicle(e.target.value)}
            input={<OutlinedInput label="Транспортное средство" />}
          >
            <MenuItem value="">Select platform</MenuItem>
            <MenuItem value="car">Машина</MenuItem>
            <MenuItem value="bike">Велосипед</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth sx={formControlStyle} size="medium">
          <InputLabel id="type-label">Тип</InputLabel>
          <Select
            labelId="type-label"
            value={type}
            label="Тип"
            onChange={(e: SelectChangeEvent) => setType(e.target.value)}
            input={<OutlinedInput label="Тип" />}
          >
            <MenuItem value="">Select platform</MenuItem>
            <MenuItem value="hourly">Почасовая</MenuItem>
            <MenuItem value="daily">Посуточная</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: 2,
          px: 2,
          pt: 2,
          pb: `calc(env(safe-area-inset-bottom, 16px) + 56px + 11px)`,
          backgroundColor: "#fff",
          position: "sticky",
          bottom: 0,
          zIndex: 10,
        }}
      >
        <Button
          onClick={handleStart}
          fullWidth
          sx={{
            backgroundColor: "#59C36A",
            ":hover": { backgroundColor: "#45a055" },
            borderRadius: "12px",
            fontWeight: "bold",
            color: "#fff",
            textTransform: "none",
            height: "48px",
          }}
        >
          Начать
        </Button>

        <Button
          onClick={handleCancel}
          fullWidth
          sx={{
            backgroundColor: "#C4C4C4",
            ":hover": { backgroundColor: "#a8a8a8" },
            borderRadius: "12px",
            fontWeight: "bold",
            color: "#fff",
            textTransform: "none",
          }}
        >
          Отменить
        </Button>
      </Box>
    </Box>
  );
}

export default HomePage;
