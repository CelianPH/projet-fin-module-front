import type { ApiError } from '~/types/api'

export function toApiError(err: unknown): ApiError {
  const e = err as { data?: ApiError; message?: string }
  if (e?.data && typeof e.data.statusCode === 'number') {
    return e.data
  }
  return {
    statusCode: 0,
    message: e?.message ?? 'Erreur inconnue',
  }
}
