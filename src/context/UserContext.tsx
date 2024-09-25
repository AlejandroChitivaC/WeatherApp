import { createContext, useState, ReactNode, useContext } from 'react';

// Definir la estructura del usuario
interface User {
  name: string;
  email: string;
  imageUrl: string;
}

// Definir el tipo de contexto de usuario
interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

// Inicializar el contexto con un valor undefined
const UserContext = createContext<UserContextType | undefined>(undefined);

// Proveedor de contexto para el estado del usuario
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook personalizado para usar el contexto de usuario
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
