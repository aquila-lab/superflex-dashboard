import User, { UserData } from '@/core/user/User.model';
import { parseError } from './error';
import { Api } from './api';

async function getUser(): Promise<UserData> {
  try {
    const { data } = await Api.get('/user');
    const userData = User.buildUserDataFromResponse(data);
    return Promise.resolve(userData);
  } catch (err) {
    return Promise.reject(parseError(err));
  }
}

export { getUser };
