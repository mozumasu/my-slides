<script setup lang="ts">
import { computed, ref, watch, onMounted, onUnmounted } from "vue";
import * as THREE from 'three';

// Theme props
const props = defineProps<{
  theme?: 'neon' | 'ocean'
}>()

const currentTheme = ref(props.theme || 'ocean');

// Theme switching function
const toggleTheme = () => {
  currentTheme.value = currentTheme.value === 'neon' ? 'ocean' : 'neon'
  console.log('Background theme switched to:', currentTheme.value)
}


const hue = ref(0);

// Theme-based color schemes
const colorSchemes = computed(() => {
  if (currentTheme.value === 'ocean') {
    return {
      layer1: { from: '#006994', to: '#4682B4' },      // Deep ocean blue
      layer2: { from: '#20B2AA', to: '#48D1CC' },      // Light sea green  
      layer3: { from: '#00CED1', to: '#40E0D0' },      // Dark turquoise
      layer4: { from: '#7FFFD4', to: '#66CDAA' },      // Aquamarine
      ocean1: { from: '#50C878', to: '#00C957' },      // Emerald green
      ocean2: { from: '#87CEEB', to: '#B0E0E6' },      // Sky blue
      ocean3: { from: '#00BFFF', to: '#1E90FF' },      // Deep sky blue
    }
  } else {
    // Neon theme (original)
    return {
      layer1: { from: '#8b5cf6', to: 'violet-500/20' },
      layer2: { from: '#a855f7', to: 'purple-500/20' },
      layer3: { from: '#7c3aed', to: 'violet-600/20' },
      layer4: { from: '#06b6d4', to: 'cyan-500/20' },
      ocean1: { from: '#20B2AA', to: '#40E0D0' },
      ocean2: { from: '#00CED1', to: '#48D1CC' },
      ocean3: { from: '#00BFFF', to: '#87CEEB' },
    }
  }
});
const animationTime = ref(0);

// Three.js water surface
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let renderer: THREE.WebGLRenderer;
let waterMesh: THREE.Mesh;
let animationId: number;

