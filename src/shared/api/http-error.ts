interface ErrorWithMessage {
  message?: string
}

interface ErrorWithResponseData {
  response?: {
    data?: ErrorWithMessage
  }
}

const hasResponseData = (error: unknown): error is ErrorWithResponseData => typeof error === 'object' && error !== null && 'response' in error

export const getErrorMessage = (error: unknown, fallback = 'Что-то пошло не так') => {
  if (hasResponseData(error)) {
    const responseMessage = error.response?.data?.message

    if (typeof responseMessage === 'string' && responseMessage.length > 0) {
      return responseMessage
    }
  }

  if (error instanceof Error) {
    return error.message
  }

  return fallback
}
