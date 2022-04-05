import { http } from '..';
import { ResponseResult } from '../axios.inteface';

export interface Tag {
  _id: string;
  name: string;
}
export interface Article {
  _id?: string;
  image?: string;
  title?: string;
  createdAt?: string;
  description?: string;
  views?: number;
  tag?: Tag[];
  body?: string;
}

export async function fetchConfigApi(): Promise<ResponseResult> {
  return await http.get<ResponseResult>('/config');
}

export async function fetchArticle(query?: Article): Promise<ResponseResult<Article[]>> {
  return await http.get<ResponseResult<Article[]>>('/article', { params: query });
}

export async function fetchArticleOne(id: string): Promise<ResponseResult<Article>> {
  return await http.get<ResponseResult<Article>>('/article/' + id);
}

export async function fetchSentence(): Promise<any> {
  return await http.get('https://v1.hitokoto.cn/', {
    baseURL: '',
    params: { c: 'i' },
  });
}
