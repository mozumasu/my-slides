// Neonテーマの設定を管理
export interface NeonGradient {
  from: string;
  to: string;
}

export interface NeonColors {
  layer1: NeonGradient;
  layer2: NeonGradient;
  layer3: NeonGradient;
  layer4?: NeonGradient;
  ocean1?: NeonGradient;
  ocean2?: NeonGradient;
  ocean3?: NeonGradient;
}

export interface NeonEffects {
  blurIntensity: number;
  animationSpeed: number;
  hueRotationRange: number;
  polygonOpacity: number[];
}

export interface NeonSettings {
  colors: NeonColors;
  effects: NeonEffects;
  polygonConfig: {
    counts: number[]; // [10, 6, 3] for poly1, poly2, poly3
    disturbChance: number;
    disturb: number;
    overflow: number;
  };
}

export type NeonTheme = "default" | "cyberpunk" | "synthwave";

export const NEON_THEMES: Record<NeonTheme, NeonSettings> = {
  default: {
    colors: {
      layer1: { from: "#8b5cf6", to: "rgba(255, 255, 255, 0.1)" }, // Purple
      layer2: { from: "#2f96ad", to: "rgba(255, 255, 255, 0.1)" }, // Blue
      layer3: { from: "#d946ef", to: "rgba(255, 255, 255, 0.1)" }, // Magenta
      layer4: { from: "#06b6d4", to: "#67e8f9" },
      ocean1: { from: "#20B2AA", to: "#40E0D0" },
      ocean2: { from: "#00CED1", to: "#48D1CC" },
      ocean3: { from: "#00BFFF", to: "#7FFFD4" },
    },
    effects: {
      blurIntensity: 70,
      animationSpeed: 0.02,
      hueRotationRange: 55, // ±55 degrees
      polygonOpacity: [0.2, 0.2, 0.2], // opacity for each layer
    },
    polygonConfig: {
      counts: [10, 6, 3],
      disturbChance: 0.125,
      disturb: 0.5,
      overflow: 0.15,
    },
  },

  cyberpunk: {
    colors: {
      layer1: { from: "#ff00ff", to: "rgba(255, 0, 255, 0.1)" }, // Magenta
      layer2: { from: "#00ffff", to: "rgba(0, 255, 255, 0.1)" }, // Cyan
      layer3: { from: "#ffff00", to: "rgba(255, 255, 0, 0.1)" }, // Yellow
      layer4: { from: "#ff0080", to: "#80ff00" },
    },
    effects: {
      blurIntensity: 80,
      animationSpeed: 0.025,
      hueRotationRange: 90,
      polygonOpacity: [0.25, 0.2, 0.15],
    },
    polygonConfig: {
      counts: [12, 8, 4],
      disturbChance: 0.15,
      disturb: 0.6,
      overflow: 0.2,
    },
  },

  synthwave: {
    colors: {
      layer1: { from: "#ff006e", to: "rgba(255, 0, 110, 0.1)" }, // Pink
      layer2: { from: "#8338ec", to: "rgba(131, 56, 236, 0.1)" }, // Purple
      layer3: { from: "#3a86ff", to: "rgba(58, 134, 255, 0.1)" }, // Blue
      layer4: { from: "#fb5607", to: "#ffbe0b" },
    },
    effects: {
      blurIntensity: 60,
      animationSpeed: 0.015,
      hueRotationRange: 40,
      polygonOpacity: [0.3, 0.25, 0.2],
    },
    polygonConfig: {
      counts: [8, 5, 3],
      disturbChance: 0.1,
      disturb: 0.4,
      overflow: 0.1,
    },
  },
};

// 次のNeonテーマを取得
export const getNextNeonTheme = (current: NeonTheme): NeonTheme => {
  const themes: NeonTheme[] = ["default", "cyberpunk", "synthwave"];
  const currentIndex = themes.indexOf(current);
  const nextIndex = (currentIndex + 1) % themes.length;
  return themes[nextIndex];
};

// OceanテーマのカラースキームをNeon形式に変換（互換性のため）
export const getOceanColorScheme = (): NeonColors => {
  return {
    layer1: { from: "#006994", to: "#4682B4" }, // Deep ocean blue
    layer2: { from: "#20B2AA", to: "#48D1CC" }, // Light sea green
    layer3: { from: "#00CED1", to: "#40E0D0" }, // Dark turquoise
    layer4: { from: "#7FFFD4", to: "#66CDAA" }, // Aquamarine
    ocean1: { from: "#50C878", to: "#00C957" }, // Emerald green
    ocean2: { from: "#87CEEB", to: "#B0E0E6" }, // Sky blue
    ocean3: { from: "#00BFFF", to: "#1E90FF" }, // Deep sky blue
  };
};

