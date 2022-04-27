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
export interface ConfigData {
  configs: {
    myAvatar: string;
    githubPath: string;
    description: string;
    userAvatar: string[];
    image: string;
  };
  tags: Tag[];
}

export interface Message {
  _id?: string;
  content?: string;
  email?: string;
  name?: string;
  createdAt?: string;
}

interface ArticleQuery extends Article {
  page?: number;
  count?: number;
}

export async function fetchConfigApi(params?: any): Promise<ResponseResult<ConfigData>> {
  return await http.get<ResponseResult<ConfigData>>('/config', { params: params || {} });
}

export async function fetchHomeApi(): Promise<ResponseResult<Article[]>> {
  return await http.get<ResponseResult<Article[]>>('/home');
}

export async function fetchArticle(query?: ArticleQuery): Promise<ResponseResult<Article[]>> {
  return await http.get<ResponseResult<Article[]>>('/article', { params: query });
}

export async function fetchArticleOne(id: string, params?: any): Promise<ResponseResult<Article>> {
  return await http.get<ResponseResult<Article>>('/article/' + id, { params: params || {} });
}

export async function fetchSentence(): Promise<any> {
  return await http.get('https://v1.hitokoto.cn/', {
    baseURL: '',
    params: { c: 'i' },
  });
}

export async function fetchMessage(): Promise<ResponseResult<Message[]>> {
  return await http.get<ResponseResult<Message[]>>('/message');
}

export async function createMessage(message: Message): Promise<ResponseResult<Message>> {
  return await http.post<ResponseResult<Message>>('/message', message);
}
