import { HttpRequest, Transform } from './httpEequest';

const transform: Transform = {
  requestInterceptor(config: UniApp.RequestOptions): UniApp.RequestOptions {
    const token = uni.getStorageSync('token');
    if (token) {
      if (!config.header) config.header = {};
      config.header.authorization = 'Bearer ' + token;
    }
    return config;
  },
  responseInterceptor(
    response: UniApp.RequestSuccessCallbackResult
  ): UniApp.RequestSuccessCallbackResult {
    const { statusCode } = response;
    if (statusCode === 401) {
      uni.showToast({
        title: '登录失效，请重新登录',
        icon: 'none',
      });
      uni.removeStorageSync('token');
      uni.redirectTo({
        url: '/pages/login/Login',
      });
    }
    const data: any = response.data;
    if (data && data.token) {
      uni.setStorageSync('token', data.token);
    }
    return response;
  },
};

export const httpRequest = new HttpRequest({
  baseURL: 'http://192.168.0.183:3005/api/miniapp/',
  timeout: 12000,
  transform,
  backData: true,
  ignoreRepeatRequests: true,
});