// Water shader material
const waterVertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  varying vec3 vNormal;
  uniform float uTime;
  uniform float uWaveStrength;
  
  // Enhanced wave function for more realistic ocean waves
  float wave(vec2 pos, vec2 direction, float frequency, float amplitude, float speed, float time) {
    float phase = dot(pos, direction) * frequency + time * speed;
    return sin(phase) * amplitude;
  }
  
  // Gerstner wave for more realistic ocean movement
  vec3 gerstnerWave(vec2 pos, vec2 direction, float frequency, float amplitude, float speed, float time) {
    float phase = dot(pos, direction) * frequency + time * speed;
    float steepness = 0.3; // Controls wave sharpness
    
    float x = steepness * amplitude * direction.x * cos(phase);
    float y = steepness * amplitude * direction.y * cos(phase);
    float z = amplitude * sin(phase);
    
    return vec3(x, y, z);
  }
  
  void main() {
    vUv = uv;
    vec3 pos = position;
    vec2 worldPos = pos.xy;
    
    // Large ocean swells - multiple directional waves
    vec3 swell1 = gerstnerWave(worldPos, normalize(vec2(1.0, 0.3)), 0.3, 0.08, 0.8, uTime);
    vec3 swell2 = gerstnerWave(worldPos, normalize(vec2(0.7, 1.0)), 0.25, 0.06, 0.6, uTime * 1.1);
    vec3 swell3 = gerstnerWave(worldPos, normalize(vec2(-0.5, 0.8)), 0.4, 0.05, 0.9, uTime * 0.9);
    
    // Medium waves for more detail
    vec3 wave1 = gerstnerWave(worldPos, normalize(vec2(0.8, 0.6)), 1.2, 0.03, 1.5, uTime * 1.3);
    vec3 wave2 = gerstnerWave(worldPos, normalize(vec2(-0.6, 0.8)), 1.5, 0.025, 1.8, uTime * 1.1);
    vec3 wave3 = gerstnerWave(worldPos, normalize(vec2(0.4, -0.9)), 1.8, 0.02, 2.0, uTime * 1.4);
    
    // Gentler surface ripples for smoothness
    float ripple1 = wave(worldPos, normalize(vec2(1.0, 0.0)), 5.0, 0.006, 2.5, uTime);
    float ripple2 = wave(worldPos, normalize(vec2(0.0, 1.0)), 6.0, 0.004, 2.8, uTime);
    float ripple3 = wave(worldPos, normalize(vec2(0.7, 0.7)), 7.0, 0.003, 3.2, uTime);
    
    // Combine all wave components
    vec3 waveOffset = (swell1 + swell2 + swell3 + wave1 + wave2 + wave3) * uWaveStrength;
    waveOffset.z += (ripple1 + ripple2 + ripple3) * uWaveStrength;
    
    pos += waveOffset;
    vPosition = pos;
    
    // Calculate accurate normals for realistic lighting
    float delta = 0.01;
    
    // Sample neighboring points for normal calculation
    vec3 pos1 = position + vec3(delta, 0.0, 0.0);
    vec3 pos2 = position + vec3(0.0, delta, 0.0);
    
    // Calculate wave offsets for neighboring points
    vec3 wave1_1 = (gerstnerWave(pos1.xy, normalize(vec2(1.0, 0.3)), 0.3, 0.08, 0.8, uTime) +
                   gerstnerWave(pos1.xy, normalize(vec2(0.7, 1.0)), 0.25, 0.06, 0.6, uTime * 1.1) +
                   gerstnerWave(pos1.xy, normalize(vec2(-0.5, 0.8)), 0.4, 0.05, 0.9, uTime * 0.9)) * uWaveStrength;
    
    vec3 wave2_1 = (gerstnerWave(pos2.xy, normalize(vec2(1.0, 0.3)), 0.3, 0.08, 0.8, uTime) +
                   gerstnerWave(pos2.xy, normalize(vec2(0.7, 1.0)), 0.25, 0.06, 0.6, uTime * 1.1) +
                   gerstnerWave(pos2.xy, normalize(vec2(-0.5, 0.8)), 0.4, 0.05, 0.9, uTime * 0.9)) * uWaveStrength;
    
    pos1 += wave1_1;
    pos2 += wave2_1;
    
    // Calculate tangent vectors
    vec3 tangent = normalize(pos1 - pos);
    vec3 bitangent = normalize(pos2 - pos);
    
    // Calculate normal
    vNormal = normalize(cross(tangent, bitangent));
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const waterFragmentShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  varying vec3 vNormal;
  uniform float uTime;
  uniform vec3 uShallowColor;
  uniform vec3 uDeepColor;
  uniform vec3 uMidColor;
  uniform vec3 uCausticsColor;
  uniform vec3 uSandColor;
  uniform float uOpacity;
  
  // High-quality smooth noise function with proper interpolation
  float smoothNoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    
    // Smooth interpolation function (quintic for ultra-smooth transitions)
    f = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
    
    // Sample corners of grid cell
    float a = sin(dot(i, vec2(12.9898, 78.233))) * 43758.5453;
    float b = sin(dot(i + vec2(1.0, 0.0), vec2(12.9898, 78.233))) * 43758.5453;
    float c = sin(dot(i + vec2(0.0, 1.0), vec2(12.9898, 78.233))) * 43758.5453;
    float d = sin(dot(i + vec2(1.0, 1.0), vec2(12.9898, 78.233))) * 43758.5453;
    
    // Smooth interpolation
    return mix(mix(fract(a), fract(b), f.x), mix(fract(c), fract(d), f.x), f.y);
  }
  
  // Enhanced caustics pattern with ultra-smooth interpolation
  float caustics(vec2 uv, float time) {
    vec2 p = uv * 2.5; // Further reduced frequency for ultra-smooth pattern
    float c = 0.0;
    
    // Multiple layers of caustics with smoother transitions
    for(int i = 0; i < 4; i++) { // Reduced iterations for smoother performance
      float scale = pow(1.4, float(i)); // Even smaller scaling factor
      vec2 offset = vec2(time * 0.03, time * 0.02) * scale; // Much slower for ultra-smooth movement
      
      vec2 q = p * scale + offset;
      // Ultra-smooth caustics using improved noise
      float layer = smoothNoise(q + time * 0.1) * 0.8 + smoothNoise(q * 2.0 + time * 0.05) * 0.2;
      layer = smoothstep(0.2, 0.8, layer); // Gentle contrast for smoothness
      c += layer / (scale * 0.8); // Reduced influence for smoother blending
    }
    
    // Ultra-smooth caustics with very gradual falloff
    c = c * 0.2 + 0.8; // Higher base value, lower variation
    return smoothstep(0.3, 0.9, c); // Gentler transition range
  }
  
  // Ultra-smooth sand pattern on the bottom
  float sandPattern(vec2 uv) {
    vec2 p = uv * 8.0; // Much reduced frequency for ultra-smooth sand
    float sand = 0.0;
    
    // Multiple ultra-smooth noise layers for sand texture
    for(int i = 0; i < 3; i++) { // Fewer layers for smoother result
      float scale = pow(1.3, float(i)); // Very gentle scaling
      vec2 q = p * scale;
      float layer = smoothNoise(q); // Use our improved smooth noise
      sand += layer / (scale * 1.2); // Reduced influence
    }
    
    // Apply gentle smoothstep for ultra-gradual transitions
    return smoothstep(0.4, 0.6, sand * 0.3 + 0.7); // Very gentle variation
  }
  
  void main() {
    // Calculate water depth with enhanced variation for more contrast
    float waveHeight = vPosition.z;
    float depth = 1.0 - abs(waveHeight) * 8.0; // Increased multiplier for more contrast
    depth = clamp(depth, 0.0, 1.0);
    
    // Enhanced wave height-based lighting for stronger 3D effect
    float waveShading = waveHeight * 4.0; // Stronger amplitude for more contrast
    float lightIntensity = 1.0 + waveShading * 0.6; // Brighter peaks
    float shadowIntensity = 1.0 - abs(waveShading) * 0.4; // Darker valleys
    
    // Sand bottom color with texture
    float sandNoise = sandPattern(vUv);
    vec3 sandBottom = mix(uSandColor * 0.8, uSandColor * 1.2, sandNoise);
    
    // Enhanced water color with three-tier depth system
    vec3 waterColor;
    if (depth > 0.7) {
      // Shallow water - bright turquoise
      waterColor = mix(uMidColor, uShallowColor, (depth - 0.7) / 0.3);
    } else if (depth > 0.3) {
      // Medium depth - blue
      waterColor = mix(uDeepColor, uMidColor, (depth - 0.3) / 0.4);
    } else {
      // Deep water - dark blue with enhanced darkness
      vec3 veryDeepColor = uDeepColor * 0.6; // Even darker for deep areas
      waterColor = mix(veryDeepColor, uDeepColor, depth / 0.3);
    }
    
    // Apply stronger height-based lighting
    waterColor *= lightIntensity;
    
    // Enhanced contrast for wave shadows
    if (waveHeight < -0.02) {
      waterColor *= 0.7; // Darken wave valleys more
    } else if (waveHeight > 0.02) {
      waterColor *= 1.3; // Brighten wave peaks more
    }
    
    // Blend sand and water with enhanced transparency variation
    float transparency = 0.5 + depth * 0.5; // More dramatic transparency changes
    vec3 color = mix(sandBottom, waterColor, transparency);
    
    // Enhanced caustics effect with stronger wave interaction
    float causticsPattern = caustics(vUv, uTime);
    causticsPattern = pow(causticsPattern, 0.8); // Slightly softer for smoothness
    
    // Stronger caustics affected by wave height and depth
    float causticsStrength = (0.6 + waveHeight * 0.8) * (1.0 - depth * 0.3); // Stronger on peaks, weaker in deep areas
    vec3 causticsEffect = uCausticsColor * causticsPattern * causticsStrength;
    color = mix(color, color + causticsEffect, 0.7); // More visible caustics
    
    // Enhanced Fresnel effect based on normal
    vec3 viewDirection = normalize(vec3(0.0, 1.0, 1.0)); // Viewing from above
    float fresnel = 1.0 - max(0.0, dot(vNormal, viewDirection));
    fresnel = pow(fresnel, 1.5); // More dramatic fresnel
    
    // Strong reflection on wave crests
    color += vec3(0.3, 0.5, 0.7) * fresnel * 0.6;
    
    // Ultra-smooth wave-dependent shimmer
    float shimmer = smoothNoise(vUv * 20.0 + uTime * 0.8) * smoothNoise(vUv * 15.0 - uTime * 0.6);
    shimmer = smoothstep(-0.3, 0.3, shimmer); // Gentle contrast for smoothness
    shimmer *= (1.0 + waveHeight * 1.5); // Gentler shimmer variation on peaks
    color += vec3(0.9, 1.0, 1.0) * shimmer * 0.08 * causticsPattern; // Reduced intensity
    
    // Apply enhanced shadow/highlight effect for more contrast
    color *= shadowIntensity;
    
    // Final contrast enhancement to make wave patterns more visible
    color = mix(color, color * color, 0.2); // Slight contrast boost
    
    // Clamp to prevent overexposure while maintaining contrast
    color = clamp(color, vec3(0.0), vec3(1.5));
    
    // Higher base opacity for more vibrant colors
    gl_FragColor = vec4(color, uOpacity * 0.95);
  }
