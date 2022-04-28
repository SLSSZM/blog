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
  localStorage.removeItem('INFO');
  return await http.post<ResponseResult>('/login', login);
}
export async function loginoutApi(): Promise<ResponseResult> {
  return await http.delete<ResponseResult>('/loginout');
}
export async function workbenchApi(): Promise<ResponseResult<Workbench>> {
  return await http.get<ResponseResult<Workbench>>('/workbench');
}
export async function uploadApi(file: File | FormData): Promise<ResponseResult> {
  return await http.post<ResponseResult>('/upload', file);
}
export async function deleteUploadApi(): Promise<ResponseResult> {
  return await http.delete<ResponseResult>('/upload');
}
