<template>
  <div class="container mx-auto px-4 py-6">
    <h1 class="text-4xl text-center font-semibold text-gray-700 mb-6">WAT Center</h1>

    <div class="flex flex-col items-center space-y-4">
      <RouterLink
        v-for="subject in subjects"
        :key="subject"
        :to="`/subject/${subject}`"
        class="text-xl shadow-md rounded text-gray-700 text-center bg-gray-200 px-4 py-5 m-2 transition duration-300 ease-in-out hover:shadow-lg hover:bg-gray-400 hover:text-gray-900"
        style="width: 24rem;"
      >
        {{ formatSubject(subject) }}
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const subjects = ref([])

onMounted(async () => {
  try {
    const res = await fetch('/files/index.json')
    subjects.value = await res.json()
  } catch (err) {
    console.error('Nie udało się pobrać listy przedmiotów:', err)
  }
})

const formatSubject = (s) =>
  s.charAt(0).toUpperCase() + s.slice(1).replace(/_/g, ' ')
</script>
