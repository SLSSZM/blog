import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

export interface AxiosCreateOption extends AxiosRequestConfig {
  transform?: Transform;
  /**
   * @description 是否开启重复请求(可以放在请求头里进行单独配置)
   */
  ignoreRepeatRequests?: boolean;
  /**
   * @description 是否返回res.data
   */
  backData?: boolean;
}

/**
 * @abstract 拦截器
 */
export abstract class Transform {
  /**
   * @description 请求拦截
   */
  requestInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  /**
   * @description 响应拦截
   */
  responseInterceptors?: (res: AxiosResponse<ResponseResult>) => AxiosResponse<ResponseResult>;
  /**
   * @description: 请求拦截错误处理
   */
  requestInterceptorsCatch?: (error: Error | AxiosError) => void;

  /**
   * @description: 响应拦截错误处理
   */
  responseInterceptorsCatch?: (error: Error | AxiosError) => void;
  /**
   * @description 请求失败处理
   */
  requestCatchHook?: (err: Error | AxiosError) => void;
}
/**
 * @interface 响应数据格式
 */
export interface ResponseResult<T = any> {
  code: number;
  path: string;
  success: boolean;
  data: T;
}
