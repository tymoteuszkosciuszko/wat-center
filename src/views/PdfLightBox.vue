<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-white/30"
    @click="close"
  >
    <div class="relative w-full h-full flex items-center justify-center">
      <!-- Przycisk poprzedniego pliku -->
      <button
        @click.stop="prevPdf"
        class="absolute left-0 top-0 bottom-0 w-10% flex items-center px-4 text-4xl text-gray-800 hover:bg-black/10 hover:cursor-pointer transition-colors"
      >
        ⬅️
      </button>

      <!-- Główny podgląd PDF -->
      <iframe
        :src="currentPdfUrl"
        class="w-[80vw] h-[90vh] shadow-2xl rounded-lg"
        frameborder="0"
        @click.stop
      ></iframe>

      <!-- Przycisk następnego pliku -->
      <button
        @click.stop="nextPdf"
        class="absolute right-0 top-0 bottom-0 w-10% flex items-center justify-end px-4 text-4xl text-gray-800 hover:cursor-pointer hover:bg-black/10 transition-colors"
      >
        ➡️
      </button>

      <!-- Przycisk zamknięcia -->
      <button
        @click.stop="close"
        class="absolute top-4 right-4 text-3xl text-gray-800 hover:text-gray-600 hover:cursor-pointer"
      >
        ❌
      </button>

      <!-- Panel informacyjny -->
      <div class="absolute bottom-0 left-0 right-0 bg-white/70 backdrop-blur-sm text-gray-800 p-4 text-center">
        {{ pdfs[currentIndex] }} ({{ currentIndex + 1 }}/{{ pdfs.length }})
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  pdfs: string[]
  basePath: string
  isOpen: boolean
  currentIndex: number
}>()

const emit = defineEmits(['close', 'update:currentIndex'])

const currentPdfUrl = computed(() => {
  return `/files/${props.basePath}/${props.pdfs[props.currentIndex]}`
})

const close = () => {
  emit('close')
}

const nextPdf = () => {
  const newIndex = (props.currentIndex + 1) % props.pdfs.length
  emit('update:currentIndex', newIndex)
}

const prevPdf = () => {
  const newIndex = (props.currentIndex - 1 + props.pdfs.length) % props.pdfs.length
  emit('update:currentIndex', newIndex)
}

const handleKeydown = (event: KeyboardEvent) => {
  if (!props.isOpen) return

  if (event.key === 'ArrowLeft') {
    prevPdf()
  } else if (event.key === 'ArrowRight') {
    nextPdf()
  } else if (event.key === 'Escape') {
    close()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>