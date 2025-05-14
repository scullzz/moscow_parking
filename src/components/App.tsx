import { Routes, Route } from "react-router-dom";
import useTelegramWebAppInit from "../utils/telegramInit";
import HomePage from "./pages/homePage/HomePage";
import SubscriptionPage from "./pages/subPage/SubscriptionPage";
import ContactsPage from "./pages/contractPage/ContactsPage";
import Navigation from "./Navigation";
import SuccessPayment from "./SuccessPayment";
import SettingsPage from "./pages/settingsPage/SettingsPage";
import ZonePage from "./pages/zonePage/ZonePage";

function App() {
  useTelegramWebAppInit();

  return (
    <div style={{ position: "relative", height: "100vh" }}>
      <div style={{ height: "100%", overflow: "auto" }}>
        <Routes>
          <Route path="/" element={<ZonePage />} />
          <Route path="/list" element={<HomePage />} />
          <Route path="/subscription" element={<SubscriptionPage />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="/success" element={<SuccessPayment />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </div>

      <Navigation />
    </div>
  );
}

export default App;
