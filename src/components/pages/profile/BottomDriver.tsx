import { useState, useMemo, ChangeEvent } from "react";
import {
  SwipeableDrawer,
  Box,
  TextField,
  Button,
  Typography,
} from "@mui/material";

type Props = { open: boolean; onClose: () => void; onOpen: () => void };

const MAX_BIO = 300;
const PINK = "#E203A8";
const glowBgStrong = `radial-gradient(circle at 50% 140%, rgba(226,3,168,.9) 0%, rgba(226,3,168,0) 65%)`;

const fieldSx = {
  mb: 2,
  "& .MuiInputBase-root": {
    color: "#fff",
    backgroundColor: "#000",
    borderRadius: "24px",
    px: 2,
    fontSize: "18px",
    height: "56px",
  },
  "& .MuiOutlinedInput-notchedOutline": { border: "none" },
  "& .MuiInputBase-input::placeholder": { color: "rgba(255,255,255,.6)" },
};

const textFiledSx = {
  mb: 2,
  "& .MuiInputBase-root": {
    color: "#fff",
    backgroundColor: "#000",
    borderRadius: "24px",
    px: 2,
    fontSize: "18px",
    height: "160px",
  },
  "& .MuiOutlinedInput-notchedOutline": { border: "none" },
  "& .MuiInputBase-input::placeholder": { color: "rgba(255,255,255,.6)" },
};

const genderBtn = (active: boolean) => ({
  width: "160px",
  height: "56px",
  textTransform: "none" as const,
  fontWeight: 500,
  fontSize: "1.0625rem",
  borderRadius: "20px",
  py: 1.25,
  borderWidth: "1px",
  borderStyle: "solid",
  lineHeight: 1.2,
  color: "#fff",
  borderColor: active ? PINK : "rgba(226,3,168,.35)",
  background: active ? `${glowBgStrong}, #000` : "#000",
  boxShadow: active ? `0 0 22px 2px rgba(226,3,168,.75)` : "none",
});

const saveBtn = (enabled: boolean) => ({
  width: "100%",
  height: 56,
  borderRadius: 20,
  borderWidth: 1,
  borderStyle: "solid",
  fontSize: 18,
  fontWeight: 500,
  textTransform: "none" as const,
  transition: "all .15s ease",
  opacity: 1,
  ...(enabled
    ? {
        color: PINK,
        borderColor: "transparent",
        background: "#fff",
        boxShadow: "0 0 36px 6px rgba(226,3,168,.7)",
        "&:hover": {
          background: "#fff",
          boxShadow: "0 0 42px 8px rgba(226,3,168,.9)",
        },
      }
    : {
        borderColor: "rgba(226,3,168,.25)",
        background: "#000",
        cursor: "not-allowed",
      }),
  "&.Mui-disabled": {
    color: "rgba(255,255,255,.3)",
    borderColor: "rgba(226,3,168,.25)",
    background: "#000",
    fontSize: 18,
    fontWeight: 500,
  },
});

export default function BottomDrawer({ open, onClose, onOpen }: Props) {
  const [gender, setGender] = useState<"male" | "female" | "">("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [age, setAge] = useState("");
  const [bio, setBio] = useState("");

  const valid = useMemo(() => {
    if (
      !gender ||
      !name.trim() ||
      !surname.trim() ||
      !age.trim() ||
      !bio.trim()
    )
      return false;
    const n = Number(age);
    return !Number.isNaN(n) && n >= 1 && n <= 120;
  }, [gender, name, surname, age, bio]);

  const handleSubmit = () =>
    valid && console.log({ name, surname, age, gender, bio });

  return (
    <SwipeableDrawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      onOpen={onOpen}
      disableSwipeToOpen={false}
      PaperProps={{
        sx: {
          backgroundColor: "#141414",
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          color: "#fff",
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Box sx={{ px: 3, pt: 2, pb: 0, flex: 1 }}>
        <Box
          sx={{
            mx: "auto",
            mb: 2,
            width: 40,
            height: 4,
            borderRadius: 2,
            backgroundColor: "#333",
          }}
        />

        <Typography
          align="center"
          sx={{ fontSize: 24, fontWeight: 500, mb: 3 }}
        >
          Редактировать профиль
        </Typography>

        <Box sx={{ mb: 4, display: "flex", justifyContent: "space-between" }}>
          <Button
            disableRipple
            onClick={() => setGender("male")}
            sx={genderBtn(gender === "male")}
          >
            Парень
          </Button>
          <Button
            disableRipple
            onClick={() => setGender("female")}
            sx={genderBtn(gender === "female")}
          >
            Девушка
          </Button>
        </Box>

        <TextField
          placeholder="Алексей"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          required
          sx={fieldSx}
          InputLabelProps={{ shrink: false }}
        />

        <TextField
          placeholder="Трофимов"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          fullWidth
          required
          sx={fieldSx}
          InputLabelProps={{ shrink: false }}
        />

        <TextField
          placeholder="23"
          value={age}
          onChange={(e) => setAge(e.target.value.replace(/[^\d]/g, ""))}
          fullWidth
          required
          sx={fieldSx}
          InputLabelProps={{ shrink: false }}
          inputMode="numeric"
        />

        <TextField
          placeholder="О себе…"
          value={bio}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setBio(e.target.value.slice(0, MAX_BIO))
          }
          fullWidth
          multiline
          rows={5}
          required
          sx={textFiledSx}
          helperText={`${bio.length}/${MAX_BIO}`}
          FormHelperTextProps={{
            sx: { textAlign: "right", mr: 1, color: "#777" },
          }}
          InputLabelProps={{ shrink: false }}
        />
      </Box>

      {/* ---- fixed save button ---- */}
      <Box sx={{ px: 3, pb: 2 }}>
        <Button
          disableRipple
          fullWidth
          disabled={!valid}
          onClick={handleSubmit}
          sx={saveBtn(valid)}
        >
          Сохранить
        </Button>
      </Box>
    </SwipeableDrawer>
  );
}
