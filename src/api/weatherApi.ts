// src/api/weatherApi.ts
import axios from 'axios';

const API_KEY = import.meta.env.VITE_OWEATHER_API_KEY;

// Función para obtener el clima de una ciudad específica
export const getWeatherByCity = async (city: string) => {
    try {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=es`
        );

        if (response.status !== 200) {
            throw new Error(`Error al obtener el clima: ${response.statusText}`);
        }

        return response.data;
    } catch (error) {
        console.error("Error en la API de clima:", error);
        throw error;
    }
};