`;

const canvasRef = ref<HTMLCanvasElement>();

// Initialize Three.js water surface
const initWaterSurface = () => {
  if (!canvasRef.value) return;

  // Scene setup
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer({ 
    canvas: canvasRef.value, 
    alpha: true, 
    antialias: true,
    powerPreference: "high-performance",
    precision: "highp", // High precision for smoother gradients
    logarithmicDepthBuffer: true // Better depth precision
  });
  
  // Maximum anti-aliasing and smoothing
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  
  // Additional smoothing settings
  const gl = renderer.getContext();
  if (gl.getExtension('EXT_texture_filter_anisotropic')) {
    // Enable anisotropic filtering for smoother textures
    const ext = gl.getExtension('EXT_texture_filter_anisotropic');
    gl.texParameterf(gl.TEXTURE_2D, ext.TEXTURE_MAX_ANISOTROPY_EXT, gl.getParameter(ext.MAX_TEXTURE_MAX_ANISOTROPY_EXT));
  }
  
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0); // Transparent background
  
  // Water geometry with maximum resolution for ultimate smoothness
  const geometry = new THREE.PlaneGeometry(25, 25, 768, 768); // Even higher resolution
  
  // Water material with custom shaders
  const material = new THREE.ShaderMaterial({
    vertexShader: waterVertexShader,
    fragmentShader: waterFragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uWaveStrength: { value: 0.9 }, // Gentler waves for smoother appearance
      uShallowColor: { value: new THREE.Color(0x40E0D0) }, // Turquoise for shallow areas
      uDeepColor: { value: new THREE.Color(0x003366) },    // Much darker blue for deep areas
      uMidColor: { value: new THREE.Color(0x0066CC) },     // Medium blue for mid-depth
      uCausticsColor: { value: new THREE.Color(0xFFFFFF) }, // Pure white caustics
      uSandColor: { value: new THREE.Color(0xFFF8DC) },    // Sandy beige/cream
      uOpacity: { value: 0.85 }
    },
    transparent: true,
    side: THREE.DoubleSide
  });
  
  // Create water mesh
  waterMesh = new THREE.Mesh(geometry, material);
  waterMesh.rotation.x = -Math.PI / 2.5; // Slightly less angled for better view
  waterMesh.position.y = -1.5;
  scene.add(waterMesh);
  
  // Camera position for better wave dimensionality view
  camera.position.set(-1, 3, 3.5);
  camera.lookAt(0, -0.3, 0);
  
  // Enhanced lighting for strong wave definition
  const ambientLight = new THREE.AmbientLight(0x87CEEB, 0.3); // Reduced ambient for stronger shadows
  scene.add(ambientLight);
  
  const sunLight = new THREE.DirectionalLight(0xFFFFE0, 1.8); // Stronger sun for dramatic lighting
  sunLight.position.set(3, 4, 2);
  sunLight.castShadow = true;
  scene.add(sunLight);
  
  // Key light for wave highlights
  const keyLight = new THREE.DirectionalLight(0xFFFFFF, 1.0);
  keyLight.position.set(-2, 3, 1);
  scene.add(keyLight);
  
  // Rim light for wave edges
  const rimLight = new THREE.DirectionalLight(0x87CEEB, 0.8);
  rimLight.position.set(1, 1, -2);
  scene.add(rimLight);
};

// Animation loop for water
const animateWater = () => {
  if (!waterMesh) return;
  
  animationTime.value += 0.016; // ~60fps
  
  // Update shader uniforms
  const material = waterMesh.material as THREE.ShaderMaterial;
  material.uniforms.uTime.value = animationTime.value;
  
  // Render scene
  renderer.render(scene, camera);
  
  animationId = requestAnimationFrame(animateWater);
};

// Handle window resize
const handleResize = () => {
  if (!camera || !renderer) return;
  
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};

// Cleanup Three.js resources
const cleanupWater = () => {
  if (animationId) {
    cancelAnimationFrame(animationId);
  }
  if (renderer) {
    renderer.dispose();
  }
  if (waterMesh) {
    waterMesh.geometry.dispose();
    (waterMesh.material as THREE.Material).dispose();
  }
};



onMounted(() => {
  // Animation loop
  const animate = () => {
    animationTime.value += 0.02;
    hue.value = Math.sin(animationTime.value * 0.3) * 40 + Math.cos(animationTime.value * 0.7) * 15;
    requestAnimationFrame(animate);
  };

  animate();

  // Listen for theme toggle (T key)
  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === 't' || event.key === 'T') {
      toggleTheme()
    }
  }
  window.addEventListener("keydown", handleKeyPress);
  
  // Initialize water surface for ocean theme
  if (currentTheme.value === 'ocean') {
    setTimeout(() => initWaterSurface(), 100); // Small delay to ensure canvas is mounted
    setTimeout(() => animateWater(), 200);
  }
  
  // Window resize handler
  window.addEventListener('resize', handleResize);

  // Cleanup
  return () => {
    window.removeEventListener("keydown", handleKeyPress);
    window.removeEventListener('resize', handleResize);
  };
});

// Watch theme changes to initialize/cleanup water surface
watch(currentTheme, (newTheme, oldTheme) => {
  if (newTheme === 'ocean' && oldTheme !== 'ocean') {
    // Initialize water surface when switching to ocean theme
    setTimeout(() => {
      initWaterSurface();
      animateWater();
    }, 100);
  } else if (newTheme !== 'ocean' && oldTheme === 'ocean') {
    // Cleanup water surface when switching away from ocean theme
    cleanupWater();
  }
});

// Cleanup on component unmount
onUnmounted(() => {
  cleanupWater();
});
</script>

<template>
  
  <!-- Three.js Water Surface (ocean theme only) -->
  <canvas 
    v-if="currentTheme === 'ocean'"
    ref="canvasRef"
    class="water-canvas"
  ></canvas>
  
  
  <!-- Theme indicator -->
  <div class="theme-indicator">
    <div 
      class="theme-badge"
      :class="{ 'neon': currentTheme === 'neon', 'ocean': currentTheme === 'ocean' }"
      @click="toggleTheme"
    >
      {{ currentTheme === 'neon' ? '⚡' : '🌊' }} {{ currentTheme.toUpperCase() }}
    </div>
    <div class="theme-hint">Press T to toggle</div>
  </div>
</template>

<style scoped>

/* Theme indicator styles */
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

/* Three.js Water Canvas */
.water-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -8;
  pointer-events: none;
}

</style>
