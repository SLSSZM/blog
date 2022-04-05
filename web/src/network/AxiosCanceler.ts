import axios, { AxiosRequestConfig, Canceler } from 'axios';

export class AxiosCanceler {
  private pendingMap: Map<string, Canceler> = new Map<string, Canceler>();
  /**
   * 获取存放map的key值
   * @param config axios请求
   */
  private getPendingUrl(config: AxiosRequestConfig): string {
    if (config.params) {
      return [config.method, config.url, ...Object.keys(config.params)].join('&');
    } else if (config.data) {
      return [config.method, config.url, ...Object.keys(config.data)].join('&');
    }
    return [config.method, config.url].join('&');
  }
  /**
   * 增加请求
   * @param config axios请求
   */
  addPending(config: AxiosRequestConfig): void {
    // 取消重复请求
    this.removePending(config);
    config.cancelToken = new axios.CancelToken((cancel: Canceler) => {
      const url: string = this.getPendingUrl(config);
      if (!this.pendingMap.has(url)) {
        this.pendingMap.set(url, cancel);
      }
    });
  }
  /**
   * 移除请求
   * @param config axios请求
   */
  removePending(config: AxiosRequestConfig): void {
    const url: string = this.getPendingUrl(config);
    const cancel: Canceler | undefined = this.pendingMap.get(url);
    cancel && cancel(url + '!cancel');
    this.pendingMap.delete(url);
  }
  /**
   *  移除所有请求
   */
  removeAllPending(): void {
    this.pendingMap.forEach((cancel: Canceler) => {
      cancel && cancel('cancel');
    });
    this.pendingMap.clear();
  }
}
