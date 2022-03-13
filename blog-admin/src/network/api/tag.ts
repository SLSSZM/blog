import { http } from '..';
import { ResponseResult } from '../axios.inteface';
import { RequestOptions, ResponseListData } from '../axios.inteface';

export interface Tag {
  _id?: string;
  name: string;
}
interface Query extends Tag, RequestOptions {}

export async function fetchTagApi(query?: Query): Promise<ResponseResult<ResponseListData<Tag>>> {
  return await http.get<ResponseResult<ResponseListData<Tag>>>('/admin/rest/tag', {
    params: query || {},
  });
}
export async function updateTagApi(
  id: string,
  tag?: Tag
): Promise<ResponseResult<ResponseListData<Tag>>> {
  return await http.put<ResponseResult<ResponseListData<Tag>>>('/admin/rest/tag/' + id, tag);
}
export async function deleteTagApi(id: string): Promise<ResponseResult<Tag>> {
  return await http.delete<ResponseResult<Tag>>('/admin/rest/tag/' + id);
}
export async function createTagApi(tag?: Tag): Promise<ResponseResult<Tag>> {
  return await http.post<ResponseResult<Tag>>('/admin/rest/tag/', tag);
}
