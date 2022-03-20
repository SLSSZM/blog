import { http } from '..';
import { RequestOptions, ResponseListData, ResponseResult } from '../axios.inteface';

export interface Article {
  _id?: string;
  title?: string;
  description?: string;
  body?: string;
  tag?: string[];
  type?: string;
  submit?: boolean;
}

interface Query extends Article, RequestOptions {}

export async function fetchPostApi(
  query?: Query
): Promise<ResponseResult<ResponseListData<Article>>> {
  return await http.get<ResponseResult<ResponseListData<Article>>>('/admin/rest/article', {
    params: query || {},
  });
}
export async function createPostApi(article: Article): Promise<ResponseResult<Article>> {
  return await http.post<ResponseResult<Article>>('/admin/rest/article', article);
}
export async function fetchPostOneApi(id: string): Promise<ResponseResult<Article>> {
  return await http.get<ResponseResult<Article>>('/admin/rest/article/' + id);
}
export async function updatePostApi(
  id: string,
  article: Article
): Promise<ResponseResult<Article>> {
  return await http.put<ResponseResult<Article>>('/admin/rest/article/' + id, article);
}
export async function deletePostApi(id: string): Promise<ResponseResult<Article>> {
  return await http.delete<ResponseResult<Article>>('/admin/rest/article/' + id);
}
