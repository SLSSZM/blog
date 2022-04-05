import { Transform } from '@/network/axios.inteface';
import { HttpRequest } from '@/network/HttpRequest';
import { AxiosRequestConfig } from 'axios';

const transform: Transform = {
  requestInterceptors: (config: AxiosRequestConfig): AxiosRequestConfig => {
    if (config.headers) {
      config.headers.user = import.meta.env.VITE_USER_ID!;
    }
    return config;
  },
};

export const http: HttpRequest = new HttpRequest({
  baseURL: import.meta.env.VITE_API as string,
  timeout: 12000,
  transform,
  ignoreRepeatRequests: true,
  backData: true,
});
