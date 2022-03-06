import { ResponseResult, Transform } from '@/network/axios.inteface';
import { HttpRequest } from '@/network/HttpRequest';
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ElMessage } from 'element-plus';

const transform: Transform = {
  requestInterceptors: (config: AxiosRequestConfig): AxiosRequestConfig => {
    if (config.headers) {
      const token = localStorage.getItem('token');
      config.headers.authorization = 'Bearer ' + token;
    }
    return config;
  },
  responseInterceptors: (
    res: AxiosResponse<ResponseResult<any>, any>
  ): AxiosResponse<ResponseResult<any>, any> => {
    if (res.data.token) {
      localStorage.setItem('token', res.data.token);
    }
    return res;
  },
  requestCatchHook: (err: AxiosError): void => {
    if (err.response?.data) {
      ElMessage.error(err.response.data.message);
    }
  },
};

export const http: HttpRequest = new HttpRequest({
  baseURL: 'http://192.168.8.101:3001/api',
  timeout: 12000,
  transform,
  ignoreRepeatRequests: true,
  backData: true,
});
