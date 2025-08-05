<script setup lang="ts">
import { ref, computed } from 'vue';

// Props for theme customization
interface Props {
  theme?: 'neon' | 'ocean' | 'auto';
  showAnimation?: boolean;
  compact?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  theme: 'auto',
  showAnimation: true,
  compact: false
});

// Profile data
const profile = {
  name: 'mozumasu',
  role: 'インフラエンジニア',
  tools: {
    terminal: 'wezterm',
    editor: 'Neovim',
    ime: 'SKK'
  },
  achievement: 'Software Design 6月号にweztermの記事を寄稿しました'
};

// Profile image path
const profileImage = '/images/profile_mozumasu.jpeg';

// Auto theme detection (based on current background theme)
const detectedTheme = ref<'neon' | 'ocean'>('ocean');

// Try to detect theme from global variables or DOM
const detectTheme = () => {
  // Check if we're in a neon theme environment
  if (typeof window !== 'undefined') {
    const body = document.body;
    const hasNeon = body.classList.contains('theme-neon') || 
                   getComputedStyle(body).backgroundColor.includes('0, 0, 0') ||
                   document.querySelector('[class*="neon"]');
    detectedTheme.value = hasNeon ? 'neon' : 'ocean';
  }
};

// Computed theme
const currentTheme = computed(() => {
  if (props.theme === 'auto') {
    return detectedTheme.value;
  }
  return props.theme;
});

// Animation delay for staggered entrance
const animationDelays = {
  name: '0.2s',
  role: '0.4s',
  tools: '0.6s',
  achievement: '0.8s'
};

// Mounted lifecycle
import { onMounted } from 'vue';
onMounted(() => {
  detectTheme();
});
</script>

<template>
  <div 
    :class="[
      'self-introduction',
      `theme-${currentTheme}`,
      { 'compact': compact, 'animated': showAnimation }
    ]"
  >
    <!-- Main Content -->
    <div class="content-section">
      <!-- Name -->
      <h1 
        class="name" 
        :style="{ animationDelay: animationDelays.name }"
      >
        {{ profile.name }}
      </h1>

      <!-- Role -->
      <p 
        class="role" 
        :style="{ animationDelay: animationDelays.role }"
      >
        {{ profile.role }}
      </p>

      <!-- Tools -->
      <div 
        class="tools-section" 
        :style="{ animationDelay: animationDelays.tools }"
      >
        <div class="tool-item">
          <span class="tool-label">ターミナル:</span>
          <span class="tool-value">{{ profile.tools.terminal }}</span>
        </div>
        <div class="tool-item">
          <span class="tool-label">エディタ:</span>
          <span class="tool-value">{{ profile.tools.editor }}</span>
        </div>
        <div class="tool-item">
          <span class="tool-label">IME:</span>
          <span class="tool-value">{{ profile.tools.ime }}</span>
        </div>
      </div>

      <!-- Achievement -->
      <div 
        class="achievement-section" 
        :style="{ animationDelay: animationDelays.achievement }"
      >
        <div class="achievement-badge">
          <span class="achievement-text">{{ profile.achievement }}</span>
        </div>
      </div>
    </div>

    <!-- Profile Avatar Section -->
    <div class="avatar-section" :style="{ animationDelay: '0s' }">
      <div class="avatar-frame">
        <div class="avatar-inner">
          <img :src="profileImage" alt="Profile" class="avatar-image" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Base Styles */
