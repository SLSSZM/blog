export interface HttpRequestOptions {
  baseURL?: string;
  timeout?: number;
  transform?: Transform;
  header?: any;
  backData?: boolean;
  ignoreRepeatRequests: boolean;
}
export interface ResponseResult<T = any> {
  code: number;
  data: T;
  token?: string;
}
export interface Transform {
  requestInterceptor?: (config: UniApp.RequestOptions) => UniApp.RequestOptions;
  responseInterceptor?: (
    res: UniApp.RequestSuccessCallbackResult
  ) => UniApp.RequestSuccessCallbackResult;
  errInterceptor?: (err: any) => any;
}
export type RequestOptions = Partial<UniApp.RequestOptions>;

export class HttpRequest {
  private config: HttpRequestOptions;
  private transform: Transform;
  public canceler: Canceler;
  constructor(options: HttpRequestOptions) {
    this.config = options;
    this.transform = options.transform || {};
    this.canceler = new Canceler();
  }
  requestInterceptor(config: UniApp.RequestOptions): UniApp.RequestOptions {
    this.transform.requestInterceptor && (config = this.transform.requestInterceptor(config));
    return config;
  }
  responseInterceptor(
    res: UniApp.RequestSuccessCallbackResult
  ): UniApp.RequestSuccessCallbackResult {
    this.transform.responseInterceptor && (res = this.transform.responseInterceptor(res));
    return res;
  }
  request<T = any>(
    req: UniApp.RequestOptions
  ): Promise<UniApp.RequestSuccessCallbackResult | ResponseResult<T>> {
    return new Promise((resolve, reject) => {
      req = this.requestInterceptor(req);
      req.method = req.method || 'GET';
      if (!this.config.baseURL) this.config.baseURL = '';
      if (this.config.baseURL[this.config.baseURL.length - 1] === '/' && req.url[0] === '/') {
        req.url = this.config.baseURL + req.url.substring(1);
      } else {
        req.url = (this.config.baseURL || '') + req.url;
      }
      req.timeout = req.timeout || this.config.timeout || 12000;
      req.header = { ...req.header, ...this.config.header };
      const requestTask: UniApp.RequestTask = uni.request({
        ...req,
        success: (res: UniApp.RequestSuccessCallbackResult) => {
          res = this.responseInterceptor(res);
          req.success && req.success(res);
          if (this.config.backData) {
            const data = res.data as ResponseResult<T>;
            resolve(data);
          } else {
            resolve(res);
          }
        },
        fail: (err: any) => {
          this.transform.responseInterceptor && this.responseInterceptor(err as any);
          this.transform.errInterceptor && this.transform.errInterceptor(err);
          req.fail && req.fail(err);
          reject(err);
        },
        complete: (result: UniApp.GeneralCallbackResult) => {
          req.complete && req.complete(result);
          if (result.errMsg !== 'request:fail abort') {
            this.canceler.removePending(req);
          }
        },
      });
      if (
        this.config.ignoreRepeatRequests ||
        (req.header.ignoreRepeatRequests !== undefined && req.header.ignoreRepeatRequests)
      ) {
        this.canceler.addPending(req, requestTask);
      }
    });
  }
  get<T = any>(url: string, req: RequestOptions = {}): Promise<T> {
    return new Promise(async (resolve, reject) => {
      req.method = 'GET';
      req.url = url;
      try {
        const res = await this.request<T>(req as UniApp.RequestOptions);
        resolve(res as unknown as T);
      } catch (err) {
        reject(err);
      }
    });
  }
  post<T = any>(url: string, req: RequestOptions = {}): Promise<T> {
    return new Promise(async (resolve, reject) => {
      req.method = 'POST';
      req.url = url;
      try {
        const res = await this.request<T>(req as UniApp.RequestOptions);
        resolve(res as unknown as T);
      } catch (err) {
        reject(err);
      }
    });
  }
  put<T = any>(url: string, req: RequestOptions = {}): Promise<T> {
    return new Promise(async (resolve, reject) => {
      req.method = 'PUT';
      req.url = url;
      try {
        const res = await this.request<T>(req as UniApp.RequestOptions);
        resolve(res as unknown as T);
      } catch (err) {
        reject(err);
      }
    });
  }
  delete<T = any>(url: string, req: RequestOptions = {}): Promise<T> {
    return new Promise(async (resolve, reject) => {
      req.method = 'DELETE';
      req.url = url;
      try {
        const res = await this.request<T>(req as UniApp.RequestOptions);
        resolve(res as unknown as T);
      } catch (err) {
        reject(err);
      }
    });
  }
}

class Canceler {
  public pendingMap = new Map<string, UniApp.RequestTask>();
  getMapUrl(config: UniApp.RequestOptions): string {
    if (config.data) {
      return [config.method, config.url, ...Object.keys(config.data)].join('-');
    }
    return [config.method, config.url].join('-');
  }
  addPending(config: UniApp.RequestOptions, task: UniApp.RequestTask): void {
    this.removePending(config);
    const url = this.getMapUrl(config);
    this.pendingMap.set(url, task);
  }
  removePending(config: UniApp.RequestOptions): void {
    const url = this.getMapUrl(config);
    const task = this.pendingMap.get(url);
    task && task.abort && task.abort();
    this.pendingMap.delete(url);
  }
  removeAllPending(): void {
    this.pendingMap.forEach((task: UniApp.RequestTask) => {
      task && task.abort && task.abort();
    });
    this.pendingMap.clear();
  }
}
