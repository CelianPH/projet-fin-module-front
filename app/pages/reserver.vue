<template>
  <div class="space-y-6 max-w-4xl">
    <h1 class="text-2xl font-semibold text-black">Réserver une table</h1>

    <div
      v-if="contextError"
      class="border border-gray-400 bg-gray-100 text-sm text-black px-3 py-2 rounded"
    >
      {{ contextError }}
      <NuxtLink to="/" class="underline ml-2">Retour à l'accueil</NuxtLink>
    </div>

    <Loader v-else-if="isLoadingContext" label="Chargement du créneau…" />

    <template v-else-if="reservationsStore.current">
      <DisplayToken
        :token="reservationsStore.current.token"
        :reservation-url="reservationUrl"
      />
    </template>

    <div
      v-else
      class="grid grid-cols-1 md:grid-cols-3 gap-6"
    >
      <div class="md:col-span-2">
        <ReservationForm
          :restaurant-id="restaurantId"
          :time-slot-id="slotId"
          :max-covers="maxCovers"
          :loading="reservationsStore.loading"
          :error="reservationsStore.error"
          @submit="onSubmit"
        />
      </div>
      <div class="md:col-span-1">
        <ReservationSummary
          :restaurant="summaryRestaurant"
          :slot="slot"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRestaurantsStore } from '~/stores/restaurants'
import { useReservationsStore } from '~/stores/reservations'
import type { CreateReservation } from '~/types/api'

const route = useRoute()
const restaurantsStore = useRestaurantsStore()
const reservationsStore = useReservationsStore()

const restaurantId = computed(() => (route.query.restaurantId as string) || '')
const slotId = computed(() => (route.query.slotId as string) || '')
const date = computed(() => (route.query.date as string) || '')

const isLoadingContext = ref(true)
const contextError = ref('')

const restaurant = computed(() =>
  restaurantsStore.current?.id === restaurantId.value
    ? restaurantsStore.current
    : null
)

const summaryRestaurant = computed(() =>
  restaurant.value
    ? { id: restaurant.value.id, name: restaurant.value.name }
    : null
)

const slot = computed(
  () => restaurantsStore.slots.find((s) => s.id === slotId.value) ?? null
)

const maxCovers = computed(() =>
  slot.value ? slot.value.totalCapacity - slot.value.bookedCovers : undefined
)

const reservationUrl = computed(() => {
  if (!reservationsStore.current) return ''
  const base = typeof window !== 'undefined' ? window.location.origin : ''
  return `${base}/ma-reservation?token=${reservationsStore.current.token}`
})

onMounted(async () => {
  reservationsStore.reset()

  if (!restaurantId.value || !slotId.value || !date.value) {
    contextError.value = "Paramètres manquants dans l'URL."
    isLoadingContext.value = false
    return
  }

  const tasks: Promise<void>[] = []
  if (!restaurant.value) {
    tasks.push(restaurantsStore.fetchOne(restaurantId.value))
  }
  if (!slot.value) {
    tasks.push(restaurantsStore.fetchSlots(restaurantId.value, date.value))
  }
  await Promise.all(tasks)

  if (!slot.value) {
    contextError.value = 'Créneau introuvable.'
  }

  isLoadingContext.value = false
})

async function onSubmit(payload: CreateReservation) {
  await reservationsStore.create(payload)
}
</script>
