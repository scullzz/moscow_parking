import { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Snackbar,
  Alert,
  Autocomplete,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTelegram } from "../../../utils/telegramHook";

interface ZoneOption {
  id: number;
  zone_id: string;
  name: string;
}

interface VehicleOption {
  id: number;
  license_plate: string;
  vehicle_type: string;
}

function HomePage() {
  const nav = useNavigate();
  const tg = useTelegram();

  const [zones, setZones] = useState<ZoneOption[]>([]);
  const [vehicles, setVehicles] = useState<VehicleOption[]>([]);

  const [zone, setZone] = useState<string>("");
  const [vehicle, setVehicle] = useState<string>("");
  const [type, setType] = useState<string>("");

  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [alert, setAlert] = useState<{
    open: boolean;
    severity: "success" | "error";
    message: string;
  }>({ open: false, severity: "success", message: "" });

  /* ---------------- fetch ---------------- */
  useEffect(() => {
    const fetchData = async () => {
      try {
        // user data
        const r = await fetch("https://api.projectdevdnkchain.ru/users/me", {
          method: "GET",
          headers: { "Content-Type": "application/json", auth: tg?.initData },
        });
        const res = await r.json();
        setLogin(res.website_login ?? "");
        setPassword(res.website_password ?? "");
      } catch (e) {
        console.error("Ошибка загрузки данных пользователя:", e);
      }

      try {
        // zones
        const zoneResponse = await fetch(
          "https://api.projectdevdnkchain.ru/parking/options",
          {
            headers: { "Content-Type": "application/json", auth: tg?.initData },
          }
        );
        if (!zoneResponse.ok) throw new Error("Не удалось загрузить зоны");
        const zoneData: ZoneOption[] = await zoneResponse.json();
        setZones(zoneData);

        // vehicles
        const vehicleResponse = await fetch(
          "https://api.projectdevdnkchain.ru/vehicles/",
          {
            headers: { "Content-Type": "application/json", auth: tg?.initData },
          }
        );
        if (!vehicleResponse.ok)
          throw new Error("Не удалось загрузить транспорт");
        const vehicleData: VehicleOption[] = await vehicleResponse.json();
        setVehicles(vehicleData);
      } catch (error) {
        console.error("Ошибка загрузки данных:", error);
        setAlert({
          open: true,
          severity: "error",
          message: "Не удалось загрузить данные",
        });
      }
    };

    fetchData();
  }, [tg?.initData]);

  /* ---------------- handlers ---------------- */
  const handleStart = () => {
    if (!login || !password) {
      setAlert({
        open: true,
        severity: "error",
        message: "Вы должны сначала авторизоваться, прежде чем начать!",
      });
      return;
    }

    const body = {
      vehicle_id: Number(vehicle),
      option_id: Number(zone),
      hours: 0,
      minutes: 30,
      type,
      status: "pending",
    };

    fetch("https://api.projectdevdnkchain.ru/parking/start", {
      method: "POST",
      headers: { "Content-Type": "application/json", auth: tg?.initData },
      body: JSON.stringify(body),
    })
      .then(async (r) => {
        if (r.ok) {
          nav("/", {
            replace: true,
            state: {
              autoRefresh: true,
              refreshEveryMs: 30_000,
              refreshForMs: 5 * 60_000,
            },
          });
        } else {
          const err = await r.json().catch(() => ({}));
          throw new Error(err?.message || `Ошибка ${r.status}`);
        }
      })
      .catch((e: Error) =>
        setAlert({ open: true, severity: "error", message: e.message })
      );
  };

  const handleCancel = () => {
    setZone("");
    setVehicle("");
    setType("");
    nav("/");
  };

  const formControlStyle = {
    mb: 2,
    "& .MuiOutlinedInput-root": {
      backgroundColor: "#fff",
      borderRadius: "16px",
      paddingRight: "8px",
    },
    "& .MuiOutlinedInput-notchedOutline": { borderColor: "#f0f0f0" },
    "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#59C36A",
    },
    "& .MuiInputLabel-root": { color: "#9e9e9e" },
    "& .Mui-focused .MuiInputLabel-root": { color: "#59C36A" },
    "& svg": { color: "#b0b0b0" },
  } as const;

  const autocompleteStyle = {
    mb: 2,
    "& .MuiOutlinedInput-root": {
      backgroundColor: "#fff",
      borderRadius: "16px",
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
    "& svg": { color: "#b0b0b0" },
  } as const;

  const selectMenuProps = {
    PaperProps: { sx: { maxHeight: 48 * 6 } },
    MenuListProps: {
      sx: { "&& .MuiMenuItem-root": { py: 0.5 } },
    },
  };

  /* ---------------- jsx ---------------- */
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
        {/* ---- ЗОНА (с поиском) ---- */}
        <Autocomplete
          options={zones}
          noOptionsText="Нет доступных зон"
          getOptionLabel={(opt) => opt.name}
          isOptionEqualToValue={(o, v) => o.id === v.id}
          value={zones.find((z) => z.id.toString() === zone) || null}
          onChange={(_, newValue) =>
            setZone(newValue ? newValue.id.toString() : "")
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="Парковка №"
              variant="outlined"
              size="medium"
            />
          )}
          sx={autocompleteStyle}
        />

        {/* ---- ТРАНСПОРТ ---- */}
        <FormControl fullWidth sx={formControlStyle} size="medium">
          <InputLabel id="vehicle-label">Транспортное средство</InputLabel>
          <Select
            labelId="vehicle-label"
            value={vehicle}
            label="Транспортное средство"
            onChange={(e: SelectChangeEvent) => setVehicle(e.target.value)}
            input={<OutlinedInput label="Транспортное средство" />}
            MenuProps={selectMenuProps}
          >
            {vehicles.length === 0 ? (
              <MenuItem disabled>Нет доступных транспортных средств</MenuItem>
            ) : (
              vehicles.map((v) => (
                <MenuItem key={v.id} value={v.id.toString()}>
                  {v.license_plate}
                </MenuItem>
              ))
            )}
          </Select>
        </FormControl>

        {/* ---- РЕЖИМ ---- */}
        <FormControl fullWidth sx={formControlStyle} size="medium">
          <InputLabel id="type-label">Режим</InputLabel>
          <Select
            labelId="type-label"
            value={type}
            label="Режим"
            onChange={(e: SelectChangeEvent) => setType(e.target.value)}
            input={<OutlinedInput label="Режим" />}
            MenuProps={selectMenuProps}
          >
            <MenuItem value="standard">Стандартный</MenuItem>
            <MenuItem value="advanced">Периодичный</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* ---- BUTTONS ---- */}
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
          disabled={!zone || !vehicle || !type}
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

      {/* ---- ALERT ---- */}
      <Snackbar
        open={alert.open}
        autoHideDuration={4000}
        onClose={() => setAlert((a) => ({ ...a, open: false }))}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setAlert((a) => ({ ...a, open: false }))}
          severity={alert.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default HomePage;
