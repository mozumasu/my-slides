<script setup lang="ts">
import { ref } from 'vue';
import SelfIntroduction from '../slides/SelfIntroduction.vue';

const currentTheme = ref<'neon' | 'ocean' | 'auto'>('auto');
const showAnimation = ref(true);
const compact = ref(false);

const themes = ['auto', 'neon', 'ocean'] as const;

const nextTheme = () => {
  const currentIndex = themes.indexOf(currentTheme.value);
  const nextIndex = (currentIndex + 1) % themes.length;
  currentTheme.value = themes[nextIndex];
};
</script>

<template>
  <div class="demo-container">
    <!-- Controls -->
    <div class="controls">
      <h2>Self Introduction Component Demo</h2>
      
      <div class="control-group">
        <label>
          Theme: 
          <select v-model="currentTheme">
            <option value="auto">Auto</option>
            <option value="neon">Neon</option>
            <option value="ocean">Ocean</option>
          </select>
        </label>
        
        <label>
          <input type="checkbox" v-model="showAnimation" />
          Show Animation
        </label>
        
        <label>
          <input type="checkbox" v-model="compact" />
          Compact Mode
        </label>
      </div>
      
      <button @click="nextTheme" class="theme-button">
        Switch Theme ({{ currentTheme }})
      </button>
    </div>

    <!-- Demo Component -->
    <div class="demo-area">
      <SelfIntroduction 
        :theme="currentTheme"
        :show-animation="showAnimation"
        :compact="compact"
        key="`${currentTheme}-${showAnimation}-${compact}`"
      />
    </div>
  </div>
</template>

<style scoped>
.demo-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  flex-direction: column;
}

.controls {
  background: rgba(255, 255, 255, 0.9);
  padding: 1rem;
  border-bottom: 1px solid #ddd;
  backdrop-filter: blur(10px);
}

.controls h2 {
  margin: 0 0 1rem 0;
  color: #333;
  font-size: 1.5rem;
}

.control-group {
  display: flex;
  gap: 2rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.control-group label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #666;
  font-weight: 500;
}

.control-group select {
  padding: 0.25rem 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: white;
}

.control-group input[type="checkbox"] {
  width: 1rem;
  height: 1rem;
}

.theme-button {
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.theme-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
}

.demo-area {
  flex: 1;
  position: relative;
  overflow: hidden;
}

/* Responsive */
@media (max-width: 768px) {
  .control-group {
    flex-direction: column;
    gap: 1rem;
  }
  
  .controls {
    padding: 0.75rem;
  }
  
  .controls h2 {
    font-size: 1.25rem;
  }
}
</style>