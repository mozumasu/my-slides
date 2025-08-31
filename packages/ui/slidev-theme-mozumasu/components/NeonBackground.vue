<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import {
  NEON_THEMES,
  getNextNeonTheme,
  type NeonTheme,
} from '../composables/useNeonThemes'

// Props
const props = defineProps<{
  visible: boolean
  slideNumber?: number
}>()

// Current Neon theme
const currentNeonTheme = ref<NeonTheme>('default')
const neonConfig = computed(() => NEON_THEMES[currentNeonTheme.value])

// Polygon generation variables
type Range = [number, number]
type Distribution =
  | 'full'
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | 'center'
  | 'topmost'

const currentSlideNo = ref(props.slideNumber || 1)
const distribution = ref<Distribution>('full')
const seed = ref('default')
const animationTime = ref(0)
const hue = ref(0)

// Watch for slide number changes
watch(() => props.slideNumber, (newVal) => {
  if (newVal) {
    currentSlideNo.value = newVal
  }
})

// Simple seeded random function
function seededRandom(seed: string) {
  let state = seed.split('').reduce((a, b) => {
    a = (a << 5) - a + b.charCodeAt(0)
    return a & a
  }, 0)
  
  return function () {
    state = (state * 1664525 + 1013904223) % 4294967296
    return Math.abs(state / 4294967296)
  }
}

// Distribution to limits conversion
function distributionToLimits(dist: Distribution) {
  const min = -0.2
  const max = 1.2
  let x: Range = [min, max]
  let y: Range = [min, max]
  
  function intersection(a: Range, b: Range): Range {
    return [Math.max(a[0], b[0]), Math.min(a[1], b[1])]
  }
  
  const limits = dist.split('-')
  
  for (const limit of limits) {
    switch (limit) {
      case 'topmost':
        y = intersection(y, [-0.5, 0])
        break
      case 'top':
        y = intersection(y, [min, 0.6])
        break
      case 'bottom':
        y = intersection(y, [0.4, max])
        break
      case 'left':
        x = intersection(x, [min, 0.6])
        break
      case 'right':
        x = intersection(x, [0.4, max])
        break
      case 'xcenter':
        x = intersection(x, [0.25, 0.75])
        break
      case 'ycenter':
        y = intersection(y, [0.25, 0.75])
        break
      case 'center':
        x = intersection(x, [0.25, 0.75])
        y = intersection(y, [0.25, 0.75])
        break
      case 'full':
        x = intersection(x, [0, 1])
        y = intersection(y, [0, 1])
        break
      default:
        break
    }
  }
  
  return { x, y }
}

function distance2([x1, y1]: Range, [x2, y2]: Range) {
  return (x2 - x1) ** 2 + (y2 - y1) ** 2
}

function usePoly(number = 16) {
  function getPoints(): Range[] {
    const limits = distributionToLimits(distribution.value)
    const rng = seededRandom(`${seed.value}-${currentSlideNo.value}`)
    const polyConfig = neonConfig.value.polygonConfig
    
    function randomBetween([a, b]: Range) {
      return rng() * (b - a) + a
    }
    
    function applyOverflow(random: number, overflow: number) {
      random = random * (1 + overflow * 2) - overflow
      return rng() < polyConfig.disturbChance 
        ? random + (rng() - 0.5) * polyConfig.disturb 
        : random
    }
    
    return Array.from({ length: number })
      .fill(0)
      .map(() => [
        applyOverflow(randomBetween(limits.x), polyConfig.overflow),
        applyOverflow(randomBetween(limits.y), polyConfig.overflow),
      ])
  }
  
  const points = ref(getPoints())
  const poly = computed(() =>
    points.value.map(([x, y]) => `${x * 100}% ${y * 100}%`).join(', ')
  )
  
  function jumpPoints() {
    const newPoints = new Set(getPoints())
    points.value = points.value.map((o) => {
      let minDistance = Number.POSITIVE_INFINITY
      let closest: Range | undefined
      for (const n of newPoints) {
        const d = distance2(o, n)
        if (d < minDistance) {
          minDistance = d
          closest = n
        }
      }
      if (closest) newPoints.delete(closest)
      return closest || o
    })
  }
  
  // Watch slide changes and update points
  watch(currentSlideNo, () => {
    jumpPoints()
  })
  
  return poly
}

// Create polygons for neon theme
const poly1 = usePoly(10)
const poly2 = usePoly(6)
const poly3 = usePoly(3)

// Watch for Neon theme changes and trigger polygon regeneration
watch(currentNeonTheme, (newTheme) => {
  console.log('Neon theme switched to:', newTheme)
  // Update seed to force polygon regeneration
  seed.value = `${newTheme}-${Date.now()}`
})

// Neon theme switching function
const switchNeonTheme = () => {
  currentNeonTheme.value = getNextNeonTheme(currentNeonTheme.value)
  console.log('Neon theme switched to:', currentNeonTheme.value)
}

// Animation loop
onMounted(() => {
  const animate = () => {
    animationTime.value += neonConfig.value.effects.animationSpeed
    const range = neonConfig.value.effects.hueRotationRange
    hue.value = 
      Math.sin(animationTime.value * 0.3) * (range * 0.7) +
      Math.cos(animationTime.value * 0.7) * (range * 0.3)
    requestAnimationFrame(animate)
  }
  animate()
})

// Expose methods and state
defineExpose({
  switchNeonTheme,
  currentNeonTheme,
})
</script>

<template>
  <div v-if="visible" class="neon-container">
    <!-- Background color layer -->
    <div class="neon-background" />
    
    <!-- Neon theme polygons -->
    <div 
      class="bg transform-gpu overflow-hidden pointer-events-none"
      :style="{ 
        filter: `blur(${neonConfig.effects.blurIntensity}px) hue-rotate(${hue}deg)`
      }"
      aria-hidden="true"
    >
      <div
        class="clip"
        :style="{
          'clip-path': `polygon(${poly1})`,
          background: `linear-gradient(to right, ${neonConfig.colors.layer1.from}, ${neonConfig.colors.layer1.to})`,
          opacity: neonConfig.effects.polygonOpacity[0],
        }"
      />
      <div
        class="clip"
        :style="{
          'clip-path': `polygon(${poly2})`,
          background: `linear-gradient(to left, ${neonConfig.colors.layer2.from}, ${neonConfig.colors.layer2.to})`,
          opacity: neonConfig.effects.polygonOpacity[1],
        }"
      />
      <div
        class="clip"
        :style="{
          'clip-path': `polygon(${poly3})`,
          background: `linear-gradient(to top, ${neonConfig.colors.layer3.from}, ${neonConfig.colors.layer3.to})`,
          opacity: neonConfig.effects.polygonOpacity[2],
        }"
      />
    </div>
  </div>
</template>

<style scoped>
.neon-container {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: -20;
}

.neon-background {
  position: absolute;
  inset: 0;
  background-color: #000000;
  z-index: -20;
}

.bg,
.clip {
  transition: all 2.5s ease;
}

.bg {
  position: absolute;
  inset: 0;
  z-index: -10;
}

.clip {
  clip-path: circle(75%);
  aspect-ratio: 16 / 9;
  position: absolute;
  inset: 0;
  transform-origin: center;
  will-change: transform, opacity;
}
</style>