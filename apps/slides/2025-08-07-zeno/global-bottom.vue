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
const opacity = computed(() => baseOpacity);
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
const seed = ref("default");
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
    
    // High frequency surface ripples
    float ripple1 = wave(worldPos, normalize(vec2(1.0, 0.0)), 8.0, 0.008, 3.0, uTime);
    float ripple2 = wave(worldPos, normalize(vec2(0.0, 1.0)), 10.0, 0.006, 3.5, uTime);
    float ripple3 = wave(worldPos, normalize(vec2(0.7, 0.7)), 12.0, 0.004, 4.0, uTime);
    
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
  uniform vec3 uCausticsColor;
  uniform vec3 uSandColor;
  uniform float uOpacity;
  
  // Enhanced caustics pattern (light refraction effect)
  float caustics(vec2 uv, float time) {
    vec2 p = uv * 6.0;
    float c = 0.0;
    
    // Multiple layers of caustics with different speeds and scales
    for(int i = 0; i < 4; i++) {
      float scale = pow(2.0, float(i));
      vec2 offset = vec2(time * 0.08, time * 0.06) * scale;
      
      vec2 q = p * scale + offset;
      // More complex caustics pattern
      float layer = sin(q.x + cos(q.y + time * 0.5)) * cos(q.y + sin(q.x + time * 0.3));
      c += layer / scale;
    }
    
    // Sharper, more defined caustics
    c = c * 0.5 + 0.5;
    return pow(max(0.0, c), 1.5);
  }
  
  // Sand pattern on the bottom
  float sandPattern(vec2 uv) {
    vec2 p = uv * 25.0;
    float sand = 0.0;
    
    // Multiple noise layers for sand texture
    for(int i = 0; i < 3; i++) {
      float scale = pow(2.0, float(i));
      vec2 q = p * scale;
      sand += sin(q.x) * cos(q.y) / scale;
    }
    
    return sand * 0.5 + 0.5;
  }
  
  void main() {
    // Calculate water depth with enhanced variation
    float waveHeight = vPosition.z;
    float depth = 1.0 - abs(waveHeight) * 6.0;
    depth = clamp(depth, 0.0, 1.0);
    
    // Wave height-based lighting for 3D effect
    float waveShading = waveHeight * 3.0; // Amplify height differences
    float lightIntensity = 1.0 + waveShading * 0.4; // Peaks are brighter
    float shadowIntensity = 1.0 - abs(waveShading) * 0.2; // Valleys are darker
    
    // Sand bottom color with texture
    float sandNoise = sandPattern(vUv);
    vec3 sandBottom = mix(uSandColor * 0.9, uSandColor * 1.1, sandNoise);
    
    // Water color with height-based variation
    vec3 waterColor = mix(uDeepColor, uShallowColor, depth);
    waterColor *= lightIntensity; // Apply height-based lighting
    
    // Blend sand and water based on depth and transparency
    float transparency = 0.6 + depth * 0.4; // More variation in transparency
    vec3 color = mix(sandBottom, waterColor, transparency);
    
    // Enhanced caustics effect with wave interaction
    float causticsPattern = caustics(vUv, uTime);
    causticsPattern = pow(causticsPattern, 1.0);
    
    // Caustics affected by wave height
    float causticsStrength = 0.7 + waveHeight * 0.5; // Stronger on wave peaks
    vec3 causticsEffect = uCausticsColor * causticsPattern * causticsStrength;
    color = mix(color, color + causticsEffect, 0.9);
    
    // Enhanced Fresnel effect based on normal
    vec3 viewDirection = normalize(vec3(0.0, 1.0, 1.0)); // Viewing from above
    float fresnel = 1.0 - max(0.0, dot(vNormal, viewDirection));
    fresnel = pow(fresnel, 1.5); // More dramatic fresnel
    
    // Strong reflection on wave crests
    color += vec3(0.3, 0.5, 0.7) * fresnel * 0.6;
    
    // Wave-dependent shimmer
    float shimmer = sin(vUv.x * 40.0 + uTime * 2.5) * sin(vUv.y * 35.0 + uTime * 2.0);
    shimmer *= (1.0 + waveHeight * 2.0); // Stronger shimmer on peaks
    color += vec3(0.9, 1.0, 1.0) * shimmer * 0.12 * causticsPattern;
    
    // Apply shadow/highlight effect
    color *= shadowIntensity;
    
    // Higher base opacity for more vibrant colors
    gl_FragColor = vec4(color, uOpacity * 0.95);
  }
