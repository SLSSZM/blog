import { httpRequest } from '../index';
import { RequestOptions, ResponseResult } from '../httpEequest';

export async function loginApi(data: RequestOptions): Promise<ResponseResult> {
  return await httpRequest.post<ResponseResult>('/login', data);
}
export async function loginoutApi(): Promise<ResponseResult> {
  return await httpRequest.delete<ResponseResult>('/loginout');
}

interface _Message {
  name: string;
  email: string;
  content: string;
  createdAt: string;
  _id: string;
}
export type Message = Partial<_Message>;

export async function fetchMessageApi(data: RequestOptions): Promise<ResponseResult> {
  return await httpRequest.get<ResponseResult>('/message', data);
}

export async function deleteMessageApi(id: string): Promise<ResponseResult> {
  return await httpRequest.delete<ResponseResult>('/message/' + id);
}
