import Cookies from 'js-cookie';

import { ApiProvider } from '../../api';
import { IS_PROD, COOKIE_DOMAIN, ApiErrorTypes } from '../../common/constants';

function logoutHelper(): void {
  Cookies.remove('token', { domain: COOKIE_DOMAIN });

  ApiProvider.setHeader('Authorization', null);
  ApiProvider.removeResponseInterceptor();

  localStorage.clear();
}

async function setAuthHeader(token: string, logoutAction: any): Promise<void> {
  try {
    Cookies.set('token', token, {
      path: '/',
      expires: 30,
      ...(IS_PROD && { domain: COOKIE_DOMAIN })
    });

    ApiProvider.setHeader('Authorization', `Bearer ${token}`);
    ApiProvider.addHeaderTokenInterceptor(async (err) => {
      if (err?.response?.status === 401) {
        handleUnauthorizedResponse(err.response, logoutAction);
      }
      return Promise.reject(err);
    });

    return Promise.resolve();
  } catch (err) {
    return Promise.reject(err);
  }
}

function handleUnauthorizedResponse(response: any, logoutAction: any): void {
  const { slug, message } = response.data.error;

  const shouldLogoutError = [
    ApiErrorTypes.SESSION_EXPIRED,
    ApiErrorTypes.SESSION_LIMIT_EXCEEDED
  ].includes(slug);

  let logoutMessage = null;
  if (shouldLogoutError) {
    logoutMessage = message;
  }

  logoutAction(logoutMessage);
}

export { logoutHelper, setAuthHeader };
