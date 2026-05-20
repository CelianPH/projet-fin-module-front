<template>
  <article
    class="bg-white border border-gray-300 rounded-lg overflow-hidden cursor-pointer hover:border-gray-500 transition-colors"
    @click="$emit('select', restaurant.id)"
  >
    <div class="aspect-[4/3] bg-gray-200 border-b border-gray-300 flex items-center justify-center">
      <img
        v-if="restaurant.imageUrl"
        :src="restaurant.imageUrl"
        :alt="restaurant.name"
        class="w-full h-full object-cover"
        loading="lazy"
      />
      <span v-else class="text-gray-500 text-xs">Image</span>
    </div>
    <div class="p-4 space-y-2">
      <h3 class="font-medium text-black">{{ restaurant.name }}</h3>
      <p class="text-sm text-gray-600 line-clamp-2">{{ restaurant.description }}</p>
      <div class="flex gap-2 text-xs text-gray-500">
        <span>{{ restaurant.cuisineType }}</span>
        <span aria-hidden="true">·</span>
        <span>{{ city }}</span>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { Restaurant } from '~/types/api'

const props = defineProps<{ restaurant: Restaurant }>()
defineEmits<{ select: [id: string] }>()

const city = computed(() => {
  const parts = props.restaurant.address.split(',')
  return parts[parts.length - 1]?.trim() ?? ''
})
</script>
