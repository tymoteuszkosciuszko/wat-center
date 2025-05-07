<template>
  <div class="container mx-auto px-4">
    <h2 class="text-3xl text-center font-me text-gray-700 mb-8">Strona Główna</h2>

    <div class="flex flex-col items-center space-y-4">
      <router-link
        v-for="folder in content.folders"
        :key="folder"
        :to="`/subject/${folder}`"
        class="text-xl shadow-md rounded text-gray-700 text-center bg-gray-100 px-4 py-5 m-2 transition duration-300 ease-in-out hover:shadow-lg hover:bg-gray-300 hover:text-gray-900"
        style="width: 32rem;"
      >
        {{ folder }}
      </router-link>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'

const content = ref({ files: [], folders: [] })

const loadContent = async () => {
  try {
    const res = await fetch('/files/index.json')
    content.value = await res.json()
  } catch (err) {
    console.error('Błąd ładowania zawartości:', err)
    content.value = { files: [], folders: [] }
  }
}

onMounted(() => {
  document.title = 'Strona Główna – WAT Center'
  loadContent()
})
</script>