import { IS_PROD } from '@/common/constants';

export type ApiError = {
  statusCode: number;
  slug: string;
  message: string;
} | null;

const internalServerError: ApiError = {
  statusCode: 500,
  slug: 'internal_server',
  message: 'Internal server error'
};

export function parseError(err: any): ApiError {
  if (!IS_PROD) {
    console.error(err);
  }

  if (!err?.response?.data?.error) {
    return internalServerError;
  }
  return {
    statusCode: err.response.status,
    slug: err.response.data.error.slug,
    message: err.response.data.error.message
  };
}

export function getCustomUserError(
  err: ApiError,
  defaultMsg: string = 'Internal server error'
): string {
  if (err?.message) {
    return err.message;
  }
  return defaultMsg;
}
