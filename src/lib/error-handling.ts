import { toast } from 'sonner'
import { IS_PROD } from './constants'

export type ApiError = {
  statusCode: number
  slug: string
  message: string
} | null

const internalServerError: ApiError = {
  statusCode: 500,
  slug: 'internal_server',
  message: 'Internal server error'
}

export function parseError(err: any): ApiError {
  if (!IS_PROD) {
    console.error('Error details:', err)
  }

  if (err?.response?.data?.error) {
    return {
      statusCode: err.response.status,
      slug: err.response.data.error.slug,
      message: err.response.data.error.message
    }
  }

  if (err?.error) {
    return {
      statusCode: err.statusCode || 500,
      slug: err.error.slug || 'unknown_error',
      message: err.error.message || 'An unknown error occurred'
    }
  }

  return internalServerError
}

export function getErrorMessage(
  err: ApiError,
  defaultMsg = 'Something went wrong. Please try again.'
): string {
  return err?.message || defaultMsg
}

export const withErrorHandling = <T extends (...args: any[]) => Promise<any>>(
  fn: T,
  options?: {
    onSuccess?: (data: Awaited<ReturnType<T>>) => void
    onError?: (error: ApiError) => void
    successMessage?: string
    errorMessage?: string
  }
): ((...args: Parameters<T>) => Promise<ReturnType<T>>) => {
  return async (...args: Parameters<T>): Promise<ReturnType<T>> => {
    try {
      const result = await fn(...args)

      if (result !== undefined && result !== null) {
        if (options?.successMessage) {
          toast.success(options.successMessage)
        }

        options?.onSuccess?.(result)
      }

      return result
    } catch (error: any) {
      if (IS_PROD) {
        console.error('Error occurred:', error)
      } else {
        console.error('Error details:', error?.response?.data || error)
      }

      if (error?.response?.data?.error?.message) {
        toast.error(error.response.data.error.message)
      } else {
        const parsedError = parseError(error)
        const fallbackMsg =
          options?.errorMessage || 'Something went wrong. Please try again.'
        const errorMessage = getErrorMessage(parsedError, fallbackMsg)
        toast.error(errorMessage)
      }

      options?.onError?.(parseError(error))

      throw error
    }
  }
}

export const useErrorHandler = () => {
  const handleError = (error: any, defaultMsg?: string) => {
    const parsedError = parseError(error)
    const errorMessage = getErrorMessage(parsedError, defaultMsg)
    toast.error(errorMessage)
    return parsedError
  }

  return { handleError }
}
