import axios, { AxiosRequestConfig } from 'axios';

export const USER_ACCESS_DENIED = 'User - AccessDenied';
export const USER_NOT_LOGIN = 'User - NotLogin';

const API = axios.create({ 'baseURL': process.env.NEXT_PUBLIC_API_URL });

API.interceptors.request.use(function (config: AxiosRequestConfig) {
  if (!config) {
    config = {};
  }
  if (!config.headers) {
    config.headers = {};
  }
  if (!config.headers['Content-Type']) {
    config.headers['Content-Type'] = 'application/json';
  }
  if (localStorage.getItem('token')) {
    config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
  }
  return config;
});

API.interceptors.response.use(
  async config => {
    if (!config.data.result) {
      throw config.data;
    } else {
      if (config.headers['x-auth-token']) {
        localStorage.setItem('token', config.headers['x-auth-token']);
      }
    }
    return config.data;
  },
  error => {
    if (error.response.data.errorCode === USER_NOT_LOGIN) {
      localStorage.removeItem('token');
    }
    return Promise.reject(error.response.data);
  }
);

export default API;