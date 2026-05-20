<template>
  <form class="space-y-4" @submit.prevent="onSubmit">
    <div class="space-y-1">
      <label class="text-sm font-medium text-black">Nombre de couverts</label>
      <input
        v-model.number="form.covers"
        type="number"
        min="1"
        :max="maxCovers"
        :disabled="loading"
        class="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-black focus:outline-none focus:border-gray-500 disabled:bg-gray-100"
      />
      <p v-if="fieldError('covers')" class="text-xs text-black">
        {{ fieldError('covers') }}
      </p>
    </div>

    <div class="space-y-1">
      <label class="text-sm font-medium text-black">Nom</label>
      <input
        v-model="form.customerName"
        type="text"
        :disabled="loading"
        autocomplete="name"
        class="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-black focus:outline-none focus:border-gray-500 disabled:bg-gray-100"
      />
      <p v-if="fieldError('customerName')" class="text-xs text-black">
        {{ fieldError('customerName') }}
      </p>
    </div>

    <div class="space-y-1">
      <label class="text-sm font-medium text-black">Téléphone</label>
      <input
        v-model="form.customerPhone"
        type="tel"
        :disabled="loading"
        autocomplete="tel"
        class="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-black focus:outline-none focus:border-gray-500 disabled:bg-gray-100"
      />
      <p v-if="fieldError('customerPhone')" class="text-xs text-black">
        {{ fieldError('customerPhone') }}
      </p>
    </div>

    <div class="space-y-1">
      <label class="text-sm font-medium text-black">Email</label>
      <input
        v-model="form.customerEmail"
        type="email"
        :disabled="loading"
        autocomplete="email"
        class="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-black focus:outline-none focus:border-gray-500 disabled:bg-gray-100"
      />
      <p v-if="fieldError('customerEmail')" class="text-xs text-black">
        {{ fieldError('customerEmail') }}
      </p>
    </div>

    <div
      v-if="error && !error.field"
      class="border border-gray-400 bg-gray-100 text-sm text-black px-3 py-2 rounded"
    >
      {{ error.message }}
    </div>

    <button
      type="submit"
      :disabled="loading"
      class="bg-black text-white px-4 py-2 text-sm rounded disabled:bg-gray-400"
    >
      {{ loading ? 'Réservation…' : 'Réserver' }}
    </button>
  </form>
</template>

<script setup lang="ts">
import type { ApiError, CreateReservation } from '~/types/api'

const props = defineProps<{
  restaurantId: string
  timeSlotId: string
  maxCovers?: number
  loading: boolean
  error: ApiError | null
}>()

const emit = defineEmits<{ submit: [payload: CreateReservation] }>()

const form = reactive({
  customerName: '',
  customerEmail: '',
  customerPhone: '',
  covers: 2,
})

function fieldError(name: string): string {
  return props.error?.field === name ? props.error.message : ''
}

function onSubmit() {
  emit('submit', {
    restaurantId: props.restaurantId,
    timeSlotId: props.timeSlotId,
    customerName: form.customerName.trim(),
    customerEmail: form.customerEmail.trim(),
    customerPhone: form.customerPhone.trim(),
    covers: form.covers,
  })
}
</script>
