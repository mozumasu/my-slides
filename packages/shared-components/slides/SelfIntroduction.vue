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
  role: '0s',
  tools: '0.2s',
  achievement: '0.4s'
};

// Mounted lifecycle
import { onMounted } from 'vue';
onMounted(() => {
  detectTheme();
});
</script>

<template>
  <div :class="['profile-container', `container-theme-${currentTheme}`]">
    <!-- Profile Title Outside Card -->
    <h1 class="profile-title-outside" :style="{ animationDelay: '0s' }">Profile</h1>
    
    <!-- Card -->
    <div 
      :class="[
        'self-introduction',
        `theme-${currentTheme}`,
        { 'compact': compact, 'animated': showAnimation }
      ]"
    >
      <!-- Main Content -->
      <div class="content-section">
      <!-- Role -->
      <div class="role-section" :style="{ animationDelay: animationDelays.role }">
        <h3 class="section-title">ROLE</h3>
        <div class="role-content">
          <span class="role-icon">💻</span>
          <span class="role-text">{{ profile.role }}</span>
        </div>
      </div>

      <!-- Tools -->
      <div 
        class="tools-section" 
        :style="{ animationDelay: animationDelays.tools }"
      >
        <h3 class="section-title">MY DEV SETUP</h3>
        <div class="tools-badges">
          <div class="tool-badge">
            <img src="https://wezterm.org/favicon.svg" alt="wezterm" class="tool-logo" />
            <span class="tool-name">{{ profile.tools.terminal }}</span>
          </div>
          <div class="tool-badge">
            <img src="https://avatars.githubusercontent.com/u/6471485?s=200&v=4" alt="neovim" class="tool-logo" />
            <span class="tool-name">{{ profile.tools.editor }}</span>
          </div>
          <div class="tool-badge">
            <span class="tool-emoji">⌨️</span>
            <span class="tool-name">{{ profile.tools.ime }}</span>
          </div>
        </div>
      </div>

      <!-- Achievement -->
      <div 
        class="achievement-section" 
        :style="{ animationDelay: animationDelays.achievement }"
      >
        <div class="achievement-badge">
          <span class="achievement-icon">📚</span>
          <div class="achievement-content">
            <span class="achievement-label">Recent Achievement</span>
            <span class="achievement-text">{{ profile.achievement }}</span>
          </div>
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
      <div class="avatar-name">mozumasu</div>
    </div>
  </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Outfit:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap');

/* Container */
.profile-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  gap: 1.5rem;
}

/* Profile Title Outside Card */
.profile-title-outside {
  font-size: 2.5rem;
  font-weight: 800;
  font-family: 'Space Grotesk', 'Outfit', sans-serif;
  color: #ffffff;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  margin: 0;
  opacity: 0;
  animation: fadeInUp 0.8s ease-out forwards;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(-10px);
  }
}

/* Base Styles */
.self-introduction {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 340px;
  padding: 2rem 3rem;
  margin: 0;
  width: 85%;
  max-width: 880px;
  position: relative;
  font-family: 'Outfit', 'Inter', 'Hiragino Sans', sans-serif;
  gap: 3rem;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.1),
    inset 0 0 0 1px rgba(255, 255, 255, 0.1);
  box-sizing: border-box;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.self-introduction:hover {
  transform: translateY(-4px);
  box-shadow: 
    0 16px 48px rgba(0, 0, 0, 0.12),
    inset 0 0 0 1px rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.25);
}


.self-introduction.compact {
  min-height: auto;
  padding: 1rem;
}

/* Animation Classes */
.animated .avatar-section,
.animated .role-section,
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
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
}

