import { http } from '..';
import { RequestOptions, ResponseListData, ResponseResult } from '../axios.inteface';

export interface Post {
  _id?: string;
  title?: string;
  body?: string;
  tag?: string[];
  status?: boolean;
}

interface Query extends Post, RequestOptions {}

export async function fetchPostApi(query?: Query): Promise<ResponseResult<ResponseListData<Post>>> {
  return await http.get<ResponseResult<ResponseListData<Post>>>('/admin/rest/post', {
    params: query || {},
  });
}
export async function createPostApi(post: Post): Promise<ResponseResult<Post>> {
  return await http.post<ResponseResult<Post>>('/admin/rest/post', post);
}
export async function fetchPostOneApi(id: string): Promise<ResponseResult<Post>> {
  return await http.get<ResponseResult<Post>>('/admin/rest/post/' + id);
}
export async function updatePostApi(id: string, post: Post): Promise<ResponseResult<Post>> {
  return await http.put<ResponseResult<Post>>('/admin/rest/post/' + id, post);
}
export async function deletePostApi(id: string): Promise<ResponseResult<Post>> {
  return await http.delete<ResponseResult<Post>>('/admin/rest/post/' + id);
}
