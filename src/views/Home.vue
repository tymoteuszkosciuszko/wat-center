<template>
  <div class="container mx-auto text-center mt-8">
    <h1 class="text-4xl font-semibold text-gray-700 mb-4">WAT Center</h1>
    <h2 class="text-2xl font-medium text-gray-600 mb-8">Wybierz przedmiot</h2>
    <div class="flex flex-col items-center space-y-4">
      <RouterLink
        v-for="subject in subjects"
        :key="subject.name"
        :to="subject.link"
        class="text-xl shadow-md rounded text-gray-700 text-center bg-gray-200 px-6 py-4 w-80 transition duration-300 ease-in-out hover:shadow-lg hover:bg-gray-400 hover:text-gray-900"
      >
        {{ subject.name }}
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
const subjects = [
  { name: 'Fizyka', link: '/fizyka' },
  { name: 'AOK', link: '/aok' },
  { name: 'JEE', link: '/jee' },
]
</script>
