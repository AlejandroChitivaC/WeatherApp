import { createContext, useContext, useState, ReactNode } from "react";
import { CredentialResponse } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode"; 
import { Report } from "notiflix/build/notiflix-report-aio";

// Define el tipo de datos que vamos a decodificar del JWT
interface DecodedJWT {
  name: string;
  email: string;
  picture: string;
}

// Interfaz para el usuario autenticado
interface User {
  name: string;
  email: string;
  imageUrl: string;
}

// Interfaz para el contexto de autenticación
interface AuthContextType {
  user: User | null;
  login: (credentialResponse: CredentialResponse) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (credentialResponse: CredentialResponse) => {
    if (credentialResponse.credential) {
      const decoded: DecodedJWT = jwtDecode<DecodedJWT>(
        credentialResponse.credential
      );
      const userInfo: User = {
        name: decoded.name,
        email: decoded.email,
        imageUrl: decoded.picture,
      };
      setUser(userInfo);
      localStorage.setItem("token", credentialResponse.credential);
    } else {
      console.error("No se obtuvo el token de autenticación.");
    }
  };

  const logout = () => {
    setTimeout(() => {
      Report.success("Exito", "Sesión cerrada", "Ok");
      setUser(null);
    }, 800);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
