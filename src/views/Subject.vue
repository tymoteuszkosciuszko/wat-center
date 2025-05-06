<template>
  <div class="container mx-auto text-center mt-8">
    <h1 class="text-4xl font-semibold text-gray-700 mb-4">WAT Center</h1>
    <h2 class="text-3xl font-medium text-gray-600 mb-8">{{ title }}</h2>
    <!-- Tu będą pliki / linki -->
    <p class="text-gray-500">Materiały pojawią się wkrótce.</p>
    <RouterLink to="/">Powrót</RouterLink>
  </div>
</template>

<script setup>
defineProps({
  title: String
})
</script>
