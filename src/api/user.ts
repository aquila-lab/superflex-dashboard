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

export type UpdateUserArgs = {
  firstName?: string;
  lastName?: string;
  company?: string;
  title?: string;
};

async function updateUser(args: UpdateUserArgs): Promise<UserData> {
  try {
    const { data } = await Api.patch('/user', {
      first_name: args.firstName || null,
      last_name: args.lastName || null,
      company: args.company || null,
      title: args.title || null
    });
    const userData = User.buildUserDataFromResponse(data);
    return Promise.resolve(userData);
  } catch (err) {
    return Promise.reject(parseError(err));
  }
}

export { getUser, updateUser };
