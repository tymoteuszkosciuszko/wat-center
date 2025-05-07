<template>
  <div class="container mx-auto px-4 py-8">
    <router-link to="/">
      <h1 class="text-4xl text-center font-semibold text-gray-700 mb-6">WAT Center</h1>
    </router-link>

    <router-view />
    <div class="flex flex-col items-center space-y-5">
      <br>
    <h3>Kontakt: <a class="text-blue-400 transition duration-300 ease-in-out hover:text-blue-700" href="mailto:hello@21152115.xyz">hello@21152115.xyz</a></h3>
    </div>
  </div>
</template>
<script setup lang="ts">
</script>