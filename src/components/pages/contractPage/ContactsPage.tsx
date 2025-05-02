import { Box, List, ListItem, ListItemText, IconButton } from "@mui/material";
import { ChevronRight } from "@mui/icons-material";

function ContactsPage() {
  const items = [
    {
      title: "Наш telegram канал",
      url: "https://google.com",
    },
    {
      title: "Техническая поддержка",
      url: "https://google.com",
    },
  ];

  const handleClick = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f9f9f9",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
      }}
    >
      <List sx={{ width: "100%" }}>
        {items.map((item, index) => (
          <ListItem
            key={index}
            onClick={() => handleClick(item.url)}
            sx={{
              backgroundColor: "#fff",
              borderRadius: "24px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
              marginBottom: "12px",
              padding: "12px 16px",
              height: "54px",
              cursor: "pointer",
            }}
            secondaryAction={
              <IconButton edge="end">
                <ChevronRight sx={{ color: "#007AFF" }} />
              </IconButton>
            }
          >
            <ListItemText primary={item.title} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default ContactsPage;
