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
const opacity = ref(0.4);
const hue = ref(0);
const seed = ref("default");

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

const poly1 = usePoly(10);
const poly2 = usePoly(6);
const poly3 = usePoly(3);

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

  // Initial update
  updateSlideNumber();

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
    :style="{ filter: `blur(70px) hue-rotate(${hue}deg)` }"
    aria-hidden="true"
  >
    <div
      class="clip bg-gradient-to-r from-[#c084fc] to-white/10"
      :style="{ 'clip-path': `polygon(${poly1})`, opacity: opacity }"
    />
    <div
      class="clip bg-gradient-to-l from-[#3b82f6] to-white/10"
      :style="{ 'clip-path': `polygon(${poly2})`, opacity: opacity }"
    />
    <div
      class="clip bg-gradient-to-t from-[#06b6d4] to-white/10"
      :style="{ 'clip-path': `polygon(${poly3})`, opacity: 0.2 }"
    />
  </div>
</template>

<style scoped>
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
}
</style>
