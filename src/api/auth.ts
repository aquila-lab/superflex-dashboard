import { GOOGLE_OAUTH_REDIRECT_URI } from '../common/constants';
import { parseError } from './error';
import { PublicApi } from './api';

export type LoginUserArgs = {
  email: string;
  password: string;
};

async function loginUser({ email, password }: LoginUserArgs): Promise<string> {
  try {
    const response = await PublicApi.post('/auth/login', { email, password });
    return Promise.resolve(response.data.token);
  } catch (err: any) {
    return Promise.reject(parseError(err));
  }
}

export type RegisterUserArgs = {
  username: string;
  email: string;
  password: string;
};

async function registerUser({ username, email, password }: RegisterUserArgs): Promise<string> {
  try {
    const { data } = await PublicApi.post('/auth/register', {
      username,
      email,
      password
    });
    return Promise.resolve(data.token);
  } catch (err: any) {
    return Promise.reject(parseError(err));
  }
}

export type AuthenticateOAuthArgs = {
  code: string;
};

async function googleOAuthUser({ code }: AuthenticateOAuthArgs): Promise<string> {
  try {
    const { data } = await PublicApi.get(
      `/auth/google-callback?code=${code}&redirect_uri=${GOOGLE_OAUTH_REDIRECT_URI}`
    );
    return Promise.resolve(data.token);
  } catch (err: any) {
    return Promise.reject(parseError(err));
  }
}

export type SendResetPasswordEmailArgs = {
  email: string;
};

async function sendResetPasswordEmail({ email }: SendResetPasswordEmailArgs): Promise<void> {
  try {
    await PublicApi.post('/auth/reset-password', { email });
    return Promise.resolve();
  } catch (err: any) {
    return Promise.reject(parseError(err));
  }
}

export type ResetPasswordArgs = {
  code: string;
  newPassword: string;
};

async function resetPassword({ code, newPassword }: ResetPasswordArgs): Promise<string> {
  try {
    const { data } = await PublicApi.post('/auth/reset-password-set', {
      code,
      new_password: newPassword
    });
    return Promise.resolve(data.token);
  } catch (err: any) {
    return Promise.reject(parseError(err));
  }
}

export { loginUser, registerUser, googleOAuthUser, sendResetPasswordEmail, resetPassword };
