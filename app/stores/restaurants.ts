import { defineStore } from 'pinia'
import type { ApiError, Restaurant, SlotResponse } from '~/types/api'

export const useRestaurantsStore = defineStore('restaurants', () => {
  const list = ref<Restaurant[]>([])
  const current = ref<Restaurant | null>(null)
  const slots = ref<SlotResponse[]>([])
  const loading = ref(false)
  const slotsLoading = ref(false)
  const error = ref<ApiError | null>(null)

  async function fetchAll() {
    const config = useRuntimeConfig()
    loading.value = true
    error.value = null
    try {
      list.value = await $fetch<Restaurant[]>('/restaurants', {
        baseURL: config.public.apiBase as string,
      })
    } catch (err) {
      error.value = toApiError(err)
    } finally {
      loading.value = false
    }
  }

  async function fetchOne(id: string) {
    const config = useRuntimeConfig()
    loading.value = true
    error.value = null
    current.value = null
    try {
      current.value = await $fetch<Restaurant>(`/restaurants/${id}`, {
        baseURL: config.public.apiBase as string,
      })
    } catch (err) {
      error.value = toApiError(err)
    } finally {
      loading.value = false
    }
  }

  async function fetchSlots(restaurantId: string, date: string) {
    const config = useRuntimeConfig()
    slotsLoading.value = true
    try {
      slots.value = await $fetch<SlotResponse[]>(
        `/restaurants/${restaurantId}/slots`,
        {
          baseURL: config.public.apiBase as string,
          query: { date },
        }
      )
    } catch (err) {
      error.value = toApiError(err)
      slots.value = []
    } finally {
      slotsLoading.value = false
    }
  }

  return {
    list,
    current,
    slots,
    loading,
    slotsLoading,
    error,
    fetchAll,
    fetchOne,
    fetchSlots,
  }
})
