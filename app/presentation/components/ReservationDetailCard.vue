<template>
  <article class="border border-gray-300 rounded p-6 space-y-4">
    <header class="flex items-start justify-between gap-4">
      <div>
        <p class="text-xs text-gray-500">Restaurant</p>
        <p class="text-lg font-medium text-black">
          {{ reservation.restaurant.name }}
        </p>
      </div>
      <span
        :class="
          reservation.status === 'cancelled'
            ? 'bg-gray-700 text-white border-gray-700'
            : 'bg-white border-gray-400 text-black'
        "
        class="border px-2 py-1 text-xs rounded whitespace-nowrap"
      >
        {{ reservation.status === 'confirmed' ? 'Confirmée' : 'Annulée' }}
      </span>
    </header>

    <div class="grid grid-cols-2 gap-3 text-sm">
      <div>
        <p class="text-xs text-gray-500">Date</p>
        <p class="text-black">{{ reservation.slot.date }}</p>
      </div>
      <div>
        <p class="text-xs text-gray-500">Heure</p>
        <p class="text-black">
          {{ reservation.slot.startTime }} – {{ reservation.slot.endTime }}
        </p>
      </div>
      <div>
        <p class="text-xs text-gray-500">Couverts</p>
        <p class="text-black">{{ reservation.covers }}</p>
      </div>
      <div>
        <p class="text-xs text-gray-500">Au nom de</p>
        <p class="text-black">{{ reservation.customer.name }}</p>
      </div>
    </div>

    <div
      v-if="reservation.status === 'confirmed'"
      class="flex justify-end pt-2"
    >
      <button
        type="button"
        :disabled="cancelDisabled"
        class="bg-black text-white px-4 py-2 text-sm rounded disabled:bg-gray-400"
        @click="$emit('cancel')"
      >
        Annuler la réservation
      </button>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { ReservationResponse } from '~/types/api'

withDefaults(
  defineProps<{
    reservation: ReservationResponse
    cancelDisabled?: boolean
  }>(),
  { cancelDisabled: false }
)

defineEmits<{ cancel: [] }>()
</script>