.avatar-frame {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  position: relative;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.avatar-frame:hover {
  transform: scale(1.05);
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
  font-weight: 700;
  font-family: 'Space Grotesk', 'Outfit', sans-serif;
  color: var(--accent-color);
  letter-spacing: -0.02em;
  text-shadow: var(--text-glow);
}

.avatar-image {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.avatar-name {
  font-size: 1.3rem;
  font-weight: 700;
  font-family: 'Space Grotesk', 'Outfit', sans-serif;
  color: var(--primary-text);
  letter-spacing: 0.02em;
  line-height: 1;
  opacity: 0.9;
  margin-top: 0.25rem;
}

/* Content Section */
.content-section {
  text-align: left;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

/* Role Section */
.role-section {
  padding: 0.5rem 0;
  transition: all 0.3s ease;
}

.role-content {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  font-weight: 600;
  font-family: 'Outfit', 'Inter', sans-serif;
  color: var(--primary-text);
}

.role-icon {
  font-size: 1rem;
  filter: grayscale(0%);
}

.role-text {
  font-family: 'JetBrains Mono', 'Fira Code', 'SF Mono', monospace;
  letter-spacing: -0.02em;
}

/* Tools Section */
.tools-section {
  padding: 0.5rem 0;
  transition: all 0.3s ease;
}

.section-title {
  font-size: 0.65rem;
  font-family: 'Outfit', sans-serif;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--accent-color);
  opacity: 0.7;
  margin: 0 0 0.75rem 0;
}

.tools-badges {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.tool-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.9rem;
  background: linear-gradient(145deg, 
    rgba(255, 255, 255, 0.15) 0%, 
    rgba(255, 255, 255, 0.05) 20%,
    rgba(255, 255, 255, 0.02) 40%,
    rgba(255, 255, 255, 0.05) 60%,
    rgba(255, 255, 255, 0.15) 100%);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  box-shadow: 
    inset 0 1px 1px rgba(255, 255, 255, 0.3),
    inset 0 -1px 1px rgba(0, 0, 0, 0.1),
    0 2px 4px rgba(0, 0, 0, 0.1);
}

.tool-badge::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, 
    transparent 0%, 
    rgba(255, 255, 255, 0.3) 50%, 
    transparent 100%);
  transition: left 0.5s ease;
}

.tool-badge:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 
    inset 0 1px 2px rgba(255, 255, 255, 0.4),
    inset 0 -1px 2px rgba(0, 0, 0, 0.15),
    0 4px 8px rgba(0, 0, 0, 0.15);
}

.tool-badge:hover::before {
  left: 100%;
}


.tool-logo {
  width: 1rem;
  height: 1rem;
  object-fit: contain;
  border-radius: 4px;
}

.tool-emoji {
  font-size: 1rem;
  filter: grayscale(0%);
}

.tool-name {
  color: var(--primary-text);
  font-weight: 600;
  font-family: 'JetBrains Mono', 'Fira Code', 'SF Mono', monospace;
  font-size: 0.75rem;
  letter-spacing: -0.02em;
}

/* Achievement Section */
.achievement-section {
  margin-top: 0;
}

.achievement-badge {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.25rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
}

.achievement-badge:hover {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.08);
}


.achievement-icon {
  font-size: 1.5rem;
  filter: grayscale(0%);
  flex-shrink: 0;
}

.achievement-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.achievement-label {
  font-size: 0.6rem;
  font-family: 'Outfit', sans-serif;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--secondary-text);
  opacity: 0.8;
}

.achievement-text {
  color: var(--primary-text);
  font-weight: 500;
  font-family: 'Outfit', 'Inter', sans-serif;
  position: relative;
  z-index: 1;
  font-size: 0.75rem;
  letter-spacing: 0.01em;
  line-height: 1.3;
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
  backdrop-filter: blur(24px) saturate(150%);
  -webkit-backdrop-filter: blur(24px) saturate(150%);
  border: 1px solid rgba(0, 255, 65, 0.2);
  box-shadow: 
    0 0 40px rgba(0, 255, 65, 0.05),
    inset 0 0 0 1px rgba(0, 255, 65, 0.1);
}

.theme-neon .tool-badge {
  background: linear-gradient(145deg, 
    rgba(0, 255, 65, 0.25) 0%, 
    rgba(0, 255, 65, 0.08) 20%,
    rgba(0, 0, 0, 0.3) 40%,
    rgba(0, 255, 65, 0.08) 60%,
    rgba(0, 255, 65, 0.25) 100%);
  border: 1px solid rgba(0, 255, 65, 0.4);
  box-shadow: 
    inset 0 1px 1px rgba(0, 255, 65, 0.5),
    inset 0 -1px 1px rgba(0, 0, 0, 0.5),
    0 2px 8px rgba(0, 255, 65, 0.3);
}

