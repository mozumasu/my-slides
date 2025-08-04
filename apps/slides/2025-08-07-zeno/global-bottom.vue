<script setup lang="ts">
import { computed, ref, watch, onMounted } from "vue";

// Simple seeded random function (fallback for seedrandom)
function seededRandom(seed: string) {
  let state = seed.split("").reduce((a, b) => {
    a = (a << 5) - a + b.charCodeAt(0);
    return a & a;
  }, 0);

  return function () {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return Math.abs(state / 4294967296);
  };
}

type Range = [number, number];
type Distribution =
  | "full"
  | "top"
  | "bottom"
  | "left"
  | "right"
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "center";

const currentSlideNo = ref(1);
const distribution = ref<Distribution>("full");
const baseOpacity = 0.08;
const opacity = computed(() => baseOpacity + Math.sin(animationTime.value * 0.3) * 0.1);
const hue = ref(0);
const seed = ref("default");
const animationTime = ref(0);

const overflow = 0.3;
const disturb = 0.3;
const disturbChance = 0.3;

function distributionToLimits(dist: Distribution) {
  const min = -0.2;
  const max = 1.2;
  let x: Range = [min, max];
  let y: Range = [min, max];

  function intersection(a: Range, b: Range): Range {
    return [Math.max(a[0], b[0]), Math.min(a[1], b[1])];
  }

  const limits = dist.split("-");

  for (const limit of limits) {
    switch (limit) {
      case "top":
        y = intersection(y, [min, 0.6]);
        break;
      case "bottom":
        y = intersection(y, [0.4, max]);
        break;
      case "left":
        x = intersection(x, [min, 0.6]);
        break;
      case "right":
        x = intersection(x, [0.4, max]);
        break;
      case "center":
        x = intersection(x, [0.25, 0.75]);
        y = intersection(y, [0.25, 0.75]);
        break;
      case "full":
        x = intersection(x, [0, 1]);
        y = intersection(y, [0, 1]);
        break;
    }
  }

  return { x, y };
}

function distance2([x1, y1]: Range, [x2, y2]: Range) {
  return (x2 - x1) ** 2 + (y2 - y1) ** 2;
}

function usePoly(number = 16) {
  function getPoints(): Range[] {
    const limits = distributionToLimits(distribution.value);
    const rng = seededRandom(`${seed.value}-${currentSlideNo.value}`);

    function randomBetween([a, b]: Range) {
      return rng() * (b - a) + a;
    }

    function applyOverflow(random: number, overflow: number) {
      random = random * (1 + overflow * 2) - overflow;
      return rng() < disturbChance ? random + (rng() - 0.5) * disturb : random;
    }

    return Array.from({ length: number })
      .fill(0)
      .map(() => [
        applyOverflow(randomBetween(limits.x), overflow),
        applyOverflow(randomBetween(limits.y), overflow),
      ]);
  }

  const points = ref(getPoints());
  const poly = computed(() =>
    points.value.map(([x, y]) => `${x * 100}% ${y * 100}%`).join(", "),
  );

  function jumpPoints() {
    const newPoints = new Set(getPoints());
    points.value = points.value.map((o) => {
      let minDistance = Number.POSITIVE_INFINITY;
      let closest: Range | undefined;
      for (const n of newPoints) {
        const d = distance2(o, n);
        if (d < minDistance) {
          minDistance = d;
          closest = n;
        }
      }
      if (closest) newPoints.delete(closest);
      return closest || o;
    });
  }

  // Update on slide change simulation
  watch(currentSlideNo, () => {
    jumpPoints();
  });

  return poly;
}

const poly1 = usePoly(12);
const poly2 = usePoly(8);
const poly3 = usePoly(5);
const poly4 = usePoly(3);

onMounted(() => {
  // Update slide number based on URL
  const updateSlideNumber = () => {
    const path = window.location.pathname;
    const match = path.match(/\/(\d+)$/);
    if (match) {
      currentSlideNo.value = parseInt(match[1]);
    } else {
      currentSlideNo.value = 1;
    }
  };

  // Animation loop
  const animate = () => {
    animationTime.value += 0.02;
    hue.value = Math.sin(animationTime.value * 0.3) * 40 + Math.cos(animationTime.value * 0.7) * 15;
    requestAnimationFrame(animate);
  };

  // Initial update
  updateSlideNumber();
  animate();

  // Listen for popstate events (navigation)
  window.addEventListener("popstate", updateSlideNumber);

  // Periodically check for changes (fallback)
  const interval = setInterval(updateSlideNumber, 500);

  // Cleanup
  return () => {
    window.removeEventListener("popstate", updateSlideNumber);
    clearInterval(interval);
  };
});
</script>

<template>
  <div
    class="bg transform-gpu overflow-hidden pointer-events-none"
    :style="{ 
      filter: `blur(80px) hue-rotate(${hue}deg)`,
      transform: `scale(${1 + Math.sin(animationTime * 0.4) * 0.08}) rotate(${Math.cos(animationTime * 0.1) * 0.5}deg)`
    }"
    aria-hidden="true"
  >
    <div
      class="clip bg-gradient-to-r from-[#8b5cf6] to-violet-500/20"
      :style="{ 
        'clip-path': `polygon(${poly1})`, 
        opacity: opacity * (0.8 + Math.sin(animationTime * 1.2) * 0.4),
        transform: `translate(${Math.sin(animationTime * 0.6) * 20}px, ${Math.cos(animationTime * 0.4) * 15}px) scale(${1 + Math.sin(animationTime * 0.8) * 0.15})`
      }"
    />
    <div
      class="clip bg-gradient-to-l from-[#a855f7] to-purple-500/20"
      :style="{ 
        'clip-path': `polygon(${poly2})`, 
        opacity: opacity * (0.7 + Math.cos(animationTime * 1.5) * 0.5),
        transform: `translate(${Math.cos(animationTime * 0.5) * -25}px, ${Math.sin(animationTime * 0.7) * 20}px) scale(${1 + Math.cos(animationTime * 1.1) * 0.2})`
      }"
    />
    <div
      class="clip bg-gradient-to-t from-[#7c3aed] to-violet-600/20"
      :style="{ 
        'clip-path': `polygon(${poly3})`, 
        opacity: 0.15 + Math.sin(animationTime * 2.0) * 0.25,
        transform: `translate(${Math.sin(animationTime * 0.3) * 30}px, ${Math.cos(animationTime * 0.6) * -10}px) scale(${1 + Math.sin(animationTime * 1.3) * 0.25})`
      }"
    />
    <div
      class="clip bg-gradient-to-br from-[#06b6d4] to-cyan-500/20"
      :style="{ 
        'clip-path': `polygon(${poly4})`, 
        opacity: 0.1 + Math.cos(animationTime * 1.8) * 0.2,
        transform: `translate(${Math.cos(animationTime * 0.4) * -15}px, ${Math.sin(animationTime * 0.5) * 25}px) scale(${1 + Math.cos(animationTime * 1.5) * 0.3})`
      }"
    />
  </div>
</template>

<style scoped>
.bg,
.clip {
  transition: clip-path 2.5s ease;
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
