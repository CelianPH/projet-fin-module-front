import { defineStore } from 'pinia'
import type {
  ApiError,
  CancelResponse,
  CreateReservation,
  ReservationResponse,
} from '~/types/api'

export const useReservationsStore = defineStore('reservations', () => {
  const current = ref<ReservationResponse | null>(null)
  const loading = ref(false)
  const error = ref<ApiError | null>(null)
  const cancelMessage = ref<string | null>(null)

  function reset() {
    current.value = null
    error.value = null
    cancelMessage.value = null
  }

  async function create(payload: CreateReservation) {
    const config = useRuntimeConfig()
    loading.value = true
    error.value = null
    cancelMessage.value = null
    try {
      current.value = await $fetch<ReservationResponse>('/reservations', {
        baseURL: config.public.apiBase as string,
        method: 'POST',
        body: payload,
      })
    } catch (err) {
      error.value = toApiError(err)
    } finally {
      loading.value = false
    }
  }

  async function fetchByToken(token: string) {
    const config = useRuntimeConfig()
    loading.value = true
    error.value = null
    cancelMessage.value = null
    current.value = null
    try {
      current.value = await $fetch<ReservationResponse>(
        `/reservations/by-token/${token}`,
        { baseURL: config.public.apiBase as string }
      )
    } catch (err) {
      error.value = toApiError(err)
    } finally {
      loading.value = false
    }
  }

  async function cancel(id: string, token: string) {
    const config = useRuntimeConfig()
    loading.value = true
    error.value = null
    try {
      const res = await $fetch<CancelResponse>(
        `/reservations/${id}/cancel`,
        {
          baseURL: config.public.apiBase as string,
          method: 'PATCH',
          body: { token },
        }
      )
      current.value = res.reservation
      cancelMessage.value = res.message
    } catch (err) {
      error.value = toApiError(err)
    } finally {
      loading.value = false
    }
  }

  return {
    current,
    loading,
    error,
    cancelMessage,
    reset,
    create,
    fetchByToken,
    cancel,
  }
})
