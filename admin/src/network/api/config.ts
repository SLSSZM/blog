import { http } from '..';
import { ResponseResult } from '../axios.inteface';

export interface Config {
  image?: string;
  userAvatar?: string;
}

export async function fetchConfigApi(): Promise<ResponseResult<Config>> {
  return await http.get<ResponseResult<Config>>('/admin/config');
}

export async function updateConfigApi(config: Config): Promise<ResponseResult<Config>> {
  return await http.put<ResponseResult<Config>>('/admin/config', config);
}
