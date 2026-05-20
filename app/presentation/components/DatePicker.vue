<template>
  <input
    type="date"
    :value="modelValue"
    :min="min"
    :max="max"
    class="bg-white border border-gray-300 rounded px-3 py-2 text-sm text-black focus:outline-none focus:border-gray-500"
    @input="onInput"
  />
</template>

<script setup lang="ts">
defineProps<{ modelValue: string; min?: string; max?: string }>()
const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

function onInput(event: Event) {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>
