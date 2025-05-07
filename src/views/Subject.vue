<template>
  <div class="container mx-auto px-4">
    <h2 class="text-3xl text-center font-medium text-gray-700 mb-8">{{ pageTitle }}</h2>
    <div class="flex flex-col items-center space-y-4"><router-link class="text-3xl text-center font-medium" :to="parentPath">⬅️</router-link></div>
    <h3 class="text-xl text-center font-medium text-gray-500 mb-4 py-4">{{ folderName }}</h3>
    <div class="flex flex-col items-center space-y-4">
      <!-- Foldery -->
      <router-link
        v-for="folder in content.folders"
        :key="folder"
        :to="`/subject/${fullPath}/${folder}`"
        class="text-xl shadow-md rounded text-gray-700 text-center bg-zinc-300 px-4 py-5 m-2 transition duration-300 ease-in-out hover:shadow-lg hover:bg-zinc-400 hover:text-gray-900"
        style="width: 32rem;"
      >
        📁 {{ folder }}
      </router-link>

      <!-- Pliki -->
      <a
        v-for="file in content.files.filter(f => !f.startsWith('.') && f !== 'name.txt')"
        :key="file"
        :href="file.endsWith('.pdf') ? `/pdf-viewer?url=${encodeURIComponent(`/files/${fullPath}/` + file)}` : `/files/${fullPath}/` + file"
        class="text-xl shadow-md rounded text-gray-700 text-center bg-gray-100 px-4 py-5 m-2 transition duration-300 ease-in-out hover:shadow-lg hover:bg-gray-300 hover:text-gray-900"
        style="width: 32rem;"
        :target="file.endsWith('.pdf') ? '_self' : '_blank'"
        rel="noopener"
      >
        {{ getFileIcon(file) }} {{ file }}
      </a>

      <!-- Przycisk powrotu -->
<!--      <router-link-->
<!--        :to="parentPath"-->
<!--        class="text-xl shadow-md rounded flex-auto text-gray-700 text-center bg-red-200 px-4 py-5 m-2 transition duration-300 ease-in-out hover:shadow-lg hover:bg-red-400 hover:text-gray-900"-->
<!--        style="width: 32rem;"-->
<!--      >-->
<!--        Powrót-->
<!--      </router-link>-->
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const content = ref({ files: [], folders: [] })
const folderName = ref<string | null>(null)

const fullPath = computed(() => {
  return route.params.path.toString()
})

const pageTitle = computed(() => {
  return fullPath.value
    .split('/')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' / ')
})

const parentPath = computed(() => {
  const parts = fullPath.value.split('/')
  if (parts.length <= 1) return '/'
  parts.pop()
  return parts.length === 0 ? '/' : '/subject/' + parts.join('/')
})

const updateTitle = () => {
  document.title = `${pageTitle.value} – WAT Center`
}

const getFileIcon = (fileName: string) => {
  const extension = fileName.toLowerCase().split('.').pop()

  switch (extension) {
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
    case 'bmp':
      return '🖼️'
    case 'pdf':
      return '📄'
    case 'doc':
    case 'docx':
      return '📝'
    case 'xls':
    case 'xlsx':
      return '📊'
    case 'ppt':
    case 'pptx':
      return '📽️'
    case 'txt':
      return '📋'
    case 'zip':
    case 'rar':
    case '7z':
      return '🗜️'
    default:
      return '📎'
  }
}

const loadContent = async () => {
  try {
    const res = await fetch(`/files/${fullPath.value}/index.json`)
    content.value = await res.json()

    // Wczytaj zawartość pliku name.txt, jeśli istnieje
    const nameRes = await fetch(`/files/${fullPath.value}/name.txt`)
    var nameResText = await nameRes.text()
    if (nameResText.startsWith("<!DOCTYPE html>")) nameResText = " "
    if (nameRes.ok) {
      console.log('Zawartość name.txt:', nameResText)
      folderName.value = await nameResText
    } else {
      console.log('Nie znaleziono pliku name.txt')
      folderName.value = " "
    }
  } catch (err) {
    console.error('Błąd ładowania zawartości:', err)
    content.value = { files: [], folders: [] }
    folderName.value = null
  }
}

watch(() => route.params.path, (newPath) => {
  if (!newPath) {
    router.replace('/')
    return
  }
  updateTitle()
  loadContent()
})

onMounted(() => {
  if (!route.params.path) {
    router.replace('/')
    return
  }
  updateTitle()
  loadContent()
})
</script>