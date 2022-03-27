import { http } from '..';
import { ResponseResult } from '../axios.inteface';

export interface Login {
  username: string;
  password: string;
}

export interface Workbench {
  userViews?: number;
  articleTotal?: number;
  hotArticles?: any[];
}

export async function loginApi(login: Login): Promise<ResponseResult> {
  return await http.post<ResponseResult>('/admin/login', login);
}
export async function loginoutApi(): Promise<ResponseResult> {
  return await http.delete<ResponseResult>('/admin/loginout');
}
export async function workbenchApi(): Promise<ResponseResult<Workbench>> {
  return await http.get<ResponseResult<Workbench>>('/admin/workbench');
}
export async function uploadApi(file: File): Promise<ResponseResult> {
  return await http.post<ResponseResult>('/admin/upload', file);
}
