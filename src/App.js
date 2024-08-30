import React from 'react';
import styled from 'styled-components';
import WeatherWidget from './components/WeatherWidget';

const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0; 
  margin: 0;
`;

function App() {
  return (
    <AppContainer>
      <WeatherWidget />
    </AppContainer>
  );
}

export default App;
