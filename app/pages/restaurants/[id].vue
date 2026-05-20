<template>
  <div class="my-10">
    <Loader v-if="store.loading && !store.current" />

    <div
      v-else-if="store.error && !store.current"
      class="border border-gray-400 bg-gray-100 text-sm text-black px-3 py-2 rounded"
    >
      {{ store.error.message }}
    </div>

    <template v-else-if="store.current">
      <section class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="my-3">
          <h1 class="text-2xl font-semibold text-black">
            {{ store.current.name }}
          </h1>
          <p class="text-sm text-gray-600">
            {{ store.current.description }}
          </p>
          <div class="flex gap-2 flex-wrap">
            <span
              class="bg-gray-100 border border-gray-300 px-2 py-1 text-xs rounded"
            >
              {{ store.current.cuisineType }}
            </span>
            <span
              class="bg-gray-100 border border-gray-300 px-2 py-1 text-xs rounded"
            >
              {{ city }}
            </span>
            <span
              v-if="freeSlotCount > 0"
              class="bg-gray-100 border border-gray-300 px-2 py-1 text-xs rounded"
            >
              {{ freeSlotCount }} créneaux dispos
            </span>
            <span
              v-else-if="!store.slotsLoading && store.slots.length"
              class="bg-gray-700 text-white px-2 py-1 text-xs rounded"
            >
              Complet
            </span>
          </div>
        </div>
        <div class="aspect-[4/3] bg-gray-200 border border-gray-300 rounded overflow-hidden">
          <img
            v-if="store.current.imageUrl"
            :src="store.current.imageUrl"
            :alt="store.current.name"
            class="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      </section>

      <section class="border border-gray-300 rounded-lg mt-8">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h2 class="text-lg font-medium">Choisir un créneau</h2>
          <DatePicker
            v-model="selectedDate"
            :min="minDate"
            :max="maxDate"
          />
        </div>

        <Loader v-if="store.slotsLoading" label="Chargement des créneaux…" />

        <p
          v-else-if="!store.slots.length"
          class="text-sm text-gray-500 py-4 text-center"
        >
          Aucun créneau pour cette date.
        </p>

        <div
          v-else
          class="grid grid-cols-2 md:grid-cols-3 gap-3"
        >
          <SlotCard
            v-for="slot in store.slots"
            :key="slot.id"
            :slot="slot"
            @select="onSelectSlot"
          />
        </div>
      </section>

      <section class="mt-8">
        <h2 class="text-lg font-medium">Autres restaurants</h2>
        <RestaurantList
          :items="otherRestaurants"
          @select="onSelectOther"
        />
      </section>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useRestaurantsStore } from '~/stores/restaurants'

const route = useRoute()
const store = useRestaurantsStore()

const id = computed(() => route.params.id as string)

const today = new Date()
const formatDate = (d: Date) => d.toISOString().slice(0, 10)
const addDays = (d: Date, n: number) => {
  const c = new Date(d)
  c.setDate(c.getDate() + n)
  return c
}

const minDate = formatDate(today)
const maxDate = formatDate(addDays(today, 9))
const selectedDate = ref(minDate)

const city = computed(() => {
  if (!store.current) return ''
  const parts = store.current.address.split(',')
  return parts[parts.length - 1]?.trim() ?? ''
})

const freeSlotCount = computed(
  () => store.slots.filter((s) => s.status !== 'full').length
)

const otherRestaurants = computed(() =>
  store.list.filter((r) => r.id !== id.value).slice(0, 3)
)

watch(
  id,
  async (newId) => {
    if (!newId) return
    await store.fetchOne(newId)
    await store.fetchSlots(newId, selectedDate.value)
  },
  { immediate: true }
)

watch(selectedDate, (date) => {
  if (id.value) store.fetchSlots(id.value, date)
})

onMounted(() => {
  if (!store.list.length) store.fetchAll()
})

function onSelectSlot(slotId: string) {
  navigateTo(
    `/reserver?restaurantId=${id.value}&slotId=${slotId}&date=${selectedDate.value}`
  )
}

function onSelectOther(otherId: string) {
  navigateTo(`/restaurants/${otherId}`)
}
</script>
