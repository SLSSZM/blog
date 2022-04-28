import { http } from '..';
import { ResponseResult } from '../axios.inteface';

export interface Config {
  _id?: string;
  image?: string;
  myAvatar?: string;
  userAvatar?: string[];
  description?: string;
  githubPath?: string;
  userId?: string;
}

export async function fetchConfigApi(): Promise<ResponseResult<Config>> {
  return await http.get<ResponseResult<Config>>('/config');
}

export async function updateConfigApi(config: Config): Promise<ResponseResult<Config>> {
  return await http.put<ResponseResult<Config>>('/config', config);
}