.theme-neon .tool-badge::before {
  background: linear-gradient(90deg, 
    transparent 0%, 
    rgba(0, 255, 65, 0.6) 50%, 
    transparent 100%);
}

.theme-neon .tool-badge:hover {
  box-shadow: 
    inset 0 1px 2px rgba(0, 255, 65, 0.6),
    inset 0 -1px 2px rgba(0, 0, 0, 0.6),
    0 4px 12px rgba(0, 255, 65, 0.4);
}

.theme-neon .achievement-badge {
  background: rgba(0, 255, 65, 0.04);
}




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
  
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(24px) saturate(200%);
  -webkit-backdrop-filter: blur(24px) saturate(200%);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.05),
    inset 0 0 0 1px rgba(255, 255, 255, 0.2);
}


.theme-ocean .tool-badge {
  background: linear-gradient(145deg, 
    rgba(59, 130, 246, 0.2) 0%, 
    rgba(147, 197, 253, 0.1) 20%,
    rgba(219, 234, 254, 0.05) 40%,
    rgba(147, 197, 253, 0.1) 60%,
    rgba(59, 130, 246, 0.2) 100%);
  border: 1px solid rgba(147, 197, 253, 0.3);
  box-shadow: 
    inset 0 1px 1px rgba(255, 255, 255, 0.5),
    inset 0 -1px 1px rgba(59, 130, 246, 0.2),
    0 2px 6px rgba(59, 130, 246, 0.1);
}

.theme-ocean .tool-badge::before {
  background: linear-gradient(90deg, 
    transparent 0%, 
    rgba(147, 197, 253, 0.5) 50%, 
    transparent 100%);
}

.theme-ocean .tool-badge:hover {
  box-shadow: 
    inset 0 1px 2px rgba(255, 255, 255, 0.6),
    inset 0 -1px 2px rgba(59, 130, 246, 0.3),
    0 4px 10px rgba(59, 130, 246, 0.15);
}

.theme-ocean .achievement-badge {
  background: rgba(255, 255, 255, 0.06);
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
    padding-top: 3rem;
  }
  
  .profile-title {
    font-size: 1.75rem;
    margin-bottom: 2rem;
  }
  
  .role-content {
    font-size: 1.25rem;
  }
  
  .role-icon {
    font-size: 1.5rem;
  }
  
  .tool-badge {
    padding: 0.5rem 1rem;
    gap: 0.5rem;
  }
  
  .tool-logo {
    width: 1.25rem;
    height: 1.25rem;
  }
  
  .tool-emoji {
    font-size: 1.25rem;
  }
  
  .tool-name {
    font-size: 0.85rem;
  }
  
  .tools-badges {
    gap: 0.5rem;
  }
  
  .achievement-icon {
    font-size: 2rem;
  }
  
  .avatar-frame {
    width: 120px;
    height: 120px;
  }
  
  .avatar-text {
    font-size: 2rem;
  }
  
  .achievement-badge {
    padding: 0.75rem 1.5rem;
  }
}

/* Compact Mode */
.compact {
  gap: 2rem;
}

.compact .content-section {
  padding-top: 2rem;
}

.compact .avatar-frame {
  width: 120px;
  height: 120px;
}

.compact .avatar-text {
  font-size: 2rem;
}

.compact .profile-title {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
}

.compact .role-section {
  margin-bottom: 1.5rem;
}

.compact .role-content {
  font-size: 1.1rem;
}

.compact .role-icon {
  font-size: 1.25rem;
}

.compact .tools-section {
  margin-bottom: 1.5rem;
}

.compact .tool-badge {
  padding: 0.4rem 0.8rem;
  gap: 0.4rem;
}

.compact .tool-logo {
  width: 1rem;
  height: 1rem;
}

.compact .tool-emoji {
  font-size: 1rem;
}

.compact .tool-name {
  font-size: 0.75rem;
}
</style>