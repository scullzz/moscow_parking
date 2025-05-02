import { Box, Card, CardContent, Typography, Button } from "@mui/material";

function SubscriptionPage() {
  return (
    <Box sx={{ padding: 2 }}>
      <Card
        sx={{
          borderRadius: "16px",
          marginBottom: 2,
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
        }}
      >
        <CardContent>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Название подписки
          </Typography>
          <Typography variant="body2" sx={{ display: "flex", gap: 1 }}>
            💎 <b>Стоимость:</b>
          </Typography>
          <Typography variant="body2" sx={{ display: "flex", gap: 1 }}>
            📅 <b>Длительность:</b>
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
            Активно до 23.05.2025
          </Button>
        </CardContent>
      </Card>

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

      {[1, 2].map((_, index) => (
        <Card
          key={index}
          sx={{
            borderRadius: "16px",
            marginBottom: 2,
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
          }}
        >
          <CardContent>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Название подписки
            </Typography>
            <Typography variant="body2" sx={{ display: "flex", gap: 1 }}>
              💎 <b>Стоимость:</b>
            </Typography>
            <Typography variant="body2" sx={{ display: "flex", gap: 1 }}>
              📅 <b>Длительность:</b>
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
