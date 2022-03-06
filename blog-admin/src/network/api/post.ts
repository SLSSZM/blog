import { http } from '..';
import { ResponseResult } from '../axios.inteface';

export interface Post {
  _id?: string;
  title: string;
  content: string;
  tag: string[];
  status?: '';
}

export async function fetchPostApi<T>(): Promise<ResponseResult<T>> {
  return await http.get<ResponseResult<T>>('/admin/rest/post');
}

export async function createPostApi<T>(post: Post): Promise<ResponseResult<T>> {
  return await http.post<ResponseResult<T>>('/admin/rest/post', post);
}
