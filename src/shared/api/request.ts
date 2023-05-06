import axios from 'axios';
import {createEffect} from 'effector';

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
  baseURL: '/api',
  timeout: 1000,
  validateStatus: (status) => status >= 200 && status < 300,
});

interface Request {
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: unknown;
}

export const requestFx = createEffect<Request, any>((request) => {
  return mockapi({
    method: request.method,
    url: request.path,
    data: request.body,
  })
    .then((response) => response.data)
    .catch((response) => Promise.reject(response.response.data));
});
