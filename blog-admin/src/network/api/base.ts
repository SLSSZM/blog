import { http } from '..';
import { ResponseResult } from '../axios.inteface';

export interface Login {
  username: string;
  password: string;
}

export async function loginApi(login: Login): Promise<ResponseResult> {
  return await http.post<ResponseResult>('/admin/login', login);
}
export async function loginoutApi(login: Login): Promise<ResponseResult> {
  return await http.post<ResponseResult>('/admin/loginout', login);
}
