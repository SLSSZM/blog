import { AxiosResponse } from 'axios';
import { http } from '..';
import { ResponseResult } from '../axios.inteface';

export interface Post {
  _id: string;
  title: string;
  content: string;
}

export async function fetchPostApi<T>(): Promise<ResponseResult<T>> {
  return await http.get<ResponseResult<T>>('/post');
}
