import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { CredentialResponse } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { Report } from "notiflix/build/notiflix-report-aio";

interface DecodedJWT {
  name: string;
  email: string;
  picture: string;
}

interface User {
  name: string;
  email: string;
  imageUrl: string;
}

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

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

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
      localStorage.setItem("user", JSON.stringify(userInfo));
      localStorage.setItem("token", credentialResponse.credential);
    } else {
      console.error("No se obtuvo el token de autenticación.");
    }
  };

  const logout = () => {
    setTimeout(() => {
      setUser(null);
      Report.success("Exito", "Sesión cerrada", "Ok");
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }, 800);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
