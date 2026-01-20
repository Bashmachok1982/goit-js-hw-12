import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '54231324-92d51f5acf633d69a742454d8';

export function getImagesByQuery(query) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 12,
    page: 1,
  };

  return axios
    .get(BASE_URL, { params })
    .then(response => response.data)
    .catch(error => {
      if (error.response) {
        throw new Error(
          `Pixabay error: ${error.response.status} - ${error.response.data}`
        );
      } else if (error.request) {
        throw new Error('No response from Pixabay. Check internet connection.');
      } else {
        throw new Error(`Request setup error: ${error.message}`);
      }
    });
}
