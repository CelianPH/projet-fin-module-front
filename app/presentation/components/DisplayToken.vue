<template>
  <div class="border border-gray-300 rounded p-4 space-y-4 bg-gray-50">
    <div>
      <h3 class="font-medium text-black">Réservation confirmée</h3>
      <p class="text-sm text-gray-600 mt-1">
        Garde précieusement ce lien : c'est ton seul moyen de retrouver ta réservation.
      </p>
    </div>

    <div class="space-y-3">
      <div>
        <p class="text-xs text-gray-500 mb-1">Token</p>
        <div class="flex gap-2">
          <code class="flex-1 bg-white border border-gray-300 rounded px-2 py-1 text-xs text-black break-all">
            {{ token }}
          </code>
          <button
            type="button"
            class="border border-gray-400 bg-white text-xs text-black px-3 py-1 rounded hover:bg-gray-100 whitespace-nowrap"
            @click="copy(token, 'token')"
          >
            Copier
          </button>
        </div>
      </div>

      <div>
        <p class="text-xs text-gray-500 mb-1">Lien de récupération</p>
        <div class="flex gap-2">
          <code class="flex-1 bg-white border border-gray-300 rounded px-2 py-1 text-xs text-black break-all">
            {{ reservationUrl }}
          </code>
          <button
            type="button"
            class="border border-gray-400 bg-white text-xs text-black px-3 py-1 rounded hover:bg-gray-100 whitespace-nowrap"
            @click="copy(reservationUrl, 'url')"
          >
            Copier
          </button>
        </div>
      </div>
    </div>

    <p v-if="copiedKind" class="text-xs text-gray-600">
      {{ copiedKind === 'token' ? 'Token' : 'Lien' }} copié dans le presse-papier.
    </p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ token: string; reservationUrl: string }>()
const emit = defineEmits<{ copied: [kind: 'token' | 'url'] }>()

const copiedKind = ref<'token' | 'url' | null>(null)

async function copy(value: string, kind: 'token' | 'url') {
  try {
    await navigator.clipboard.writeText(value)
    copiedKind.value = kind
    emit('copied', kind)
    setTimeout(() => {
      copiedKind.value = null
    }, 2000)
  } catch {
    // navigateur sans clipboard API, on ignore silencieusement
  }
}
</script>
