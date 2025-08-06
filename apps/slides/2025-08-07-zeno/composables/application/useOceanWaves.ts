// アプリケーション層 - ユースケース実装
import { ref, computed, onMounted, onUnmounted, readonly, type Ref } from 'vue';
import * as THREE from 'three';
import { 
  WaveTheme, 
  getWaveSettings, 
  getNextTheme,
  WAVE_THEMES 
} from '../domain/OceanWave';
import { 
  createOceanRenderer,
  createOceanCamera,
  createWaterMesh,
  RendererConfig 
} from '../infrastructure/OceanRenderer';

// ユースケース: 海の波アニメーションを管理
export const useOceanWaves = (canvasRef: Ref<HTMLCanvasElement | undefined>) => {
  // アプリケーション状態
  const currentTheme = ref<WaveTheme>('tropical');
  const isAnimating = ref(false);
  const animationTime = ref(0);
  
  // Three.js オブジェクト
  let scene: THREE.Scene | null = null;
  let camera: THREE.PerspectiveCamera | null = null;
  let renderer: THREE.WebGLRenderer | null = null;
  let waterMesh: THREE.Mesh | null = null;
  let animationId: number | null = null;
  
  // 計算プロパティ
  const waveConfig = computed(() => getWaveSettings(currentTheme.value));
  
  // ユースケース: レンダラーを初期化
  const initializeRenderer = (): boolean => {
    if (!canvasRef.value) {
      console.warn('Canvas element not available');
      return false;
    }
    
    try {
      const config: RendererConfig = {
        canvas: canvasRef.value,
        backgroundColor: waveConfig.value.colors.rendererBg
      };
      
      renderer = createOceanRenderer(config);
      camera = createOceanCamera();
      scene = new THREE.Scene();
      
      return true;
    } catch (error) {
      console.error('Failed to initialize renderer:', error);
      return false;
    }
  };
  
  // ユースケース: 水面メッシュを作成
  const createWaterSurface = (): boolean => {
    if (!scene) {
      console.warn('Scene not initialized');
      return false;
    }
    
    try {
      waterMesh = createWaterMesh(waveConfig.value);
      scene.add(waterMesh);
      return true;
    } catch (error) {
      console.error('Failed to create water surface:', error);
      return false;
    }
  };
  
  // ユースケース: アニメーションを開始
  const startAnimation = (): void => {
    if (!renderer || !scene || !camera || !waterMesh) {
      console.warn('Required objects not initialized');
      return;
    }
    
    if (isAnimating.value) {
      console.warn('Animation already running');
      return;
    }
    
    isAnimating.value = true;
    
    const animate = () => {
      if (!isAnimating.value) return;
      
      animationTime.value += waveConfig.value.animationSpeed;
      
      const material = waterMesh!.material as THREE.ShaderMaterial;
      if (material && material.uniforms.uTime) {
        material.uniforms.uTime.value = animationTime.value;
      }
      
      renderer!.render(scene!, camera!);
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
  };
  
  // ユースケース: アニメーションを停止
  const stopAnimation = (): void => {
    isAnimating.value = false;
    if (animationId !== null) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }
  };
  
  // ユースケース: リソースをクリーンアップ
  const cleanup = (): void => {
    stopAnimation();
    
    if (waterMesh) {
      if (waterMesh.geometry) waterMesh.geometry.dispose();
      if (waterMesh.material) {
        const material = waterMesh.material as THREE.ShaderMaterial;
        material.dispose();
      }
      if (scene) scene.remove(waterMesh);
      waterMesh = null;
    }
    
    if (renderer) {
      renderer.dispose();
      renderer = null;
    }
    
    scene = null;
    camera = null;
  };
  
  // ユースケース: 波のテーマを切り替え
  const switchTheme = (): void => {
    const nextTheme = getNextTheme(currentTheme.value);
    currentTheme.value = nextTheme;
    
    console.log('Wave theme switched to:', nextTheme);
    
    // シーンを再構築
    cleanup();
    setTimeout(() => {
      if (initialize()) {
        startAnimation();
      }
    }, 100);
  };
  
  // ユースケース: システム全体を初期化
  const initialize = (): boolean => {
    try {
      if (!initializeRenderer()) return false;
      if (!createWaterSurface()) return false;
      return true;
    } catch (error) {
      console.error('Failed to initialize ocean waves:', error);
      cleanup();
      return false;
    }
  };
  
  // ユースケース: サイズ変更に対応
  const handleResize = (): void => {
    if (!renderer || !camera) return;
    
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  };
  
  // ライフサイクル管理
  onMounted(() => {
    if (initialize()) {
      startAnimation();
    }
    
    window.addEventListener('resize', handleResize);
  });
  
  onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
    cleanup();
  });
  
  // 公開API
  return {
    // 状態
    currentTheme: readonly(currentTheme),
    isAnimating: readonly(isAnimating),
    
    // アクション
    switchTheme,
    startAnimation,
    stopAnimation,
    
    // 設定
    waveConfig: readonly(waveConfig),
    availableThemes: Object.keys(WAVE_THEMES) as WaveTheme[]
  };
};