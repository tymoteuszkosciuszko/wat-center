<template>
  <ImageLightbox
    :images="imageFiles"
    :base-path="fullPath"
    :is-open="isLightboxOpen"
    :current-index="currentImageIndex"
    @close="closeLightbox"
    @update:current-index="updateImageIndex"
  />
  <PdfLightBox
    v-if="isPdfLightboxOpen"
    :pdfs="pdfFiles"
    :basePath="fullPath"
    :isOpen="isPdfLightboxOpen"
    :currentIndex="currentPdfIndex"
    @close="closePdfLightbox"
    @update:currentIndex="updatePdfIndex"
  />
  <div class="container mx-auto px-4">
    <div class="text-3xl text-center font-medium text-gray-500 mb-8">
    <span v-for="(part, index) in pathParts" :key="index">
      <router-link
        :to="getPathToIndex(index)"
        class="text-gray-500 hover:text-gray-700 transition duration-300 ease-in-out"
      >
        {{ part }}
      </router-link>
      <span v-if="index < pathParts.length - 1"> / </span>
    </span>
    </div>
    <div class="flex flex-col items-center space-y-4"><router-link class="text-3xl text-center font-medium" :to="parentPath">⬅️</router-link></div>
    <h3 class="text-xl text-center font-medium text-gray-500 mb-4 py-4">{{ folderName }}</h3>
    <div class="flex flex-col items-center space-y-4">
      <!-- Foldery -->
      <router-link
        v-for="folder in content.folders"
        :key="folder"
        :to="`/subject/${fullPath}/${folder}`"
        class="text-xl shadow-md rounded text-gray-700 text-center bg-zinc-300 px-4 py-5 m-2 w-[70%] max-w-full transition duration-300 ease-in-out hover:shadow-lg hover:bg-zinc-400 hover:text-gray-900"
      >
        <span class="break-all">📁 {{ folder }}</span>
      </router-link>

      <!-- Pliki -->
      <a
        v-for="file in content.files.filter(f => !f.startsWith('.') && f !== 'name.txt')"
        :key="file"
        :href="getFileHref(file)"
        @click.prevent="handleFileClick(file)"
        class="text-xl shadow-md rounded text-gray-700 text-center bg-gray-100 px-4 py-5 m-2 w-[70%] max-w-full transition duration-300 ease-in-out hover:shadow-lg hover:bg-gray-300 hover:text-gray-900 flex justify-between items-center"
        :target="file.endsWith('.pdf') ? '_self' : '_blank'"
        title="Podgląd pliku"
        rel="noopener"
      >
        <span class="break-all flex-grow text-left mr-4">{{ getFileIcon(file) }} {{ file }}</span>
        <a
          :href="`/files/${fullPath}/${file}`"
          download
          class="ml-4 px-3 py-1 bg-gray-300 text-white rounded hover:bg-gray-500 transition duration-300 flex-shrink-0"
          @click.stop
          title="Pobierz plik"
        >
          ⬇️
        </a>
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
import ImageLightbox from '@/views/ImageLightBox.vue'
import PdfLightBox from './PdfLightBox.vue'


const route = useRoute()
const router = useRouter()

const content = ref<{ files: string[]; folders: string[] }>({ files: [], folders: [] })
const folderName = ref<string | null>(null)
const isLightboxOpen = ref(false)
const isPdfLightboxOpen = ref(false)
const currentImageIndex = ref(0)
const currentPdfIndex = ref(0)

const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp']
const pdfExtensions = ['pdf']

// Dodajemy obliczone właściwości dla plików obrazów
const imageFiles = computed(() => {
  return content.value.files.filter(file => {
    const extension = file.toLowerCase().split('.').pop() || ''
    return imageExtensions.includes(extension)
  })
})
const pdfFiles = computed(() => {
  return content.value.files.filter(file => {
    const extension = file.toLowerCase().split('.').pop() || ''
    return pdfExtensions.includes(extension)
  })
})

const handleFileClick = (file: string) => {
  const extension = file.toLowerCase().split('.').pop() || ''

  if (imageExtensions.includes(extension)) {
    const imageIndex = imageFiles.value.indexOf(file)
    if (imageIndex !== -1) {
      currentImageIndex.value = imageIndex
      isLightboxOpen.value = true
    }
  } else if (pdfExtensions.includes(extension)) {
    const pdfIndex = pdfFiles.value.indexOf(file)
    if (pdfIndex !== -1) {
      currentPdfIndex.value = pdfIndex
      isPdfLightboxOpen.value = true
    }
  }
}

// Funkcja do generowania href dla plików
const getFileHref = (file: string) => {
  return `/files/${fullPath.value}/${file}`
}

// Funkcje do obsługi lightboxa
const closeLightbox = () => {
  isLightboxOpen.value = false
}

const updateImageIndex = (newIndex: number) => {
  currentImageIndex.value = newIndex
}

const closePdfLightbox = () => {
  isPdfLightboxOpen.value = false
}

const updatePdfIndex = (newIndex: number) => {
  currentPdfIndex.value = newIndex
}

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

const pathParts = computed(() => fullPath.value.split('/'))

const getPathToIndex = (index: number) => {
  return '/subject/' + pathParts.value.slice(0, index + 1).join('/')
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