.self-introduction {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 3rem;
  margin: 2rem;
  position: relative;
  font-family: 'Inter', 'Hiragino Sans', 'Yu Gothic UI', sans-serif;
  gap: 4rem;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.self-introduction.compact {
  min-height: auto;
  padding: 1rem;
}

/* Animation Classes */
.animated .avatar-section,
.animated .name,
.animated .role,
.animated .tools-section,
.animated .achievement-section {
  opacity: 0;
  transform: translateY(30px);
  animation: slideInUp 0.8s ease-out forwards;
}

@keyframes slideInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Avatar Section */
.avatar-section {
  flex-shrink: 0;
}

.avatar-frame {
  width: 180px;
  height: 180px;
  border-radius: 50%;
  padding: 4px;
  background: linear-gradient(45deg, var(--accent-color), var(--secondary-color));
  position: relative;
}

.avatar-inner {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: var(--bg-color);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.avatar-text {
  font-size: 3rem;
  font-weight: bold;
  color: var(--accent-color);
  text-shadow: var(--text-glow);
}

.avatar-image {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

/* Content Section */
.content-section {
  text-align: left;
  max-width: 600px;
  flex: 1;
}

/* Name */
.name {
  font-size: 3.5rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
  color: var(--primary-text);
  text-shadow: var(--text-glow);
  position: relative;
}

/* Role */
.role {
  font-size: 1.5rem;
  color: var(--secondary-text);
  margin: 0 0 2.5rem 0;
  font-weight: 500;
}

/* Tools Section */
.tools-section {
  margin-bottom: 2.5rem;
}

.tool-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
  padding: 0.75rem 1.5rem;
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.tool-item:hover {
  transform: translateY(-2px);
  box-shadow: var(--card-shadow);
}

.tool-label {
  color: var(--secondary-text);
  font-weight: 500;
}

.tool-value {
  color: var(--accent-color);
  font-weight: 600;
  font-family: 'Fira Code', monospace;
  text-shadow: var(--text-glow);
}

/* Achievement Section */
.achievement-section {
  margin-top: 1rem;
}

.achievement-badge {
  display: inline-block;
  padding: 1rem 2rem;
  background: var(--achievement-bg);
  border: 2px solid var(--accent-color);
  border-radius: 25px;
  position: relative;
  overflow: hidden;
}

.achievement-badge::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, var(--accent-color-alpha), transparent);
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% { left: -100%; }
  100% { left: 100%; }
}

.achievement-text {
  color: var(--primary-text);
  font-weight: 600;
  position: relative;
  z-index: 1;
}

/* Neon Theme */
.theme-neon {
  --bg-color: rgba(0, 0, 0, 0.3);
  --primary-text: #00ff41;
  --secondary-text: #00cc33;
  --accent-color: #00ff41;
  --secondary-color: #39ff14;
  --card-bg: rgba(0, 255, 65, 0.05);
  --border-color: rgba(0, 255, 65, 0.3);
  --achievement-bg: rgba(0, 255, 65, 0.1);
  --accent-color-alpha: rgba(0, 255, 65, 0.3);
  --text-glow: 0 0 10px #00ff41, 0 0 20px #00ff41, 0 0 40px #00ff41;
  --card-shadow: 0 8px 32px rgba(0, 255, 65, 0.3);
  
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.theme-neon .avatar-frame {
  box-shadow: 0 0 30px #00ff41, inset 0 0 30px rgba(0, 255, 65, 0.2);
}

.theme-neon .name::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 2px;
  background: linear-gradient(90deg, transparent, #00ff41, transparent);
  box-shadow: 0 0 10px #00ff41;
}

/* Ocean Theme */
.theme-ocean {
  --bg-color: rgba(240, 248, 255, 0.3);
  --primary-text: #1e40af;
  --secondary-text: #0ea5e9;
  --accent-color: #0ea5e9;
  --secondary-color: #38bdf8;
  --card-bg: rgba(14, 165, 233, 0.05);
  --border-color: rgba(14, 165, 233, 0.2);
  --achievement-bg: rgba(14, 165, 233, 0.1);
  --accent-color-alpha: rgba(14, 165, 233, 0.3);
  --text-glow: 0 0 10px rgba(14, 165, 233, 0.5);
  --card-shadow: 0 8px 32px rgba(14, 165, 233, 0.2);
  
  background: rgba(224, 242, 254, 0.2);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.theme-ocean .avatar-frame {
  box-shadow: 0 0 20px rgba(14, 165, 233, 0.4), inset 0 0 20px rgba(14, 165, 233, 0.1);
}

.theme-ocean .name::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 2px;
  background: linear-gradient(90deg, transparent, #0ea5e9, transparent);
  box-shadow: 0 0 5px rgba(14, 165, 233, 0.5);
}

/* Responsive Design */
@media (max-width: 768px) {
  .self-introduction {
    flex-direction: column;
    padding: 1rem;
    gap: 2rem;
  }

  .content-section {
    text-align: center;
  }
  
  .name {
    font-size: 2.5rem;
  }
  
  .role {
    font-size: 1.25rem;
  }
  
  .avatar-frame {
    width: 120px;
    height: 120px;
  }
  
  .avatar-text {
    font-size: 2rem;
  }
  
  .tool-item {
    flex-direction: column;
    text-align: center;
    gap: 0.25rem;
  }
  
  .achievement-badge {
    padding: 0.75rem 1.5rem;
  }
}

/* Compact Mode */
.compact {
  gap: 2rem;
}

.compact .avatar-frame {
  width: 120px;
  height: 120px;
}

.compact .avatar-text {
  font-size: 2rem;
}

.compact .name {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.compact .role {
  font-size: 1.25rem;
  margin-bottom: 1.5rem;
}

.compact .tools-section {
  margin-bottom: 1.5rem;
}

.compact .tool-item {
  padding: 0.5rem 1rem;
  margin-bottom: 0.5rem;
}
</style>