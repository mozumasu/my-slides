<script setup lang="ts">
import { ref, onMounted } from "vue";
import OceanBackground from "./OceanBackground.vue";
import NeonBackground from "./NeonBackground.vue";
import ThemeIndicator from "./ThemeIndicator.vue";

// Theme props
const props = defineProps<{
  theme?: "neon" | "ocean";
}>();

// State
const currentTheme = ref(props.theme || "ocean");
const currentSlideNo = ref(1);

// Component refs
const oceanRef = ref<InstanceType<typeof OceanBackground>>();
const neonRef = ref<InstanceType<typeof NeonBackground>>();

// Theme switching function
const toggleTheme = () => {
  currentTheme.value = currentTheme.value === "neon" ? "ocean" : "neon";
  console.log("Background theme switched to:", currentTheme.value);
};

// Get current theme variants
const getCurrentWaveTheme = () => oceanRef.value?.currentWaveTheme;
const getCurrentNeonTheme = () => neonRef.value?.currentNeonTheme;

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

  // Listen for keyboard shortcuts
  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === "t" || event.key === "T") {
      toggleTheme();
    } else if (event.key === "w" || event.key === "W") {
      if (currentTheme.value === "ocean" && oceanRef.value) {
        oceanRef.value.switchWaveTheme();
      }
    } else if (event.key === "n" || event.key === "N") {
      if (currentTheme.value === "neon" && neonRef.value) {
        neonRef.value.switchNeonTheme();
      }
    }
  };
  window.addEventListener("keydown", handleKeyPress);

  // Periodically check for changes (fallback)
  const interval = setInterval(updateSlideNumber, 500);

  // Cleanup
  return () => {
    window.removeEventListener("popstate", updateSlideNumber);
    window.removeEventListener("keydown", handleKeyPress);
    clearInterval(interval);
  };
});
</script>

<template>
  <!-- Ocean Background -->
  <OceanBackground ref="oceanRef" :visible="currentTheme === 'ocean'" />

  <!-- Neon Background -->
  <NeonBackground
    ref="neonRef"
    :visible="currentTheme === 'neon'"
    :slide-number="currentSlideNo"
  />

  <!-- Theme Indicator -->
  <ThemeIndicator
    :current-theme="currentTheme"
    :wave-theme="getCurrentWaveTheme()"
    :neon-theme="getCurrentNeonTheme()"
    @toggle-theme="toggleTheme"
  />
</template>

