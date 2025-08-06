// ドメイン層 - 波の純粋なビジネスロジック
export interface WaveColors {
  shallow: string;
  medium: string;
  deep: string;
  background: string;
  rendererBg: number;
}

export interface WaveEffects {
  sparkleIntensity: number;
  glintIntensity: number;
  causticsIntensity: number;
  foamIntensity: number;
  fresnelStrength: number;
  brightnessMultiplier: number;
  saturation: number;
}

export interface WaveSettings {
  colors: WaveColors;
  effects: WaveEffects;
  waveStrength: number;
  opacity: number;
  animationSpeed: number;
}

export type WaveTheme = 'tropical' | 'natural' | 'deep';

// 波のテーマ定義 - 純粋なデータ
export const WAVE_THEMES: Record<WaveTheme, WaveSettings> = {
  tropical: {
    colors: {
      shallow: '#99e8ff',
      medium: '#66ccff',
      deep: '#3399ff',
      background: '#3838ff',
      rendererBg: 0x3838ff
    },
    effects: {
      sparkleIntensity: 6.0,
      glintIntensity: 10.0,
      causticsIntensity: 0.8,
      foamIntensity: 0.25,
      fresnelStrength: 0.7,
      brightnessMultiplier: 1.7,
      saturation: 1.3
    },
    waveStrength: 1.5,
    opacity: 0.95,
    animationSpeed: 0.008
  },
  natural: {
    colors: {
      shallow: '#4DB8DA',
      medium: '#3A9BC1',
      deep: '#2E7BA6',
      background: '#3A9BC1',
      rendererBg: 0x3A9BC1
    },
    effects: {
      sparkleIntensity: 4.0,
      glintIntensity: 6.0,
      causticsIntensity: 0.6,
      foamIntensity: 0.15,
      fresnelStrength: 0.5,
      brightnessMultiplier: 1.25,
      saturation: 1.2
    },
    waveStrength: 1.2,
    opacity: 0.92,
    animationSpeed: 0.008
  },
  deep: {
    colors: {
      shallow: '#1A5F8F',
      medium: '#144766',
      deep: '#0A2A4A',
      background: '#032A4A',
      rendererBg: 0x032A4A
    },
    effects: {
      sparkleIntensity: 2.0,
      glintIntensity: 3.0,
      causticsIntensity: 0.4,
      foamIntensity: 0.1,
      fresnelStrength: 0.3,
      brightnessMultiplier: 1.0,
      saturation: 1.0
    },
    waveStrength: 1.0,
    opacity: 0.98,
    animationSpeed: 0.006
  }
};

// 純粋関数 - HEXから Vec3 変換
export const hexToVec3 = (hex: string): string => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return '0.0, 0.0, 0.0';
  
  const r = parseInt(result[1], 16) / 255;
  const g = parseInt(result[2], 16) / 255;
  const b = parseInt(result[3], 16) / 255;
  
  return `${r.toFixed(3)}, ${g.toFixed(3)}, ${b.toFixed(3)}`;
};

// 純粋関数 - 次のテーマを計算
export const getNextTheme = (current: WaveTheme): WaveTheme => {
  const themes: WaveTheme[] = ['tropical', 'natural', 'deep'];
  const currentIndex = themes.indexOf(current);
  const nextIndex = (currentIndex + 1) % themes.length;
  return themes[nextIndex];
};

// 純粋関数 - テーマの設定を取得
export const getWaveSettings = (theme: WaveTheme): WaveSettings => {
  return WAVE_THEMES[theme];
};