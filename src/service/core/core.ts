import axios from 'axios';

const httpFactory = () => {
  const httpInstance = axios.create();
  httpInstance.interceptors.response.use((value) => {
    return value;
  }, (error) => {
    return Promise.resolve(error);
  });
  return httpInstance;
};

export const http = httpFactory();
