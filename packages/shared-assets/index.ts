// 共有アセット管理 - 型安全なアセット参照
export const ASSETS = {
  images: {
    // プロフィール関連
    avatars: {
      mozumasu: '/images/avatars/mozumasu.png',
      // 他のアバター...
    },
    
    // ロゴ・ブランド関連
    logos: {
      company: '/images/logos/company.svg',
      personal: '/images/logos/personal.svg',
      // 他のロゴ...
    },
    
    // スライド用画像
    slides: {
      backgrounds: {
        ocean: '/images/slides/backgrounds/ocean.jpg',
        tech: '/images/slides/backgrounds/tech.jpg',
      },
      diagrams: {
        architecture: '/images/slides/diagrams/architecture.svg',
      },
      screenshots: {
        // スクリーンショット...
      }
    },
    
    // ブログ用画像  
    blog: {
      thumbnails: {
        // サムネイル...
      },
      posts: {
        // 記事内画像...
      }
    },
    
    // 共通画像
    common: {
      icons: {
        github: '/images/common/icons/github.svg',
        twitter: '/images/common/icons/twitter.svg',
        linkedin: '/images/common/icons/linkedin.svg',
      },
      patterns: {
        noise: '/images/common/patterns/noise.png',
      }
    }
  },
  
  // アイコンフォント
  icons: {
    feather: '/icons/feather',
    heroicons: '/icons/heroicons',
  },
  
  // フォント
  fonts: {
    inter: '/fonts/Inter',
    firaCode: '/fonts/FiraCode',
  }
} as const;

// 型安全性のための型定義
export type AssetPath = typeof ASSETS;
export type ImagePath = AssetPath['images'];
export type SlideImagePath = ImagePath['slides'];
export type BlogImagePath = ImagePath['blog'];
export type CommonImagePath = ImagePath['common'];

// ヘルパー関数
export const getAssetUrl = (path: string, baseUrl = '') => {
  return `${baseUrl}${path}`;
};

// 環境別のベースURL設定
export const getAssetBaseUrl = () => {
  if (typeof window !== 'undefined') {
    // ブラウザ環境
    return window.location.origin;
  }
  
  // Node.js環境（ビルド時など）
  return process.env.ASSET_BASE_URL || '';
};

// 完全なアセットURL取得
export const getFullAssetUrl = (path: string) => {
  return getAssetUrl(path, getAssetBaseUrl());
};