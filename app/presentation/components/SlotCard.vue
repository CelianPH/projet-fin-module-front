<template>
  <button
    type="button"
    :disabled="slot.status === 'full'"
    class="flex flex-col items-start gap-2 p-3 border rounded text-left transition-colors disabled:cursor-not-allowed"
    :class="[
      slot.status === 'full'
        ? 'bg-gray-100 border-gray-300 text-gray-400'
        : 'bg-white border-gray-300 hover:border-gray-500 text-black',
    ]"
    @click="$emit('select', slot.id)"
  >
    <span class="font-medium">{{ slot.startTime }} – {{ slot.endTime }}</span>
    <span class="text-xs text-gray-600">
      {{ slot.bookedCovers }} / {{ slot.totalCapacity }} couverts
    </span>
    <SlotStatus :status="slot.status" />
  </button>
</template>

<script setup lang="ts">
import type { SlotResponse } from '~/types/api'

defineProps<{ slot: SlotResponse }>()
defineEmits<{ select: [id: string] }>()
</script>
