import { useState, useEffect } from 'react';
import { getWeatherByCity } from '../api/weatherApi';

interface WeatherData {
    name: string;
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
        sea_level?: number;
        grnd_level?: number;
    };
    weather: Array<{
        id: number;
        main: string;
        description: string;
        icon: string;
    }>;
    wind: {
        speed: number;
        deg: number;
    };
    clouds: {
        all: number;
    };
    sys: {
        country: string;
        sunrise: number;
        sunset: number;
    };
    coord: {
        lon: number;
        lat: number;
    };
    timezone: number;
    visibility: number;
    dt: number;
}

const useWeather = (city: string) => {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (city) {
            const fetchWeather = async () => {
                try {
                    const data = await getWeatherByCity(city);
                    setWeather(data);
                } catch (err) {
                    setError('Ciudad no encontrada');
                    console.error(err);
                }
            };
            fetchWeather();
        }
    }, [city]);

    return { weather, error };
};

export default useWeather;
