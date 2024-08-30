import axios from 'axios';

const API_URL = 'https://api.open-meteo.com/v1/forecast';

export const getWeatherData = async (latitude, longitude) => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        latitude,
        longitude,
        daily: 'temperature_2m_max,temperature_2m_min',
        current_weather: true,
        timezone: 'auto'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
};
