import { Box, Typography, Card, CardContent, Button } from "@mui/material";

const ZoneCard = ({
  showButton = false,
}: {
  completed?: boolean;
  showButton?: boolean;
}) => (
  <Card
    sx={{
      borderRadius: "16px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
      mb: 2,
    }}
  >
    <CardContent>
      <Typography fontWeight="bold" sx={{ mb: 1 }}>
        Зона:
      </Typography>
      <Typography variant="body2">🚗 Транспорт:</Typography>
      <Typography variant="body2">📅 Начало:</Typography>
      <Typography variant="body2">📅 Окончание:</Typography>
      <Typography variant="body2">⏱️ Длительность:</Typography>
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
        >
          Завершить
        </Button>
      )}
    </CardContent>
  </Card>
);

const ZonePage = () => {
  return (
    <Box sx={{ p: 2, pb: 16 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          mb: 2,
        }}
      >
        <Box
          sx={{
            backgroundColor: "#fff",
            px: 2,
            py: 1,
            borderRadius: "999px",
            boxShadow: "0 0 8px rgba(0,0,0,0.1)",
            display: "flex",
            alignItems: "center",
            fontWeight: "bold",
            height: "30px"
          }}
        >
          1000 🪙
        </Box>
      </Box>

      <ZoneCard />
      <ZoneCard />

      <Typography
        variant="body2"
        sx={{
          textAlign: "center",
          my: 2,
          color: "gray",
          fontStyle: "italic",
        }}
      >
        ------- Завершенные сегодня -------
      </Typography>

      <ZoneCard showButton />
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
        >
          + Арендовать парковку
        </Button>
      </Box>
    </Box>
  );
};

export default ZonePage;
