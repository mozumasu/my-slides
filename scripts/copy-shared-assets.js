#!/usr/bin/env node
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync, mkdirSync, copyFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 現在のスライドディレクトリを取得
const slideDir = process.cwd();
const publicImagesDir = join(slideDir, 'public', 'images');

// shared-assetsのパス
const sharedAssetsDir = join(__dirname, '..', 'packages', 'shared-assets', 'images');

// publicディレクトリが存在しない場合は作成
if (!existsSync(publicImagesDir)) {
  mkdirSync(publicImagesDir, { recursive: true });
}

// コピーする画像のリスト
const assetsToSync = [
  {
    from: join(sharedAssetsDir, 'avatars', 'profile_mozumasu.jpeg'),
    to: join(publicImagesDir, 'profile_mozumasu.jpeg')
  }
];

// 画像をコピー
assetsToSync.forEach(({ from, to }) => {
  if (existsSync(from)) {
    copyFileSync(from, to);
    console.log(`✓ Copied: ${from.split('/').slice(-2).join('/')} → ${to.split('/').slice(-2).join('/')}`);
  } else {
    console.warn(`⚠ Warning: Source file not found: ${from}`);
  }
});

console.log('✨ Shared assets sync complete');