`;

const canvasRef = ref<HTMLCanvasElement>();

const overflow = 0.3;
const disturb = 0.3;
const disturbChance = 0.3;

// Initialize Three.js water surface
const initWaterSurface = () => {
  if (!canvasRef.value) return;

  // Scene setup
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer({ 
    canvas: canvasRef.value, 
    alpha: true, 
    antialias: true 
  });
  
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0); // Transparent background
  
  // Water geometry with higher resolution for smoother waves
  const geometry = new THREE.PlaneGeometry(25, 25, 300, 300);
  
  // Water material with custom shaders
  const material = new THREE.ShaderMaterial({
    vertexShader: waterVertexShader,
    fragmentShader: waterFragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uWaveStrength: { value: 1.2 }, // Stronger waves for more dimension
      uShallowColor: { value: new THREE.Color(0x00FFFF) }, // Bright cyan/turquoise
      uDeepColor: { value: new THREE.Color(0x0080FF) },    // Vibrant blue
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

  // Update on slide change simulation - disabled to prevent flickering
  // watch(currentSlideNo, () => {
  //   jumpPoints();
  // });

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

  // Periodically check for changes (fallback)
  const interval = setInterval(updateSlideNumber, 500);

  // Cleanup
  return () => {
    window.removeEventListener("popstate", updateSlideNumber);
    window.removeEventListener("keydown", handleKeyPress);
    window.removeEventListener('resize', handleResize);
    clearInterval(interval);
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
  <div
    class="bg transform-gpu overflow-hidden pointer-events-none"
    :style="{ 
      filter: `blur(80px) hue-rotate(${hue}deg)`,
      transform: `scale(${1 + Math.sin(animationTime * 0.4) * 0.08}) rotate(${Math.cos(animationTime * 0.1) * 0.5}deg)`
    }"
    aria-hidden="true"
  >
    <!-- Primary layers -->
    <div
      class="clip"
      :style="{ 
        'clip-path': `polygon(${poly1})`, 
        background: `linear-gradient(to right, ${colorSchemes.layer1.from}, ${colorSchemes.layer1.to})`,
        opacity: currentTheme === 'ocean' ? opacity * 1.2 : opacity * 0.8,
        transform: `translate(${Math.sin(animationTime * 0.6) * 20}px, ${Math.cos(animationTime * 0.4) * 15}px) scale(${1 + Math.sin(animationTime * 0.8) * 0.15})`
      }"
    />
    <div
      class="clip"
      :style="{ 
        'clip-path': `polygon(${poly2})`, 
        background: `linear-gradient(to left, ${colorSchemes.layer2.from}, ${colorSchemes.layer2.to})`,
        opacity: currentTheme === 'ocean' ? opacity * 1.0 : opacity * 0.7,
        transform: `translate(${Math.cos(animationTime * 0.5) * -25}px, ${Math.sin(animationTime * 0.7) * 20}px) scale(${1 + Math.cos(animationTime * 1.1) * 0.2})`
      }"
    />
    <div
      class="clip"
      :style="{ 
        'clip-path': `polygon(${poly3})`, 
        background: `linear-gradient(to top, ${colorSchemes.layer3.from}, ${colorSchemes.layer3.to})`,
        opacity: currentTheme === 'ocean' ? 0.25 : 0.15,
        transform: `translate(${Math.sin(animationTime * 0.3) * 30}px, ${Math.cos(animationTime * 0.6) * -10}px) scale(${1 + Math.sin(animationTime * 1.3) * 0.25})`
      }"
    />
    <div
      class="clip"
      :style="{ 
        'clip-path': `polygon(${poly4})`, 
        background: `linear-gradient(to bottom right, ${colorSchemes.layer4.from}, ${colorSchemes.layer4.to})`,
        opacity: currentTheme === 'ocean' ? 0.2 : 0.1,
        transform: `translate(${Math.cos(animationTime * 0.4) * -15}px, ${Math.sin(animationTime * 0.5) * 25}px) scale(${1 + Math.cos(animationTime * 1.5) * 0.3})`
      }"
    />
    
    <!-- Additional ocean layers (only visible in ocean theme) -->
    <div
      v-if="currentTheme === 'ocean'"
      class="clip"
      :style="{ 
        'clip-path': `polygon(${poly1})`, 
        background: `linear-gradient(to top, ${colorSchemes.ocean1.from}, ${colorSchemes.ocean1.to})`,
        opacity: 0.18,
        transform: `translate(${Math.sin(animationTime * 0.2) * 40}px, ${Math.cos(animationTime * 0.3) * 20}px) scale(${1.2 + Math.sin(animationTime * 0.6) * 0.1})`
      }"
    />
    <div
      v-if="currentTheme === 'ocean'"
      class="clip"
      :style="{ 
        'clip-path': `polygon(${poly2})`, 
        background: `linear-gradient(to bottom right, ${colorSchemes.ocean2.from}, ${colorSchemes.ocean2.to})`,
        opacity: 0.12,
        transform: `translate(${Math.cos(animationTime * 0.25) * -35}px, ${Math.sin(animationTime * 0.4) * 30}px) scale(${0.9 + Math.cos(animationTime * 0.7) * 0.15})`
      }"
    />
    <div
      v-if="currentTheme === 'ocean'"
      class="clip"
      :style="{ 
        'clip-path': `polygon(${poly3})`, 
        background: `linear-gradient(to right, ${colorSchemes.ocean3.from}, ${colorSchemes.ocean3.to})`,
        opacity: 0.08,
        transform: `translate(${Math.sin(animationTime * 0.15) * 50}px, ${Math.cos(animationTime * 0.2) * -25}px) scale(${1.1 + Math.sin(animationTime * 0.5) * 0.2})`
      }"
    />
  </div>
  
  <!-- Three.js Water Surface (ocean theme only) -->
  <canvas 
    v-if="currentTheme === 'ocean'"
    ref="canvasRef"
    class="water-canvas"
  ></canvas>
  
  <!-- Water surface patterns (ocean theme only) -->
  <div v-if="currentTheme === 'ocean'" class="water-surface">
    <!-- Ripple effects -->
    <div 
      class="ripple"
      v-for="i in 8"
      :key="i"
      :style="{
        left: `${15 + (i * 12)}%`,
        top: `${20 + (i * 8)}%`,
        animationDelay: `${i * 0.3}s`,
        animationDuration: `${4 + (i * 0.2)}s`
      }"
    ></div>
    
    <!-- Light reflections -->
    <div 
      class="light-reflection"
      v-for="i in 5"
      :key="`light-${i}`"
      :style="{
        left: `${10 + (i * 18)}%`,
        top: `${30 + (i * 10)}%`,
        animationDelay: `${i * 0.8}s`,
        animationDuration: `${6 + (i * 0.5)}s`
      }"
    ></div>
    
    <!-- Water waves -->
    <div class="water-wave wave-1"></div>
    <div class="water-wave wave-2"></div>
    <div class="water-wave wave-3"></div>
  </div>
  
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

/* Water surface patterns */
.water-surface {
  position: absolute;
  inset: 0;
  z-index: -5;
  overflow: hidden;
  pointer-events: none;
}

/* Ripple effects */
.ripple {
  position: absolute;
  width: 40px;
  height: 40px;
  border: 2px solid rgba(64, 224, 208, 0.4);
  border-radius: 50%;
  animation: ripple-expand infinite ease-out;
}

@keyframes ripple-expand {
  0% {
    width: 20px;
    height: 20px;
    opacity: 0.8;
    border-width: 3px;
  }
  50% {
    width: 120px;
    height: 120px;
    opacity: 0.4;
    border-width: 2px;
  }
  100% {
    width: 200px;
    height: 200px;
    opacity: 0;
    border-width: 1px;
  }
}

/* Light reflections */
.light-reflection {
  position: absolute;
  width: 60px;
  height: 60px;
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.3) 0%,
    rgba(64, 224, 208, 0.2) 30%,
    rgba(32, 178, 170, 0.1) 60%,
    transparent 100%
  );
  border-radius: 50%;
  animation: light-shimmer infinite ease-in-out;
}

@keyframes light-shimmer {
  0%, 100% {
    transform: scale(0.8) translateY(0px);
    opacity: 0.3;
  }
  50% {
    transform: scale(1.2) translateY(-10px);
    opacity: 0.8;
  }
}

/* Water waves */
.water-wave {
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    45deg,
    transparent 0%,
    rgba(72, 209, 204, 0.1) 25%,
    rgba(64, 224, 208, 0.15) 50%,
    rgba(32, 178, 170, 0.1) 75%,
    transparent 100%
  );
  animation: water-flow infinite linear;
}

.wave-1 {
  animation-duration: 20s;
  transform: rotate(0deg);
}

.wave-2 {
  animation-duration: 15s;
  transform: rotate(45deg);
  animation-direction: reverse;
}

.wave-3 {
  animation-duration: 25s;
  transform: rotate(90deg);
}

@keyframes water-flow {
  0% {
    transform: translateX(-100%) translateY(-50%) scale(1);
  }
  50% {
    transform: translateX(0%) translateY(0%) scale(1.1);
  }
  100% {
    transform: translateX(100%) translateY(50%) scale(1);
  }
}
</style>
