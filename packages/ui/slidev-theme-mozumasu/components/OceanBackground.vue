<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import * as THREE from "three";
import {
  WAVE_THEMES,
  getNextTheme,
  type WaveSettings,
  type WaveTheme,
} from "../composables/useOceanThemes";

// Props
const props = defineProps<{
  visible: boolean;
}>();

// Emit events
const emit = defineEmits<{
  switchTheme: [];
}>();

// Current wave theme
const currentWaveTheme = ref<WaveTheme>("tropical");
const waveConfig = computed(() => WAVE_THEMES[currentWaveTheme.value]);

// Animation time
const animationTime = ref(0);

// Three.js references
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let renderer: THREE.WebGLRenderer;
let waterMesh: THREE.Mesh;
let animationId: number;

const canvasRef = ref<HTMLCanvasElement>();

// Utility function
const hexToVec3 = (hex: string): string => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return "0.0, 0.0, 0.0";

  const r = parseInt(result[1], 16) / 255;
  const g = parseInt(result[2], 16) / 255;
  const b = parseInt(result[3], 16) / 255;

  return `${r.toFixed(3)}, ${g.toFixed(3)}, ${b.toFixed(3)}`;
};

// Shader creation functions
const createWaterVertexShader = () => `
  varying vec2 vUv;
  varying vec3 vPosition;
  varying vec3 vNormal;
  uniform float uTime;
  uniform float uWaveStrength;
  
  // Ocean wave function - Gerstner waves for realistic movement
  float oceanWave(vec2 pos, vec2 direction, float frequency, float amplitude, float speed, float time) {
    float phase = dot(pos, direction) * frequency + time * speed;
    return sin(phase) * amplitude;
  }
  
  // Gerstner wave - creates more realistic ocean wave shapes
  vec3 gerstnerWave(vec2 pos, vec2 direction, float frequency, float amplitude, float speed, float time) {
    float phase = dot(pos, direction) * frequency + time * speed;
    float steepness = 0.7; // Increased wave steepness for more dramatic ocean waves
    
    float x = steepness * amplitude * direction.x * cos(phase);
    float y = steepness * amplitude * direction.y * cos(phase);
    float z = amplitude * sin(phase);
    
    return vec3(x, y, z);
  }
  
  void main() {
    vUv = uv;
    vec3 pos = position;
    vec2 worldPos = pos.xy;
    
    // Large ocean swells - slow, rolling waves with increased amplitude
    vec3 swell1 = gerstnerWave(worldPos, normalize(vec2(1.0, 0.2)), 0.05, 0.35, 0.2, uTime);
    vec3 swell2 = gerstnerWave(worldPos, normalize(vec2(-0.4, 0.9)), 0.04, 0.3, 0.15, uTime * 0.7);
    vec3 swell3 = gerstnerWave(worldPos, normalize(vec2(0.6, 0.7)), 0.06, 0.25, 0.25, uTime * 0.8);
    vec3 swell4 = gerstnerWave(worldPos, normalize(vec2(-0.8, -0.5)), 0.03, 0.4, 0.18, uTime * 0.6);
    
    // Medium waves - more varied and natural
    vec3 wave1 = gerstnerWave(worldPos, normalize(vec2(0.9, 0.4)), 0.3, 0.15, 0.6, uTime * 1.2);
    vec3 wave2 = gerstnerWave(worldPos, normalize(vec2(-0.7, 0.7)), 0.4, 0.12, 0.8, uTime * 1.0);
    vec3 wave3 = gerstnerWave(worldPos, normalize(vec2(0.5, -0.8)), 0.35, 0.1, 0.9, uTime * 1.1);
    vec3 wave4 = gerstnerWave(worldPos, normalize(vec2(-0.3, -0.9)), 0.45, 0.08, 0.7, uTime * 0.9);
    
    // Surface ripples and chop
    float ripple1 = oceanWave(worldPos, normalize(vec2(1.0, 0.2)), 1.5, 0.03, 1.2, uTime);
    float ripple2 = oceanWave(worldPos, normalize(vec2(0.3, 1.0)), 2.0, 0.025, 1.5, uTime);
    float ripple3 = oceanWave(worldPos, normalize(vec2(0.8, 0.8)), 2.5, 0.02, 1.8, uTime);
    
    // Wind-driven chop - reduced frequency for more natural look
    float chop1 = oceanWave(worldPos, normalize(vec2(0.9, 0.1)), 3.0, 0.015, 2.0, uTime * 1.2);
    float chop2 = oceanWave(worldPos, normalize(vec2(0.1, 0.9)), 3.5, 0.012, 2.5, uTime * 1.1);
    
    // Combine all wave components for realistic ocean movement
    vec3 waveOffset = (swell1 + swell2 + swell3 + swell4 + wave1 + wave2 + wave3 + wave4) * uWaveStrength;
    waveOffset.z += (ripple1 + ripple2 + ripple3 + chop1 + chop2) * uWaveStrength;
    
    pos += waveOffset;
    vPosition = pos;
    
    // Calculate realistic normals for proper lighting
    float delta = 0.01;
    vec3 pos1 = position + vec3(delta, 0.0, 0.0);
    vec3 pos2 = position + vec3(0.0, delta, 0.0);
    
    // Apply same wave calculation to neighboring points
    vec3 wave1_1 = (gerstnerWave(pos1.xy, normalize(vec2(1.0, 0.2)), 0.05, 0.35, 0.2, uTime) +
                   gerstnerWave(pos1.xy, normalize(vec2(-0.4, 0.9)), 0.04, 0.3, 0.15, uTime * 0.7) +
                   gerstnerWave(pos1.xy, normalize(vec2(0.6, 0.7)), 0.06, 0.25, 0.25, uTime * 0.8) +
                   gerstnerWave(pos1.xy, normalize(vec2(-0.8, -0.5)), 0.03, 0.4, 0.18, uTime * 0.6)) * uWaveStrength;
    
    vec3 wave2_1 = (gerstnerWave(pos2.xy, normalize(vec2(1.0, 0.2)), 0.05, 0.35, 0.2, uTime) +
                   gerstnerWave(pos2.xy, normalize(vec2(-0.4, 0.9)), 0.04, 0.3, 0.15, uTime * 0.7) +
                   gerstnerWave(pos2.xy, normalize(vec2(0.6, 0.7)), 0.06, 0.25, 0.25, uTime * 0.8) +
                   gerstnerWave(pos2.xy, normalize(vec2(-0.8, -0.5)), 0.03, 0.4, 0.18, uTime * 0.6)) * uWaveStrength;
    
    pos1 += wave1_1;
    pos2 += wave2_1;
    
    // Calculate tangent vectors and normal
    vec3 tangent = normalize(pos1 - pos);
    vec3 bitangent = normalize(pos2 - pos);
    vNormal = normalize(cross(tangent, bitangent));
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const createWaterFragmentShader = (config: WaveSettings) => `
  varying vec2 vUv;
  varying vec3 vPosition;
  varying vec3 vNormal;
  uniform float uTime;
  uniform vec3 uShallowColor;
  uniform vec3 uDeepColor;
  uniform vec3 uMidColor;
  uniform float uOpacity;
  
  // Noise function for realistic water surface effects
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    
    float a = sin(dot(i, vec2(12.9898, 78.233))) * 43758.5453;
    float b = sin(dot(i + vec2(1.0, 0.0), vec2(12.9898, 78.233))) * 43758.5453;
    float c = sin(dot(i + vec2(0.0, 1.0), vec2(12.9898, 78.233))) * 43758.5453;
    float d = sin(dot(i + vec2(1.0, 1.0), vec2(12.9898, 78.233))) * 43758.5453;
    
    return mix(mix(fract(a), fract(b), f.x), mix(fract(c), fract(d), f.x), f.y);
  }
  
  // Ocean foam and whitecaps
  float foam(vec2 uv, float time) {
    vec2 p = uv * 8.0;
    float f = 0.0;
    
    for(int i = 0; i < 3; i++) {
      float scale = pow(2.0, float(i));
      vec2 offset = vec2(time * 0.1, time * 0.08) * scale;
      f += noise(p * scale + offset) / scale;
    }
    
    return smoothstep(0.6, 1.0, f);
  }
  
  // Enhanced caustics pattern - network-like water reflections
  float caustics(vec2 uv, float time) {
    vec2 p = uv * 8.0; // Higher detail for network pattern
    float c = 0.0;
    
    // Create network-like caustics pattern
    for(int i = 0; i < 4; i++) {
      float scale = pow(1.6, float(i));
      vec2 offset = vec2(time * 0.05, time * 0.04) * scale;
      
      vec2 q = p * scale + offset;
      
      // Create intersecting wave patterns for network effect
      float wave1 = sin(q.x * 2.0 + time * 0.8) * cos(q.y * 1.8 + time * 0.6);
      float wave2 = sin((q.x + q.y) * 1.4 + time * 0.7) * cos((q.x - q.y) * 1.6 + time * 0.5);
      float wave3 = sin(q.x * 1.2 - q.y * 1.8 + time * 0.9) * cos(q.x * 1.6 + q.y * 1.2 + time * 0.4);
      
      // Combine waves to create network pattern
      float combined = (wave1 + wave2 + wave3) * 0.33;
      combined = abs(combined); // Create sharp network lines
      combined = pow(combined, 2.0); // Sharpen the pattern
      
      c += combined / scale;
    }
    
    // Add fine mesh-like details
    vec2 meshPattern = p * 3.0 + time * 0.2;
    float mesh = abs(sin(meshPattern.x * 4.0)) * abs(sin(meshPattern.y * 4.0));
    mesh = pow(mesh, 0.5);
    
    c = c * 0.7 + mesh * 0.3;
    return smoothstep(0.2, 0.9, c);
  }
  
  // Enhanced sun sparkle effect like the reference image
  float sunSparkles(vec2 uv, vec3 normal, float time) {
    float sparkle = 0.0;
    
    // Intense sun sparkles - multiple frequency layers
    for(int i = 0; i < 5; i++) {
      float scale = pow(2.0, float(i)) * 8.0;
      vec2 sparkleUv = uv * scale + time * (0.2 + float(i) * 0.1);
      
      float s = noise(sparkleUv);
      // Sharp, bright sparkles
      s = pow(smoothstep(0.8, 1.0, s), 10.0 + float(i) * 2.0);
      sparkle += s / pow(2.0, float(i));
    }
    
    // Add moving sun path sparkles
    vec2 sunPath = uv + vec2(sin(time * 0.3) * 0.1, cos(time * 0.5) * 0.05);
    float sunPathSparkle = noise(sunPath * 20.0 + time * 0.8);
    sunPathSparkle = pow(smoothstep(0.85, 1.0, sunPathSparkle), 15.0);
    sparkle += sunPathSparkle * 2.0;
    
    // Directional sun reflection with wave influence
    vec3 sunDir = normalize(vec3(0.6, 1.8, 0.4)); // High sun angle
    vec3 viewDir = normalize(vec3(0.0, 1.0, 0.3));
    vec3 reflectDir = reflect(-sunDir, normal);
    float sunReflection = max(0.0, dot(viewDir, reflectDir));
    sunReflection = pow(sunReflection, 120.0);
    
    // Combine with surface orientation
    float surfaceAlignment = max(0.0, dot(normal, vec3(0.0, 0.0, 1.0)));
    surfaceAlignment = pow(surfaceAlignment, 0.5);
    
    return sparkle * sunReflection * surfaceAlignment * 3.0;
  }
  
  // Ocean surface shimmer effect
  float oceanShimmer(vec2 uv, float time) {
    float shimmer = 0.0;
    
    // Multiple shimmer layers like real ocean surface
    for(int i = 0; i < 3; i++) {
      float scale = 30.0 + float(i) * 15.0;
      vec2 offset = vec2(time * 0.4, time * 0.3) * (1.0 + float(i) * 0.2);
      
      float layer = noise(uv * scale + offset);
      layer = smoothstep(0.7, 1.0, layer);
      layer = pow(layer, 3.0);
      
      shimmer += layer / (float(i) + 1.0);
    }
    
    return shimmer;
  }
  
  void main() {
    // Calculate wave-based depth for deep ocean water
    float waveHeight = vPosition.z;
    float depth = 1.0 - abs(waveHeight) * 1.5; // Less depth variation
    depth = clamp(depth, 0.0, 1.0);
    
    // Dynamic water colors based on theme configuration
    vec3 shallowColor = vec3(${hexToVec3(config.colors.shallow)});
    vec3 mediumColor = vec3(${hexToVec3(config.colors.medium)});
    vec3 deepColor = vec3(${hexToVec3(config.colors.deep)});
    
    // Water gradient based on configuration
    float viewDepth = 0.7 + vUv.y * 0.2;
    vec3 waterColor = mix(deepColor, mediumColor, viewDepth);
    waterColor = mix(waterColor, shallowColor, depth * 0.6 + 0.2);
    
    // Bright wave-based lighting like reference
    float waveShading = waveHeight * 2.0;
    float lightIntensity = 1.2 + waveShading * 0.4; // Brighter base
    waterColor *= lightIntensity;
    
    // Very subtle wave shadows - keep it bright
    if (waveHeight < -0.02) {
      waterColor *= vec3(0.95, 0.97, 1.0); // Very light blue tint
    } else if (waveHeight > 0.02) {
      waterColor *= vec3(1.1, 1.08, 1.05); // Subtle highlights
    }
    
    // Start with deep water color - no bottom visible
    vec3 color = waterColor;
    
    // Surface caustics with dynamic intensity
    float causticsPattern = caustics(vUv, uTime);
    vec3 surfaceCaustics = vec3(1.0, 1.0, 0.95) * causticsPattern * ${config.effects.causticsIntensity.toFixed(1)};
    
    // Apply caustics with configurable strength
    float causticsStrength = 0.5 + smoothstep(-0.02, 0.05, waveHeight) * 0.5;
    color += surfaceCaustics * causticsStrength;
    
    // Add sun sparkles with dynamic intensity
    float sparklePattern = sunSparkles(vUv, vNormal, uTime);
    vec3 sunSparkleColor = vec3(1.0, 0.95, 0.8); // Warm golden sun color
    color += sunSparkleColor * sparklePattern * ${config.effects.sparkleIntensity.toFixed(1)};
    
    // Add ocean surface shimmer
    float shimmerPattern = oceanShimmer(vUv, uTime);
    vec3 shimmerColor = vec3(0.9, 0.95, 1.0); // Cool shimmer
    color += shimmerColor * shimmerPattern * 1.5;
    
    // Foam with dynamic intensity
    float foamPattern = foam(vUv, uTime);
    float foamIntensity = smoothstep(0.04, 0.08, waveHeight) * foamPattern;
    vec3 foamColor = vec3(0.9, 0.93, 0.95);
    color = mix(color, foamColor, foamIntensity * ${config.effects.foamIntensity.toFixed(2)});
    
    // Fresnel reflection with dynamic strength
    vec3 viewDir = normalize(vec3(0.2, 1.0, 0.8));
    float fresnel = 1.0 - max(0.0, dot(vNormal, viewDir));
    fresnel = pow(fresnel, 1.5);
    
    // Sky reflection with sun influence
    vec3 skyColor = vec3(0.8, 0.9, 1.0); // Bright blue sky
    vec3 sunSkyColor = vec3(1.0, 0.98, 0.9); // Bright warm sun-influenced sky
    vec3 finalSkyColor = mix(skyColor, sunSkyColor, 0.2);
    color = mix(color, finalSkyColor, fresnel * ${config.effects.fresnelStrength.toFixed(1)});
    
    // Sun glints with dynamic intensity - golden sun reflections
    vec3 sunDir = normalize(vec3(0.6, 2.0, 0.4)); // Higher sun angle
    float sunGlint = pow(max(0.0, dot(vNormal, sunDir)), 150.0);
    vec3 sunGlintColor = vec3(1.0, 0.9, 0.6); // Golden sun reflection
    color += sunGlintColor * sunGlint * ${config.effects.glintIntensity.toFixed(1)} * (1.0 + waveHeight * 2.0);
    
    // Secondary sun reflection path
    vec3 sunDir2 = normalize(vec3(0.4, 1.8, 0.6));
    float sunGlint2 = pow(max(0.0, dot(vNormal, sunDir2)), 100.0);
    color += sunGlintColor * sunGlint2 * ${(config.effects.glintIntensity * 0.4).toFixed(1)};
    
    // Ocean surface highlights - multiple reflection angles
    float highlight1 = pow(max(0.0, dot(vNormal, normalize(vec3(0.3, 1.0, 0.7)))), 25.0);
    float highlight2 = pow(max(0.0, dot(vNormal, normalize(vec3(0.7, 1.0, 0.3)))), 35.0);
    vec3 highlightColor = vec3(0.95, 0.98, 1.0);
    color += highlightColor * (highlight1 + highlight2) * 1.2;
    
    // Dynamic color grading
    color = pow(color, vec3(0.75)); // Gamma correction
    
    // Tone mapping
    color = color / (1.0 + color * 0.3);
    
    // Brightness boost with dynamic multiplier
    color *= ${config.effects.brightnessMultiplier.toFixed(1)};
    
    // Enhanced color channels
    color.b = min(color.b * 1.2, 1.0); // Boost blue
    color.g = min(color.g * 1.1, 1.0); // Boost green for aqua
    color.r = min(color.r * 0.9, 1.0); // Reduce red slightly
    
    // Final clamp
    color = clamp(color, vec3(0.0), vec3(1.0));
    
    // Dynamic saturation boost
    float saturation = ${config.effects.saturation.toFixed(1)};
    float gray = dot(color, vec3(0.299, 0.587, 0.114));
    color = mix(vec3(gray), color, saturation);
    
    gl_FragColor = vec4(color, uOpacity);
  }
