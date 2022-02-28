import { Transform } from '@/network/axios.inteface';
import { HttpRequest } from '@/network/HttpRequest';

const transform: Transform = {};

export const http: HttpRequest = new HttpRequest({
  baseURL: 'https://www.fastmock.site/mock/a43ecae4f903212203d19766a3015fd8/api',
  timeout: 12000,
  transform,
  ignoreRepeatRequests: true,
  backData: true,
});
