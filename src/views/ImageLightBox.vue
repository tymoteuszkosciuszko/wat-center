<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-white/30"
    @click="close"
  >
    <div class="relative w-full h-full flex items-center justify-center">
      <!-- Przycisk poprzedniego zdjęcia -->
      <button
        @click.stop="prevImage"
        class="absolute left-0 top-0 bottom-0 w-10% flex items-center px-4 text-4xl text-gray-800 hover:bg-black/10 hover:cursor-pointer transition-colors"
      >
        ⬅️
      </button>

      <!-- Główne zdjęcie -->
      <img
        :src="currentImageUrl"
        :alt="images[currentIndex]"
        class="max-w-[80vw] max-h-[90vh] object-contain shadow-2xl rounded-lg"
        @click.stop
      >

      <!-- Przycisk następnego zdjęcia -->
      <button
        @click.stop="nextImage"
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
        {{ images[currentIndex] }} ({{ currentIndex + 1 }}/{{ images.length }})
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  images: string[]
  basePath: string
  isOpen: boolean
  currentIndex: number
}>()

const emit = defineEmits(['close', 'update:currentIndex'])

const currentImageUrl = computed(() => {
  return `/files/${props.basePath}/${props.images[props.currentIndex]}`
})

const close = () => {
  emit('close')
}

const nextImage = () => {
  const newIndex = (props.currentIndex + 1) % props.images.length
  emit('update:currentIndex', newIndex)
}

const prevImage = () => {
  const newIndex = (props.currentIndex - 1 + props.images.length) % props.images.length
  emit('update:currentIndex', newIndex)
}

const handleKeydown = (event: KeyboardEvent) => {
  if (!props.isOpen) return

  if (event.key === 'ArrowLeft') {
    prevImage()
  } else if (event.key === 'ArrowRight') {
    nextImage()
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