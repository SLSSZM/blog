import { http } from '..';
import { ResponseResult } from '../axios.inteface';
import { RequestOptions, ResponseListData } from '../axios.inteface';

export interface Account {
  _id?: string;
  username?: string;
  password?: string;
}
interface Query extends Account, RequestOptions {}

export async function fetchAccountApi(
  query?: Query
): Promise<ResponseResult<ResponseListData<Account>>> {
  return await http.get<ResponseResult<ResponseListData<Account>>>('/account', {
    params: query || {},
  });
}

export async function createAccountApi(
  account: Account
): Promise<ResponseResult<ResponseListData<Account>>> {
  return await http.post<ResponseResult<ResponseListData<Account>>>('/account', account);
}

export async function updateAccountApi(
  id: string,
  account: Account
): Promise<ResponseResult<ResponseListData<Account>>> {
  return await http.put<ResponseResult<ResponseListData<Account>>>('/account/' + id, account);
}

export async function deleteAccountApi(id: string): Promise<ResponseResult<Account>> {
  return await http.delete<ResponseResult<Account>>('/account/' + id);
}
