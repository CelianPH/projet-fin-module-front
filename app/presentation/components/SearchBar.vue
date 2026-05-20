<template>
  <input
    :value="modelValue"
    type="search"
    :placeholder="placeholder"
    class="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-black placeholder:text-gray-400 focus:outline-none focus:border-gray-500"
    @input="onInput"
  />
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{ modelValue: string; placeholder?: string }>(),
  { placeholder: 'Rechercher…' }
)
const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

function onInput(event: Event) {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>
