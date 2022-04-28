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

interface MessageQuery extends Message {
  page?: number;
  count?: number;
}

interface ResultList<T = any> {
  list: T[];
  total: number;
}

export async function fetchConfigApi(params?: any): Promise<ResponseResult<ConfigData>> {
  try {
    return await http.get<ResponseResult<ConfigData>>('/config', { params: params || {} });
  } catch (err) {
    console.log(err);
    return err as ResponseResult<ConfigData>;
  }
}

export async function fetchHomeApi(): Promise<ResponseResult<Article[]>> {
  try {
    return await http.get<ResponseResult<Article[]>>('/home');
  } catch (err) {
    return err as ResponseResult<Article[]>;
  }
}

export async function fetchArticle(
  query?: ArticleQuery
): Promise<ResponseResult<ResultList<Article>>> {
  try {
    return await http.get<ResponseResult<ResultList<Article>>>('/article', {
      params: query,
    });
  } catch (err) {
    return err as ResponseResult<ResultList<Article>>;
  }
}

export async function fetchArticleOne(id: string, params?: any): Promise<ResponseResult<Article>> {
  try {
    return await http.get<ResponseResult<Article>>('/article/' + id, { params: params || {} });
  } catch (err) {
    return err as ResponseResult<Article>;
  }
}

export async function fetchSentence(): Promise<any> {
  try {
    return await http.get('https://v1.hitokoto.cn/', {
      baseURL: '',
      params: { c: 'i' },
    });
  } catch (err) {
    return err as ResponseResult<Article>;
  }
}

export async function fetchMessage(
  query: MessageQuery
): Promise<ResponseResult<ResultList<Message>>> {
  try {
    return await http.get<ResponseResult<ResultList<Message>>>('/message', { params: query });
  } catch (err) {
    return err as ResponseResult<ResultList<Message>>;
  }
}

export async function createMessage(message: Message): Promise<ResponseResult<Message>> {
  try {
    return await http.post<ResponseResult<Message>>('/message', message);
  } catch (err) {
    return err as ResponseResult<Message>;
  }
}
