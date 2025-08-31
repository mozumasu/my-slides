<script setup lang="ts">
import { computed } from 'vue'
import type { WaveTheme } from '../composables/useOceanThemes'
import type { NeonTheme } from '../composables/useNeonThemes'

// Props
const props = defineProps<{
  currentTheme: 'neon' | 'ocean'
  waveTheme?: WaveTheme
  neonTheme?: NeonTheme
}>()

// Emit events
const emit = defineEmits<{
  toggleTheme: []
}>()

// Computed properties
const themeIcon = computed(() => props.currentTheme === 'neon' ? '⚡' : '🌊')
const themeVariant = computed(() => {
  if (props.currentTheme === 'ocean' && props.waveTheme) {
    return props.waveTheme.toUpperCase()
  }
  if (props.currentTheme === 'neon' && props.neonTheme) {
    return props.neonTheme.toUpperCase()
  }
  return ''
})

const hintText = computed(() => {
  const hints = ['Press T to toggle theme']
  if (props.currentTheme === 'ocean') {
    hints.push('W for wave style')
  } else {
    hints.push('N for neon style')
  }
  return hints.join(', ')
})
</script>

<template>
  <div class="theme-indicator">
    <div
      class="theme-badge"
      :class="{
        neon: currentTheme === 'neon',
        ocean: currentTheme === 'ocean',
      }"
      @click="$emit('toggleTheme')"
    >
      {{ themeIcon }}
      {{ currentTheme.toUpperCase() }}
      <span v-if="themeVariant" class="wave-theme">
        ({{ themeVariant }})
      </span>
    </div>
    <div class="theme-hint">{{ hintText }}</div>
  </div>
</template>

<style scoped>
.theme-indicator {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
}

.theme-badge {
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 8px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  user-select: none;
}

.theme-badge.neon {
  background: rgba(139, 92, 246, 0.8);
  box-shadow: 0 0 10px rgba(139, 92, 246, 0.5);
}

.theme-badge.ocean {
  background: rgba(32, 178, 170, 0.8);
  box-shadow: 0 0 10px rgba(32, 178, 170, 0.5);
}

.theme-badge:hover {
  transform: scale(1.05);
  box-shadow: 0 0 20px currentColor;
}

.theme-hint {
  font-size: 10px;
  color: rgba(255, 255, 255, 0.6);
  background: rgba(0, 0, 0, 0.5);
  padding: 2px 6px;
  border-radius: 10px;
  backdrop-filter: blur(5px);
}

.wave-theme {
  font-size: 0.9em;
  opacity: 0.8;
  margin-left: 4px;
}
</style>