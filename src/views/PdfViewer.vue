<template>
  <div class="container mx-auto px-4">
    <h2 class="text-3xl text-center font-medium text-gray-700 mb-8">Podgląd PDF</h2>
    <div class="flex flex-col items-center space-y-4">
    <button
      @click="goBack"
      class="text-3xl text-center font-medium hover:cursor-pointer"
    >
      ⬅️
    </button>
    </div>
    <br>
    <iframe
      v-if="pdfUrl"
      :src="pdfUrl"
      class="w-full h-screen border-0"
      style="min-height: 80vh;"
    ></iframe>
    <p v-else class="text-center text-gray-500">Nie znaleziono pliku PDF.</p>
  </div>
</template>

<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const pdfUrl = route.query.url ? decodeURIComponent(route.query.url.toString()) : null

const goBack = () => {
  router.back()
}
</script>