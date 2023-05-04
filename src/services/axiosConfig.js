import axios from 'axios';

const API_KEY = '34376163-a7d9ba919838b460ea8d86c54';
const BASE_URL = 'https://pixabay.com/api/';

export const axiosConfig = axios.create({
  baseURL: BASE_URL,
  params: {
    key: API_KEY,
    per_page: 12,
    image_type: 'photo',
    orientation: 'horizontal',
  },
});
