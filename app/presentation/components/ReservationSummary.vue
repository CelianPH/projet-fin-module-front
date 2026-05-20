<template>
  <aside class="bg-gray-100 border border-gray-300 rounded p-4 space-y-3 text-sm">
    <h3 class="font-medium text-black">Récapitulatif</h3>

    <div v-if="restaurant">
      <p class="text-xs text-gray-500">Restaurant</p>
      <p class="text-black">{{ restaurant.name }}</p>
    </div>

    <div v-if="slot">
      <p class="text-xs text-gray-500">Date</p>
      <p class="text-black">{{ slot.date }}</p>
    </div>

    <div v-if="slot">
      <p class="text-xs text-gray-500">Heure</p>
      <p class="text-black">{{ slot.startTime }} – {{ slot.endTime }}</p>
    </div>

    <div v-if="covers !== undefined">
      <p class="text-xs text-gray-500">Couverts</p>
      <p class="text-black">{{ covers }}</p>
    </div>

    <p
      v-if="!restaurant && !slot"
      class="text-xs text-gray-500"
    >
      Aucune information à afficher.
    </p>
  </aside>
</template>

<script setup lang="ts">
import type { SlotResponse } from '~/types/api'

defineProps<{
  restaurant: { id: string; name: string } | null
  slot: SlotResponse | null
  covers?: number
}>()
</script>
