<template>
  <div>
    <p v-if="!items.length" class="text-sm text-gray-500 py-8 text-center">
      Aucun restaurant à afficher.
    </p>
    <div
      v-else
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      <RestaurantCard
        v-for="r in items"
        :key="r.id"
        :restaurant="r"
        @select="(id) => $emit('select', id)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Restaurant } from '~/types/api'

defineProps<{ items: Restaurant[] }>()
defineEmits<{ select: [id: string] }>()
</script>