`;

// Three.js Setup Functions
const createRenderer = () => {
  if (!canvasRef.value) return null;

  const newRenderer = new THREE.WebGLRenderer({
    canvas: canvasRef.value,
    alpha: true,
    antialias: true,
  });

  newRenderer.setSize(window.innerWidth, window.innerHeight);
  newRenderer.setClearColor(waveConfig.value.colors.rendererBg, 1);
  newRenderer.toneMappingExposure = 1.5;
  newRenderer.toneMapping = THREE.ACESFilmicToneMapping;

  return newRenderer;
};

const createWaterMaterial = () => {
  return new THREE.ShaderMaterial({
    vertexShader: createWaterVertexShader(),
    fragmentShader: createWaterFragmentShader(waveConfig.value),
    uniforms: {
      uTime: { value: 0 },
      uWaveStrength: { value: waveConfig.value.waveStrength },
      uShallowColor: {
        value: new THREE.Color(waveConfig.value.colors.shallow),
      },
      uMidColor: { value: new THREE.Color(waveConfig.value.colors.medium) },
      uDeepColor: { value: new THREE.Color(waveConfig.value.colors.deep) },
      uOpacity: { value: waveConfig.value.opacity },
    },
    transparent: true,
    side: THREE.DoubleSide,
  });
};

const createWaterMesh = () => {
  const geometry = new THREE.PlaneGeometry(150, 150, 512, 512);
  const material = createWaterMaterial();

  const mesh = new THREE.Mesh(geometry, material);
  mesh.rotation.x = -Math.PI / 2.5; // Approximately 72 degrees for better view
  mesh.rotation.y = -Math.PI / 18; // Slight side angle
  mesh.position.y = -3.5; // Lower position for wider view
  mesh.position.z = 3.0; // Adjusted forward position

  return mesh;
};

const setupCamera = () => {
  const newCamera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );
  newCamera.position.set(-3, 2, 10); // Further back for wider view
  newCamera.lookAt(3, -3, -4); // Look across the water surface diagonally
  return newCamera;
};

// Initialize Three.js water surface
const initWaterSurface = () => {
  if (!canvasRef.value) return;

  scene = new THREE.Scene();
  camera = setupCamera();
  renderer = createRenderer();

  if (!renderer) return;

  waterMesh = createWaterMesh();
  scene.add(waterMesh);
};

// Animation loop with configurable speed
const animateWater = () => {
  if (!waterMesh || !renderer || !scene || !camera) return;

  // Update animation time based on wave configuration
  animationTime.value += waveConfig.value.animationSpeed;

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

// Wave theme switching function
const switchWaveTheme = () => {
  currentWaveTheme.value = getNextTheme(currentWaveTheme.value);
  console.log("Wave theme switched to:", currentWaveTheme.value);

  // Reinitialize water surface with new theme
  cleanupWater();
  setTimeout(() => {
    initWaterSurface();
    animateWater();
  }, 100);
};

// Lifecycle
onMounted(() => {
  if (props.visible) {
    setTimeout(() => initWaterSurface(), 100);
    setTimeout(() => animateWater(), 200);
  }

  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  cleanupWater();
  window.removeEventListener("resize", handleResize);
});

// Watch visibility
watch(
  () => props.visible,
  (newVal, oldVal) => {
    if (newVal && !oldVal) {
      setTimeout(() => {
        initWaterSurface();
        animateWater();
      }, 100);
    } else if (!newVal && oldVal) {
      cleanupWater();
    }
  },
);

// Expose methods
defineExpose({
  switchWaveTheme,
  currentWaveTheme,
});
</script>

<template>
  <div v-if="visible" class="ocean-container">
    <!-- Background color layer -->
    <div
      class="ocean-background"
      :style="{ backgroundColor: waveConfig.colors.background }"
    />

    <!-- Three.js Water Canvas -->
    <canvas ref="canvasRef" class="water-canvas" />
  </div>
</template>

<style scoped>
.ocean-container {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: -20;
}

.ocean-background {
  position: absolute;
  inset: 0;
  z-index: -20;
}

.water-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -8;
}
</style>

