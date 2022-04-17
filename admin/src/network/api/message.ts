import { http } from '..';
import { ResponseResult } from '../axios.inteface';
import { RequestOptions, ResponseListData } from '../axios.inteface';

export interface Message {
  _id?: string;
  name?: string;
  email?: string;
  content?: string;
  description?: string;
}
interface Query extends Message, RequestOptions {}

export async function fetchMessageApi(
  query?: Query
): Promise<ResponseResult<ResponseListData<Message>>> {
  return await http.get<ResponseResult<ResponseListData<Message>>>('/admin/rest/message', {
    params: query || {},
  });
}
export async function deleteMessageApi(id: string): Promise<ResponseResult<Message>> {
  return await http.delete<ResponseResult<Message>>('/admin/rest/message/' + id);
}
