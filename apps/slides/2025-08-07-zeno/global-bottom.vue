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

// Neon theme glow effect variables
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
  | "center"
  | "topmost";

const currentSlideNo = ref(1);
const distribution = ref<Distribution>("full");
const baseOpacity = 0.4;
const opacity = computed(() => baseOpacity);
const hue = ref(0);
const seed = ref("default");

const overflow = 0.3;
const disturb = 0.3;
const disturbChance = 0.3;

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
    // Neon theme (purple, blue, magenta)
    return {
      layer1: { from: '#8b5cf6', to: 'rgba(255, 255, 255, 0.1)' }, // Purple
      layer2: { from: '#2f96ad', to: 'rgba(255, 255, 255, 0.1)' }, // Blue
      layer3: { from: '#d946ef', to: 'rgba(255, 255, 255, 0.1)' }, // Magenta/Red-purple
      layer4: { from: '#06b6d4', to: '#67e8f9' },
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
  
  // Realistic caustics inspired by reference shader
  float caustics(vec2 uv, float time) {
    vec2 p = uv * 3.0; // More detailed caustics pattern
    float c = 0.0;
    
    // Multi-layered caustics for realistic light refraction
    for(int i = 0; i < 5; i++) {
      float scale = pow(1.3, float(i));
      vec2 offset = vec2(time * 0.04, time * 0.025) * scale;
      
      vec2 q = p * scale + offset;
      // Create more realistic caustics using multiple noise octaves
      float layer1 = smoothNoise(q + time * 0.08);
      float layer2 = smoothNoise(q * 1.7 + time * 0.06);
      float layer3 = smoothNoise(q * 2.3 - time * 0.04);
      
      float combined = (layer1 * 0.5 + layer2 * 0.3 + layer3 * 0.2);
      combined = smoothstep(0.1, 0.9, combined);
      
      c += combined / (scale * 0.7);
    }
    
    // Add focused bright caustics spots
    float bright = smoothNoise(p * 0.8 + time * 0.1);
    bright = pow(smoothstep(0.7, 1.0, bright), 3.0);
    
    c = c * 0.3 + 0.7 + bright * 0.4;
    return smoothstep(0.2, 1.1, c);
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
    
    // Pure ocean water without gray sand influence
    vec3 waterColor;
    
    // Create bright tropical color transitions (no sand mixing)
    float depthFactor = smoothstep(0.0, 1.0, depth);
    
    if (depth > 0.8) {
      // Very shallow water - crystal clear bright blue
      waterColor = uShallowColor * 1.1; // Pure bright shallow color
    } else if (depth > 0.5) {
      // Shallow to medium depth - pure blue transition
      waterColor = mix(uMidColor, uShallowColor, (depth - 0.5) / 0.3);
    } else if (depth > 0.2) {
      // Medium to deep - pure oceanic blue
      waterColor = mix(uDeepColor, uMidColor, (depth - 0.2) / 0.3);
    } else {
      // Deep ocean - bright royal blue (like reference image)
      vec3 veryDeepColor = uDeepColor * 1.0; // Keep bright for tropical look
      waterColor = mix(veryDeepColor, uDeepColor, depth / 0.2);
    }
    
    // Add subtle color variation based on wave position
    vec3 waveInfluence = vec3(0.05, 0.1, 0.15) * sin(vPosition.x * 0.1 + uTime * 0.5);
    waterColor += waveInfluence * depthFactor;
    
    // Apply stronger height-based lighting
    waterColor *= lightIntensity;
    
    // Blue-tinted wave shadows instead of gray
    if (waveHeight < -0.02) {
      waterColor *= vec3(0.8, 0.85, 0.9); // Blue-tinted shadows
    } else if (waveHeight > 0.02) {
      waterColor *= vec3(1.2, 1.15, 1.1); // Warm-tinted highlights
    }
    
    // Pure water color without sand blending
    vec3 color = waterColor;
    
    // Realistic caustics with depth-based intensity
    float causticsPattern = caustics(vUv, uTime);
    causticsPattern = pow(causticsPattern, 0.6); // More contrast for realism
    
    // Dynamic caustics strength based on depth and wave interaction
    float surfaceDistance = 1.0 - depth; // Distance from surface
    float causticsStrength = (0.8 + waveHeight * 1.2) * surfaceDistance * surfaceDistance;
    causticsStrength *= (1.0 + sin(uTime * 0.8 + vPosition.x * 0.1) * 0.2); // Subtle animation variation
    
    // Apply caustics with more realistic color mixing
    vec3 causticsEffect = uCausticsColor * causticsPattern * causticsStrength * 0.6;
    color = color + causticsEffect * (1.0 - depth * 0.7); // Fade caustics in deep water
    
    // Realistic Fresnel reflection (inspired by reference shader)
    vec3 viewDirection = normalize(vec3(0.2, 1.0, 0.8)); // Slightly angled view
    float fresnel = 1.0 - max(0.0, dot(vNormal, viewDirection));
    fresnel = pow(fresnel, 2.0); // More realistic fresnel falloff
    
    // Ocean surface reflection with sky-like colors
    vec3 skyReflection = vec3(0.4, 0.7, 1.0); // Light blue sky reflection
    color = mix(color, skyReflection, fresnel * 0.4 * (1.0 - depth * 0.5));
    
    // Sun reflection on wave peaks
    float sunReflection = pow(max(0.0, dot(vNormal, normalize(vec3(1.0, 2.0, 1.0)))), 32.0);
    color += vec3(1.0, 0.95, 0.8) * sunReflection * 0.5 * (1.0 + waveHeight);
    
    // Subtle wave sparkles
    float sparkle = smoothNoise(vUv * 40.0 + uTime * 1.5);
    sparkle = pow(smoothstep(0.8, 1.0, sparkle), 4.0);
    sparkle *= (1.0 + waveHeight * 2.0); // More sparkles on wave peaks
    color += vec3(1.0, 1.0, 0.9) * sparkle * 0.15;
    
    // Reduce gray shadows - keep colors bright and blue
    color *= mix(1.0, shadowIntensity, 0.3); // Less shadow influence
    
    // Bright tropical ocean color grading (inspired by reference)
    color = pow(color, vec3(0.8)); // Brighter gamma for tropical look
    
    // Add bright blue enhancement for crystal clear water
    float oceanBrightness = (1.0 - depth) * 0.2;
    color = mix(color, color * vec3(1.1, 1.2, 1.4), oceanBrightness);
    
    // Reduce contrast for brighter, more natural appearance
    color = mix(color, color * color, 0.1);
    
    // Brighter clamping and enhanced saturation
    color = clamp(color, vec3(0.0), vec3(1.6));
    color = mix(color, color * 1.4, 0.3); // More saturation for tropical blues
    
    // More realistic opacity with depth variation
    float finalOpacity = uOpacity * (0.85 + depth * 0.15);
    gl_FragColor = vec4(color, finalOpacity);
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
  
  // Water material with brighter, more vibrant ocean colors
  const material = new THREE.ShaderMaterial({
    vertexShader: waterVertexShader,
    fragmentShader: waterFragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uWaveStrength: { value: 0.7 }, // More gentle waves
      uShallowColor: { value: new THREE.Color(0x87CEEB) }, // Sky blue for crystal clear shallows  
      uDeepColor: { value: new THREE.Color(0x4169E1) },    // Royal blue (brighter)
      uMidColor: { value: new THREE.Color(0x00BFFF) },     // Deep sky blue for mid-depth  
      uCausticsColor: { value: new THREE.Color(0xffffff) }, // Bright white caustics
      uSandColor: { value: new THREE.Color(0xf0e68c) },    // Bright sandy khaki
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

// Neon theme polygon generation functions
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
      case 'topmost':
        y = intersection(y, [-0.5, 0]);
        break;
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
      case 'xcenter':
        x = intersection(x, [0.25, 0.75]);
        break;
      case 'ycenter':
        y = intersection(y, [0.25, 0.75]);
        break;
      case "center":
        x = intersection(x, [0.25, 0.75]);
        y = intersection(y, [0.25, 0.75]);
        break;
      case "full":
        x = intersection(x, [0, 1]);
        y = intersection(y, [0, 1]);
        break;
      default:
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

  // Watch slide changes and update points (like the reference)
  watch(currentSlideNo, () => {
    jumpPoints();
  });

  return poly;
}

// Create polygons for neon theme
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
  <!-- Background color layer (lowest z-index) -->
  <div 
    class="fixed inset-0 pointer-events-none"
    :style="{ 
      backgroundColor: currentTheme === 'neon' ? '#000000' : '#87CEEB',
      zIndex: -20
    }"
    aria-hidden="true"
  ></div>
  
  <!-- Neon theme polygons (matching reference) -->
  <div
    v-if="currentTheme === 'neon'"
    class="bg transform-gpu overflow-hidden pointer-events-none"
    :style="{ filter: `blur(70px) hue-rotate(${hue}deg)` }"
    aria-hidden="true"
  >
    <div
      class="clip"
      :style="{ 
        'clip-path': `polygon(${poly1})`, 
        background: `linear-gradient(to right, ${colorSchemes.layer1.from}, ${colorSchemes.layer1.to})`,
        opacity: opacity
      }"
    />
    <div
      class="clip"
      :style="{ 
        'clip-path': `polygon(${poly2})`, 
        background: `linear-gradient(to left, ${colorSchemes.layer2.from}, ${colorSchemes.layer2.to})`,
        opacity: opacity
      }"
    />
    <div
      class="clip"
      :style="{ 
        'clip-path': `polygon(${poly3})`, 
        background: `linear-gradient(to top, ${colorSchemes.layer3.from}, ${colorSchemes.layer3.to})`,
        opacity: 0.2
      }"
    />
  </div>
  
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
/* Neon theme polygon styles */
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
