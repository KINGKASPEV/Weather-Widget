import React, { useState } from 'react';
import styled from 'styled-components';
import { getWeatherData } from '../services/weatherService';
import LatLongInput from './LatLongInput';
import { getLocationName } from './getLocationName';

const WidgetContainer = styled.div`
  max-width: 450px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  text-align: center;
  font-family: 'Arial', sans-serif;
  background: #f9f9f9;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
`;

const WeatherData = styled.div`
  margin-top: 20px;
  text-align: left;
  background: #fff;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.1);
`;

const Title = styled.h2`
  color: #333;
  margin-bottom: 20px;
`;

const LoadingText = styled.p`
  font-size: 16px;
  color: #3498db;
`;

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState('');

  const handleFetchWeather = async ({ lat, long }) => {
    setLoading(true);
    const weatherData = await getWeatherData(lat, long);
    setLoading(false);

    if (weatherData) {
        setWeather(weatherData);
        const locationName = await getLocationName(lat, long);
        setLocation(locationName);
      } else {
        alert('Unable to fetch weather data. Please try again.');
      }
    };

  const currentTime = weather?.current_weather?.time || '--';
  const currentTemp = weather?.current_weather?.temperature || '--';
  const highTemp = weather?.daily?.temperature_2m_max[0] || '--';
  const lowTemp = weather?.daily?.temperature_2m_min[0] || '--';
  const weatherCode = weather?.current_weather?.weathercode || '--';
  const windSpeed = weather?.current_weather?.windspeed || '--';

  return (
    <WidgetContainer>
      <Title>Weather Widget</Title>
      <LatLongInput onSubmit={handleFetchWeather} />
      {loading ? (
        <LoadingText>Loading...</LoadingText>
      ) : weather ? (
        <WeatherData>
          <p>Location: {location || 'N/A'}</p>
          <p>Current Time: {currentTime}</p>
          <p>Current Temperature: {currentTemp}°C</p>
          <p>High: {highTemp}°C</p>
          <p>Low: {lowTemp}°C</p>
          <p>Weather Code: {weatherCode}</p>
          <p>Wind Speed: {windSpeed} km/h</p>
        </WeatherData>
      ) : (
        <WeatherData>
          <p>Location: --</p>
          <p>Current Time: --</p>
          <p>Current Temperature: --</p>
          <p>High: --</p>
          <p>Low: --</p>
          <p>Weather Code: --</p>
          <p>Wind Speed: --</p>
        </WeatherData>
      )}
    </WidgetContainer>
  );
};

export default WeatherWidget;
