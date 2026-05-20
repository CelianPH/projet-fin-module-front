<template>
  <div class="flex items-center gap-2 text-gray-500 text-sm py-4">
    <span
      class="inline-block w-3 h-3 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"
      aria-hidden="true"
    />
    <span>{{ label }}</span>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ label?: string }>(), {
  label: 'Chargement…',
})
</script>
