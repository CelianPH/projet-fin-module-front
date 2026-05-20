<template>
  <span
    :class="[
      'inline-block px-2 py-0.5 text-xs rounded border',
      styleClass,
    ]"
  >
    {{ label }}
  </span>
</template>

<script setup lang="ts">
import type { SlotStatus } from '~/types/api'

const props = defineProps<{ status: SlotStatus }>()

const label = computed(() => {
  switch (props.status) {
    case 'free':
      return 'Disponible'
    case 'nearly_full':
      return 'Presque plein'
    case 'full':
      return 'Complet'
  }
})

const styleClass = computed(() => {
  switch (props.status) {
    case 'free':
      return 'bg-white border-gray-400 text-black'
    case 'nearly_full':
      return 'bg-gray-200 border-gray-500 text-black'
    case 'full':
      return 'bg-gray-700 border-gray-700 text-white'
  }
})
</script>
