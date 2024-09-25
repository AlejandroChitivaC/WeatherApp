import { useState, useEffect } from "react";
import { useWeatherContext } from "../context/WeatherContext";
import useWeather from "../hooks/useWeather";
import useCountry from "../hooks/useCountry";
import { useAuth } from "../context/AuthContext";
import { Cloud, Droplets, Sun, Wind, Search, LogOut } from "lucide-react";
import { toPascalCase } from "../utils/utils";

const Weather = () => {
  const [city, setCity] = useState("");
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [showCountryInfo, setShowCountryInfo] = useState(false); // Estado para manejar el despliegue del país
  const suggestedCities = ["Bogotá", "Miami", "New York"];
  const { weather } = useWeather(city);
  const countryCode = weather?.sys?.country;
  const { country } = useCountry(countryCode || "");
  const { cities, addCity } = useWeatherContext();
  const { user, logout } = useAuth();

  useEffect(() => {
    const savedHistory = localStorage.getItem("weatherSearchHistory");
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("weatherSearchHistory", JSON.stringify(searchHistory));
  }, [searchHistory]);

  useEffect(() => {
    localStorage.setItem("weatherHistory", JSON.stringify(cities));
  }, [cities]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const cityInput = e.currentTarget.city.value.trim();
    if (cityInput && !suggestedCities.includes(cityInput)) {
      setSearchHistory((prev) => {
        const updatedHistory = [
          ...prev.filter((c) => c !== cityInput),
          cityInput,
        ].slice(-5);
        return updatedHistory;
      });
    }
    setCity(cityInput);
    addCity(cityInput);
  };

  const handleCityClick = (city: string) => {
    setCity(city);
  };

  const toggleCountryInfo = () => {
    setShowCountryInfo((prev) => !prev); // Alterna el estado de mostrar o no la información del país
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-300 via-blue-400 to-blue-500 p-4 relative overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            "url('https://media.istockphoto.com/id/1282788290/vector/blue-cloud-cartoon-on-top-sky-outdoor-landscape-background-flat-design-vector.jpg?s=612x612&w=0&k=20&c=7c28seVQ82mi8RlFC6CSfJHYfURxvfLtmRPTx9Gdg_g=')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(3.5px)",
        }}
      ></div>

      <div className="z-10 w-full max-w-md">
        <div className="bg-white bg-opacity-80 backdrop-blur-md rounded-3xl shadow-2xl p-8 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-blue-800">HP Weather App</h1>
            {user && (
              <div className="flex items-center space-x-2">
                <img
                  src={user.imageUrl}
                  alt="Avatar"
                  className="w-8 h-8 rounded-full"
                />
                <button
                  onClick={logout}
                  className="text-red-500 hover:text-red-700"
                >
                  <LogOut size={20} />
                </button>
              </div>
            )}
          </div>

          <form onSubmit={handleSearch} className="mb-6">
            <div className="relative">
              <input
                name="city"
                placeholder="Buscar ciudad..."
                className="w-full p-3 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="absolute right-3 top-3 text-blue-500"
              >
                <Search size={20} />
              </button>
            </div>
          </form>

          {/* Ciudades sugeridas */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-blue-700 mb-2">
              Ciudades Sugeridas
            </h3>
            <div className="flex flex-wrap gap-2">
              {suggestedCities.map((city, index) => (
                <button
                  key={index}
                  onClick={() => handleCityClick(city)}
                  className="bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm hover:bg-blue-200 transition duration-300"
                >
                  {city}
                </button>
              ))}
            </div>
          </div>

          {/* Historial de búsqueda */}
          {searchHistory.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-bold text-blue-700 mb-2">
                Historial de Búsqueda
              </h3>
              <div className="flex flex-wrap gap-2">
                {searchHistory.map((city, index) => (
                  <button
                    key={index}
                    onClick={() => handleCityClick(city)}
                    className="bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm hover:bg-blue-200 transition duration-300"
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>
          )}

          {weather && (
            <>
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-blue-800 mb-2">
                  {weather.name}
                </h2>
                <div className="text-5xl font-bold text-blue-600 mb-4">
                  {Math.round(weather.main.temp)}°C{" "}
                </div>
                <p className="text-xl font-semibold text-blue-800">
                  {toPascalCase(weather.weather[0].description)}{" "}
                </p>
              </div>
              <div className="flex justify-center mb-6">
                {weather.weather[0].description
                  .toLowerCase()
                  .includes("nube") ? (
                  <Cloud size={80} className="text-blue-400" />
                ) : (
                  <Sun size={80} className="text-yellow-400" />
                )}
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center bg-blue-100 rounded-full px-4 py-2">
                  <Droplets className="text-blue-500 mr-2" size={24} />
                  <span className="text-blue-800 font-medium">
                    {weather.main.humidity}%
                  </span>
                </div>
                <div className="flex items-center bg-blue-100 rounded-full px-4 py-2">
                  <Wind className="text-blue-500 mr-2" size={24} />
                  <span className="text-blue-800 font-medium">
                    {Math.round(weather.wind.speed * 3.6)} km/h{" "}
                  </span>
                </div>
              </div>
            </>
          )}

          {country && (
            <div
              onClick={toggleCountryInfo} // Alterna el estado para mostrar u ocultar la info del país
              className="cursor-pointer bg-blue-50 p-4 rounded-lg hover:bg-blue-100 transition duration-300"
            >
              <h3 className="text-xl font-bold text-blue-700">
                {country.translations.spa.common}
              </h3>
            </div>
          )}

          {showCountryInfo && country && (
            <div className=" bg-opacity-80 backdrop-blur-md rounded-3xl shadow-2xl p-8 mt-4">
              <h3 className="text-2xl font-bold text-blue-700 mb-4">
                Información del País
              </h3>
              <p className="text-gray-600 mb-2">
                <span className="font-semibold">Capital:</span>{" "}
                {country.capital[0]}
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-semibold">Población:</span>{" "}
                {country.population.toLocaleString()}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Moneda:</span>{" "}
                {Object.keys(country.currencies)[0]} , 
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Weather;
