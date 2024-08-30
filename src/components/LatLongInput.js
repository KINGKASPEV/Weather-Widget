import React, { useState } from 'react';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  width: 60%;
`;

const ErrorMessage = styled.p`
  color: #e74c3c;
  font-size: 14px;
  margin: 0;
`;

const SubmitButton = styled.button`
  padding: 10px 15px;
  border: none;
  background-color: #3498db;
  color: #fff;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: #2980b9;
  }

  &:active {
    transform: scale(0.98);
  }
`;

const LatLongInput = ({ onSubmit }) => {
  const [lat, setLat] = useState('');
  const [long, setLong] = useState('');
  const [error, setError] = useState('');

  const validateInputs = () => {
    const latitude =  parseFloat(lat);
    const longitude = parseFloat(long);

    if (isNaN(latitude) || latitude < -90 || latitude > 90) {
      setError('Please enter a valid latitude between -90 and 90.');
      return false;
    }

    if (isNaN(longitude) || longitude < -180 || longitude > 180) {
      setError('Please enter a valid longitude between -180 and 180.');
      return false;
    }

    setError('');
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateInputs()) {
      onSubmit({ lat, long });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="latitude">Latitude  :  </label>
        <Input
          type="text"
          id="latitude"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
          placeholder="Enter latitude"
        />
      </div>
      <div>
        <label htmlFor="longitude">Longitude:</label>
        <Input
          type="text"
          id="longitude"
          value={long}
          onChange={(e) => setLong(e.target.value)}
          placeholder="Enter longitude"
        />
      </div>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <SubmitButton type="submit">Get Weather</SubmitButton>
    </Form>
  );
};

export default LatLongInput;
