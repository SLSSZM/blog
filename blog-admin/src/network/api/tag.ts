import { http } from '..';
import { ResponseResult } from '../axios.inteface';
import { RequestOptions, ResponseListData } from '../axios.inteface';

export interface Tag {
  _id?: string;
  name: string;
}
interface Query extends Tag, RequestOptions {}

export async function fetchTagApi(tag?: Query): Promise<ResponseResult<ResponseListData<Tag>>> {
  return await http.get<ResponseResult<ResponseListData<Tag>>>('/admin/rest/tag', { params: tag });
}
export async function updateTagApi<T>(id: string, tag?: Query): Promise<ResponseResult<T>> {
  return await http.put<ResponseResult<T>>('/admin/rest/tag/' + id, tag);
}
export async function deleteTagApi<T>(id: string, tag?: Query): Promise<ResponseResult<T>> {
  return await http.delete<ResponseResult<T>>('/admin/rest/tag/' + id, { params: tag });
}
