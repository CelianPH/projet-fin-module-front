<template>
  <div class="space-y-6 max-w-3xl">
    <h1 class="text-2xl font-semibold text-black">Voir ma réservation</h1>

    <form class="flex flex-col sm:flex-row gap-2" @submit.prevent="onLookup">
      <SearchBar
        v-model="tokenInput"
        placeholder="Colle ton token de réservation…"
      />
      <button
        type="submit"
        :disabled="!tokenInput.trim() || store.loading"
        class="bg-black text-white px-4 py-2 text-sm rounded disabled:bg-gray-400 whitespace-nowrap"
      >
        Rechercher
      </button>
    </form>

    <Loader v-if="store.loading" />

    <div
      v-if="store.cancelMessage"
      class="border border-gray-400 bg-gray-100 text-sm text-black px-3 py-2 rounded"
    >
      {{ store.cancelMessage }}
    </div>

    <div
      v-else-if="store.error"
      class="border border-gray-400 bg-gray-100 text-sm text-black px-3 py-2 rounded"
    >
      {{ store.error.message }}
    </div>

    <ReservationDetailCard
      v-if="store.current && !store.loading"
      :reservation="store.current"
      :cancel-disabled="store.loading"
      @cancel="onCancel"
    />
  </div>
</template>

<script setup lang="ts">
import { useReservationsStore } from '~/stores/reservations'

const route = useRoute()
const router = useRouter()
const store = useReservationsStore()

const tokenInput = ref((route.query.token as string) || '')

async function onLookup() {
  const t = tokenInput.value.trim()
  if (!t) return
  router.replace({ query: { token: t } })
  await store.fetchByToken(t)
}

async function onCancel() {
  if (!store.current) return
  if (!confirm("Confirmer l'annulation de cette réservation ?")) return
  await store.cancel(store.current.id, store.current.token)
}

onMounted(async () => {
  store.reset()
  const t = tokenInput.value.trim()
  if (t) {
    await store.fetchByToken(t)
  }
})
</script>
