<template>
  <div class="my-6">
    <h1 class="text-2xl font-semibold text-black">Restaurants</h1>

    <SearchBar
      v-model="query"
      placeholder="Rechercher un restaurant, une cuisine, une ville…"
    />

    <Loader v-if="store.loading" />

    <div
      v-else-if="store.error"
      class="border border-gray-400 bg-gray-100 text-sm text-black px-3 py-2 rounded"
    >
      {{ store.error.message }}
    </div>

    <RestaurantList
      v-else
      :items="filteredRestaurants"
      @select="onSelect"
    />
  </div>
</template>

<script setup lang="ts">
import { useRestaurantsStore } from '~/stores/restaurants'

const store = useRestaurantsStore()
const query = ref('')

const filteredRestaurants = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return store.list
  return store.list.filter((r) =>
    [r.name, r.cuisineType, r.address, r.description].some((field) =>
      field.toLowerCase().includes(q)
    )
  )
})

function onSelect(id: string) {
  navigateTo(`/restaurants/${id}`)
}

onMounted(() => {
  store.fetchAll()
})
</script>
