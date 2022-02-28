import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { AxiosCreateOption, Transform, ResponseResult } from '@/network/axios.inteface';
import { AxiosCanceler } from '@/network/AxiosCanceler';

/**
 * @description 封装axios 调用getInstance获取实例
 */
export class HttpRequest {
  private axiosInstance: AxiosInstance;
  private options: AxiosCreateOption;
  private axiosCanceler: AxiosCanceler = new AxiosCanceler();

  constructor(options: AxiosCreateOption) {
    this.axiosInstance = axios.create(options);
    this.options = options;
    this.setInterceports();
  }

  /**
   * @description 设置拦截器和取消请求
   */
  private setInterceports(): void {
    const instance: AxiosInstance = this.axiosInstance;
    const transform: Transform | undefined = this.options.transform;

    // 判断有没有设置拦截器函数
    if (!transform) {
      return;
    }
    const {
      requestInterceptors,
      responseInterceptors,
      requestInterceptorsCatch,
      responseInterceptorsCatch,
    } = transform;

    instance.interceptors.request.use((config: AxiosRequestConfig) => {
      // 判断是否开启重复请求
      // 可在请求头里给单个请求单独配置
      const { headers } = config;
      let ignoreRepeatRequests;
      if (headers) {
        ignoreRepeatRequests = headers.ignoreRepeatRequests;
      }
      // 判断请求头里是否有配置和创建时是否带有参数
      ignoreRepeatRequests =
        ignoreRepeatRequests !== undefined
          ? ignoreRepeatRequests
          : this.options.ignoreRepeatRequests;
      ignoreRepeatRequests && this.axiosCanceler.addPending(config);

      if (requestInterceptors) {
        config = requestInterceptors(config);
      }
      return config;
    }, undefined);

    requestInterceptorsCatch &&
      instance.interceptors.request.use(undefined, requestInterceptorsCatch);

    instance.interceptors.response.use((res: AxiosResponse<ResponseResult>) => {
      res && this.axiosCanceler.removePending(res.config);
      if (responseInterceptors) {
        res = responseInterceptors(res);
      }
      return res;
    }, undefined);

    responseInterceptorsCatch &&
      instance.interceptors.response.use(undefined, responseInterceptorsCatch);
  }

  /**
   * @description 移除所有请求
   */
  public allRequestCanceler(): void {
    this.axiosCanceler.removeAllPending();
  }

  /**
   * @param config axios请求数据
   */
  public request<T = any>(config: AxiosRequestConfig): Promise<T> {
    return new Promise((resolve, reject): void => {
      this.axiosInstance(config)
        .then((res: AxiosResponse<ResponseResult>): void => {
          if (this.options.backData) {
            resolve(res.data as unknown as T);
          } else {
            resolve(res as unknown as T);
          }
        })
        .catch((err: Error | AxiosError): void => {
          const transform = this.options.transform;
          if (transform) {
            transform.requestCatchHook && transform.requestCatchHook(err);
          }
          reject(err);
        });
    });
  }
  public get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return new Promise((resolve, reject): void => {
      this.axiosInstance
        .get(url, config)
        .then((res: AxiosResponse<ResponseResult>) => {
          if (this.options.backData) {
            resolve(res.data as unknown as T);
          } else {
            resolve(res as unknown as T);
          }
        })
        .catch((err: Error | AxiosError): void => {
          const transform = this.options.transform;
          if (transform) {
            transform.requestCatchHook && transform.requestCatchHook(err);
          }
          reject(err);
        });
    });
  }
  public post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return new Promise((resolve, reject): void => {
      this.axiosInstance
        .post(url, data, config)
        .then((res: AxiosResponse<ResponseResult>): void => {
          if (this.options.backData) {
            resolve(res.data as unknown as T);
          } else {
            resolve(res as unknown as T);
          }
        })
        .catch((err: Error | AxiosError): void => {
          const transform = this.options.transform;
          if (transform) {
            transform.requestCatchHook && transform.requestCatchHook(err);
          }
          reject(err);
        });
    });
  }
  public put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return new Promise((resolve, reject): void => {
      this.axiosInstance
        .put(url, data, config)
        .then((res: AxiosResponse<ResponseResult>): void => {
          if (this.options.backData) {
            resolve(res.data as unknown as T);
          } else {
            resolve(res as unknown as T);
          }
        })
        .catch((err: Error | AxiosError): void => {
          const transform = this.options.transform;
          if (transform) {
            transform.requestCatchHook && transform.requestCatchHook(err);
          }
          reject(err);
        });
    });
  }
  public delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return new Promise((resolve, reject): void => {
      this.axiosInstance
        .delete(url, config)
        .then((res: AxiosResponse<ResponseResult>): void => {
          if (this.options.backData) {
            resolve(res.data as unknown as T);
          } else {
            resolve(res as unknown as T);
          }
        })
        .catch((err: Error | AxiosError): void => {
          const transform = this.options.transform;
          if (transform) {
            transform.requestCatchHook && transform.requestCatchHook(err);
          }
          reject(err);
        });
    });
  }
}
