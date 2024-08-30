import axios from 'axios';

const GEOCODE_API_URL = 'https://api.opencagedata.com/geocode/v1/json';
const API_KEY = '487569f5c37146edae81fce02fc07c69'; 

export const getLocationName = async (latitude, longitude) => {
  try {
    const response = await axios.get(GEOCODE_API_URL, {
      params: {
        q: `${latitude},${longitude}`,
        key: API_KEY,
        language: 'en',
        pretty: 1
      }
    });

    const results = response.data.results;
    if (results.length > 0) {
      return results[0].formatted;
    } else {
      return 'Unknown Location';
    }
  } catch (error) {
    console.error('Error fetching location name:', error);
    return 'Error fetching location';
  }
};
