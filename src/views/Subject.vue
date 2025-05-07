<template>
  <div class="container mx-auto px-4 py-6">
    <h1 class="text-4xl text-center font-semibold text-gray-700 mb-4">WAT Center</h1>
    <h2 class="text-3xl text-center font-me text-gray-700 mb-8">{{ subjectTitle }}</h2>

    <div class="flex flex-col items-center space-y-4">
      <a
        v-for="file in files"
        :key="file"
        :href="`/files/${subject}/` + file"
        class="text-xl shadow-md rounded text-gray-700 text-center bg-gray-200 px-4 py-5 m-2 transition duration-300 ease-in-out hover:shadow-lg hover:bg-gray-400 hover:text-gray-900"
        style="width: 24rem;"
        target="_blank"
        rel="noopener"
      >
        {{ file }}
      </a>
      <router-link to="/" class="text-xl shadow-md rounded flex-auto text-gray-700 text-center bg-red-200 px-4 py-5 m-2 transition duration-300 ease-in-out hover:shadow-lg hover:bg-red-400 hover:text-gray-900" style="width: 24rem;">
        Powrót do strony głównej </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const subject = route.params.subject
const subjectTitle = subject.charAt(0).toUpperCase() + subject.slice(1)
const files = ref([])

const updateTitle = () => {
  document.title = `${subjectTitle} – WAT Center`
}

onMounted(async () => {
  updateTitle()
  try {
    const res = await fetch(`/files/${subject}/index.json`)
    files.value = await res.json()
  } catch (err) {
    console.error('Błąd ładowania plików:', err)
  }
})

watch(() => route.params.subject, () => {
  updateTitle()
})
</script>