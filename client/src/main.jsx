import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { FarmProvider } from "./contexts/FarmContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <FarmProvider>
        <App />
      </FarmProvider>
    </AuthProvider>
  </BrowserRouter>
);
