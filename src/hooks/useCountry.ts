import { useState, useEffect } from 'react';
import axios from 'axios';

interface CountryData {
  name: {
    common: string,
  }
  translations: {
    spa: {
      common: string;
    };
  };
  capital: string[];
  population: number;
  currencies: {
    [key: string]: {
      name: string;
    };
  };
}

const useCountry = (countryCode: string) => {
  const [country, setCountry] = useState<CountryData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (countryCode) {
      const fetchCountry = async () => {
        try {
          const response = await axios.get(
            `https://restcountries.com/v3.1/alpha/${countryCode}`
          );
          setCountry(response.data[0]); // Acceder al primer país en la respuesta
        } catch (err) {
          setError('País no encontrado');
          console.error(err);
        }
      };
      fetchCountry();
    }
  }, [countryCode]);

  return { country, error };
};

export default useCountry;
