import axios from 'axios';

const API_URL = "https://restcountries.com/v3.1/alpha/";

export const getCountryByCode = async (countryCode: string) => {
    try {
        const response = await axios.get(`${API_URL}${countryCode}`);
        if (response.status !== 200) {
            throw new Error(`Error al obtener el país: ${response.statusText}`);
        }
        return response.data;
    } catch (error) {
        console.error("Error en la API de países:", error);
        throw error;
    }
};
