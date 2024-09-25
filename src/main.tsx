import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "./context/AuthContext.tsx";
import { UserProvider } from "./context/UserContext.tsx";
import { WeatherProvider } from "./context/WeatherContext.tsx";
const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <WeatherProvider>
        <AuthProvider>
          <UserProvider>
            <App />
          </UserProvider>
        </AuthProvider>
      </WeatherProvider>
    </GoogleOAuthProvider>
  </StrictMode>
);
