import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://api.edamam.com/api/recipes/v2',
  timeout: 1000,
  params: {
    type: 'public',
    app_id: '2a3177b2',
    app_key: '5c61b3aea75a67ec7ced14be8a5c81e1',
  },
});

export const mockapi = axios.create({
  baseURL: 'http://localhost:31299/api',
  timeout: 1000,
});
