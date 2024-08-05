import axios from 'axios';
import Cookies from 'js-cookie';

import { IS_PROD, API_BASE_URL, COOKIE_DOMAIN } from '../common/constants';

const Api = axios.create({ baseURL: `${API_BASE_URL}/api/v1` });
const PublicApi = axios.create({ baseURL: `${API_BASE_URL}/api/v1` });

class ApiProviderClass {
  responseInterceptor: any = null;

  addResponseInterceptor(interceptor: any, errorHandler: (err: any) => Promise<void>): void {
    if (this.responseInterceptor !== null) {
      this.removeResponseInterceptor();
    }

    this.responseInterceptor = Api.interceptors.response.use(interceptor, errorHandler);
  }

  removeResponseInterceptor(): void {
    Api.interceptors.response.eject(this.responseInterceptor);
    this.responseInterceptor = null;
  }

  setHeader(key: string, value?: string | null): void {
    Api.defaults.headers.common[key] = value;
  }

  addHeaderTokenInterceptor(errorHandler: (err: any) => Promise<void>): void {
    this.addResponseInterceptor((response: any) => {
      const newAuthHeader = response.headers['x-new-token'];

      if (newAuthHeader) {
        Cookies.set('token', newAuthHeader, {
          path: '/',
          expires: 30,
          ...(IS_PROD && { domain: COOKIE_DOMAIN })
        });

        this.setHeader('Authorization', `Bearer ${newAuthHeader}`);
      }

      return response;
    }, errorHandler);
  }
}

const ApiProvider = new ApiProviderClass();

export { Api, PublicApi, ApiProvider };
