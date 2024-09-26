import { createContext, useContext, useState, ReactNode } from "react";

interface WeatherContextType {
  cities: string[];
  addCity: (city: string) => void;
  resetCities: () => void;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const useWeatherContext = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error(
      "useWeatherContext debe ser usado dentro de un WeatherProvider"
    );
  }
  return context;
};

export const WeatherProvider = ({ children }: { children: ReactNode }) => {
  const [cities, setCities] = useState<string[]>([]);

  const addCity = (city: string) => {
    if (!cities.includes(city)) {
      setCities((prevCities) => [...prevCities, city]);
    }
  };

  const resetCities = () => {
    setCities([]);
  };

  return (
    <WeatherContext.Provider value={{ cities, addCity, resetCities }}>
      {children}
    </WeatherContext.Provider>
  );
};
