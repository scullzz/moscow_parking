// src/components/Navigation.tsx
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium"; // корона
import SettingsIcon from "@mui/icons-material/Settings"; // шестерёнка
import MailIcon from "@mui/icons-material/Mail"; // конверт
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const pages = [
    { label: "Парковки", icon: <SearchIcon />, path: "/" },
    {
      label: "Подписка",
      icon: <WorkspacePremiumIcon />,
      path: "/subscription",
    },
    { label: "Настройки", icon: <SettingsIcon />, path: "/settings" },
    { label: "Контакты", icon: <MailIcon />, path: "/contacts" },
  ];

  const currentIndex = pages.findIndex((p) => p.path === location.pathname);
  const [value, setValue] = useState(currentIndex === -1 ? 0 : currentIndex);

  useEffect(() => {
    setValue(currentIndex === -1 ? 0 : currentIndex);
  }, [location]);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    navigate(pages[newValue].path);
  };

  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 1000 }}
      elevation={3}
    >
      <BottomNavigation value={value} onChange={handleChange}>
        {pages.map((page, index) => (
          <BottomNavigationAction
            key={index}
            label={page.label}
            icon={page.icon}
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
}

export default Navigation;
