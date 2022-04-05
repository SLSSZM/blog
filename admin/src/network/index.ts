import { ResponseResult, Transform } from '@/network/axios.inteface';
import { HttpRequest } from '@/network/HttpRequest';
import router from '@/router';
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ElMessage } from 'element-plus';

const transform: Transform = {
  requestInterceptors: (config: AxiosRequestConfig): AxiosRequestConfig => {
    if (config.headers) {
      const token = localStorage.token;
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
    if (err.response?.data?.code === 401) {
      router.replace('/login');
    }
    console.log(err);
  },
};

export const http: HttpRequest = new HttpRequest({
  baseURL: import.meta.env.VITE_API as string,
  timeout: 12000,
  transform,
  ignoreRepeatRequests: true,
  backData: true,
});
