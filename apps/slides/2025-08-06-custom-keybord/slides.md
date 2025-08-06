---
# Ocean themed presentation with mozumasu theme
theme: mozumasu
themeConfig:
  primary: '#ff6b35'
# Ocean wave background is provided by the theme
title: 自作キーボードに入門した人はどうなる?
info: |
  ## 自作キーボードに入門した人はどうなる?
  カスタムキーボードの世界への旅

  あなたの理想のキーボードを見つけよう
class: text-center
highlighter: shiki
drawings:
  enabled: true
  persist: false
transition: slide-left
mdc: true
colorSchema: light
fonts:
  sans: "M PLUS Rounded 1c, Noto Sans JP"
  serif: "Robot Slab"
  mono: "Fira Code"
css: unocss
---

<style global>
/* Global font size adjustments */
body {
  font-size: 1.1rem;
  line-height: 1.6;
}

p {
  font-size: 1.1rem;
  line-height: 1.6;
}

li {
  font-size: 1.2rem;
  line-height: 1.8;
}

h1 {
  font-size: 3rem !important;
  color: #ffffff !important;
  z-index: 10;
  position: relative;
}

h2 {
  font-size: 2rem !important;
  color: #ffffff !important;
  z-index: 10;
  position: relative;
}

h3 {
  font-size: 1.5rem !important;
  color: #ffffff !important;
  z-index: 10;
  position: relative;
}

/* Ensure text is visible on ocean background */
.slidev-layout {
  color: #ffffff !important;
}

/* Fix for center layout slides */
.slidev-layout[layout="center"] {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

/* Override theme text colors */
.slidev-page-4 h1,
.slidev-page-5 h1,
.slidev-page-6 h1,
.slidev-page-7 h1,
.slidev-page-8 h1,
.slidev-page-9 h1,
.slidev-page-10 h1 {
  color: #ffffff !important;
}

/* Ensure all text elements are visible */
.slidev-layout p,
.slidev-layout li,
.slidev-layout span,
.slidev-layout div {
  color: #ffffff;
}

/* Fix for default layout */
.slidev-layout[layout="default"] {
  padding: 4rem 6rem;
}

/* Ensure headings are properly styled */
.slidev-layout h1,
.slidev-layout h2,
.slidev-layout h3 {
  color: #ffffff !important;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}
</style>

---

# ようこそ、<span class="gradient-text">自作キーボード沼</span>へ

<div class="flex flex-col items-center justify-center h-60">
  <div class="wave-container">
    <h2 class="subtitle">mozumasu</h2>
  </div>
  
  <div class="keyboard-icon">
    <span class="key-icon">⌨️</span>
  </div>
</div>

<style>
@import url('https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@900&display=swap');

/* Ocean title effects - blue glow for h1 */
h1 {
  color: #ffffff;
  font-size: 3rem;
  font-weight: 700;
  letter-spacing: -0.5px;
  margin-bottom: 1.5rem;
  text-shadow: 
    2px 2px 4px rgba(0, 0, 0, 0.5),
    0 0 15px rgba(0, 0, 0, 0.3);
}

/* Gradient text effect */
.gradient-text {
  background: linear-gradient(135deg, #ff6b35 0%, #ff9800 30%, #ffc107 60%, #ffeb3b 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 800;
}

/* Subtitle styling */
.subtitle {
  font-size: 2rem;
  color: #ffffff;
  font-weight: 900;
  margin: 0;
  font-family: "Rounded Mplus 1c", "M PLUS Rounded 1c", "Hiragino Maru Gothic ProN", "Hiragino Kaku Gothic ProN", sans-serif;
  text-shadow: 
    2px 2px 4px rgba(0, 0, 0, 0.5),
    0 0 10px rgba(0, 0, 0, 0.3);
  letter-spacing: 0.05em;
  animation: fadeInUp 1s ease-out 0.5s both;
}

/* Wave container */
.wave-container {
  position: relative;
  padding: 2rem;
}

/* Keyboard icon animation */
.keyboard-icon {
  margin-top: 3rem;
  animation: float 3s ease-in-out infinite;
}

.key-icon {
  font-size: 4rem;
}

/* Next button styling */
.next-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 2rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.next-button:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

.next-button kbd {
  padding: 0.25rem 0.5rem;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 0.25rem;
  font-size: 0.8rem;
  font-family: "Fira Code", monospace;
}

/* Animations */

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

/* Enhanced glass morphism for content */
.glass {
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  padding: 1.5rem;
  font-size: 1rem;
  line-height: 1.6;
  color: #ffffff;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
}

/* Glass morphism for entire section */
.glass-section {
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
}

/* Glass morphism for individual items within glass section */
.glass-item {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 1rem;
  font-size: 1rem;
  line-height: 1.6;
  color: #ffffff;
  box-shadow: 0 4px 16px 0 rgba(31, 38, 135, 0.2);
}

/* Code blocks with glass effect */
.slidev-code {
  background: rgba(15, 23, 42, 0.8) !important;
  backdrop-filter: blur(25px);
  -webkit-backdrop-filter: blur(25px);
  border: 1px solid rgba(100, 116, 139, 0.3);
  font-size: 0.9em !important;
}

pre {
  background: rgba(15, 23, 42, 0.8) !important;
  backdrop-filter: blur(12px);
  border: 1px solid rgba(100, 116, 139, 0.3);
  font-size: 0.9rem !important;
}

/* Keyboard key styling */
.key {
  display: inline-block;
  background: rgba(139, 92, 246, 0.3);
  color: #c4b5fd;
  padding: 6px 14px;
  border-radius: 6px;
  border: 1px solid rgba(139, 92, 246, 0.5);
  font-family: "Fira Code", monospace;
  font-size: 1em;
  font-weight: 500;
  margin: 0 4px;
}
</style>

---
layout: center
---

<script setup>
import SelfIntroduction from '@mozumasu/shared-components/slides/SelfIntroduction.vue'
</script>

<SelfIntroduction theme="ocean" profileImage="/images/profile_mozumasu.jpeg" />

---
layout: center
---

# Q. <span v-click class="gradient-text">あなたの沼はどこから？</span>

<style scoped>
h1 {
  font-size: 2.5rem;
  text-shadow: 
    3px 3px 0 rgba(0, 0, 0, 0.2),
    0 0 20px rgba(255, 255, 255, 0.5);
  animation: fadeInScale 0.8s ease-out;
}

@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>

---
layout: center
---

# A. <span v-click class="gradient-text">私は思想から</span>

<style scoped>
h1 {
  font-size: 2.5rem;
  text-shadow: 
    3px 3px 0 rgba(0, 0, 0, 0.2),
    0 0 20px rgba(255, 255, 255, 0.5);
  animation: fadeInScale 0.8s ease-out;
}

@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>

---
layout: default
---

# 思想？

<div v-click class="glass glow-box">
  <h3 class="text-2xl mb-2 font-bold">デザインは必要最低限であるべき</h3>
</div>

<div v-click class="glass glow-box mt-6">
  <h3 class="text-2xl mb-2">→ 使わないキーがポジションを占有しているのが<span class="gradient-text">気にくわない</span>
</h3>
</div>

<style scoped>
h1 {
  text-shadow: 
    3px 3px 0 rgba(0, 0, 0, 0.2),
    0 0 20px rgba(255, 255, 255, 0.5);
  margin-bottom: 3rem;
}

.glow-box {
  transition: all 0.3s ease;
}

.glow-box:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(0, 191, 255, 0.3);
}
</style>

---

<div class="grid grid-cols-2 gap-6 mt-8">

<div v-click class="glass glow-box">
<h2 class="text-2xl mb-4 gradient-text">使用しないキーたち</h2>

<ul class="space-y-4 text-2xl">
<li v-click="1"><span class="key text-xl">Enter</span></li>
<li v-click="2"><span class="key text-xl">Backspace</span></li>
<li v-click="3"><span class="key text-xl">英数/かな</span></li>
<li v-click="4"><span class="key text-xl">矢印キー</span></li>
</ul>

</div>

<div v-click="5" class="glass glow-box">
<h2 class="text-2xl mb-4 gradient-text">その他の不満</h2>

<ul class="space-y-4 text-2xl">
<li v-click="6">数字キーが遠い 📏</li>
<li v-click="7">印字は不要 🚫</li>
</ul>

</div>

</div>

<div v-click="8" class="mt-12 text-center">
<p class="text-2xl font-bold gradient-text animate-pulse">必要なものだけ視界に入ってほしい</p>
</div>

<style scoped>
.glow-box {
  transition: all 0.3s ease;
}

.glow-box:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(0, 191, 255, 0.3);
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
}

.animate-pulse {
  animation: pulse 2s ease-in-out infinite;
}
</style>

---
layout: center
---

# 自作キーボードの<span class="gradient-text">メリット</span>

<div class="mt-8 max-w-3xl mx-auto">

<div v-click="1" class="glass mb-6 benefit-card">
  <h3 class="text-2xl mb-2">🎮 ARグラスと組み合わせれば寝ながら作業できる</h3>
  <p class="text-base opacity-90">究極のリラックスコーディング環境</p>
</div>

<div v-click="2" class="glass mb-6 benefit-card">
  <h3 class="text-2xl mb-2">💪 分割キーボードで肩凝り軽減</h3>
  <p class="text-base opacity-90">自然な姿勢で長時間作業も快適に</p>
</div>

<div v-click="3" class="glass mb-6 benefit-card">
  <h3 class="text-2xl mb-2">⚡ ホームポジションから離れない</h3>
  <p class="text-base opacity-90">レイヤー機能とカスタムキーバインドで効率UP</p>
</div>

<div v-click="4" class="glass benefit-card special">
  <h3 class="text-3xl mb-2 gradient-text font-bold">😎 かっこいい</h3>
</div>

</div>

<style scoped>
h1 {
  text-shadow: 
    3px 3px 0 rgba(0, 0, 0, 0.2),
    0 0 20px rgba(255, 255, 255, 0.5);
  margin-bottom: 2rem;
}

.benefit-card {
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.benefit-card::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(45deg, transparent, rgba(255, 191, 0, 0.3), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.benefit-card:hover {
  transform: translateX(10px);
  box-shadow: -5px 5px 20px rgba(0, 191, 255, 0.3);
}

.benefit-card:hover::before {
  opacity: 1;
}

.special {
  animation: glow 2s ease-in-out infinite;
}

@keyframes glow {
  0%, 100% {
    box-shadow: 0 0 20px rgba(255, 191, 0, 0.4);
  }
  50% {
    box-shadow: 0 0 30px rgba(255, 191, 0, 0.6);
  }
}
</style>

---
layout: default
---

# キーボードの<span class="gradient-text">選定</span>

<div class="grid grid-cols-2 gap-8 mt-8">

<div v-click="1" class="glass selection-card">
<h3 class="text-2xl mb-4 font-bold">考慮すべきポイント</h3>

<ul class="space-y-3 text-lg">
<li v-click="2">• <strong>トラックボールの有無</strong> 🖲️</li>
<li v-click="3">• <strong>キーの数</strong> → 40くらいほしい<br>
  <small class="ml-4 opacity-80 text-base">※ アルファベットは26キー</small></li>
<li v-click="4">• <strong>接続方式</strong><br>
  <span class="ml-4 text-base">Bluetooth or 有線</span></li>
<li v-click="5">• <strong>購入形態</strong><br>
  <span class="ml-4 text-base">組み立て済み or キット or すべて自作</span></li>
</ul>

</div>

<div v-click="6" class="glass selection-card highlight">
<h3 class="text-2xl mb-4 gradient-text font-bold">私の選択</h3>

<ul class="space-y-3 text-lg">
<li>• トラックボール <strong class="text-green-400 text-xl">あり</strong> ✅</li>
<li>• キー数 <strong class="text-green-400 text-xl">42キー</strong></li>
<li>• <strong class="text-green-400 text-xl">Bluetooth</strong> 接続</li>
<li>• <strong class="text-green-400 text-xl">キット</strong> で購入</li>
</ul>

</div>

</div>

<div v-click="7" class="glass mt-8 text-center result-box">
<p class="text-3xl font-bold">→ <span class="gradient-text">roBa</span> を選択！</p>
</div>

<style scoped>
h1 {
  text-shadow: 
    3px 3px 0 rgba(0, 0, 0, 0.2),
    0 0 20px rgba(255, 255, 255, 0.5);
}

.selection-card {
  transition: all 0.3s ease;
}

.selection-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 191, 255, 0.3);
}

.highlight {
  border: 2px solid rgba(255, 191, 0, 0.5);
  animation: borderGlow 2s ease-in-out infinite;
}

@keyframes borderGlow {
  0%, 100% {
    border-color: rgba(255, 191, 0, 0.3);
  }
  50% {
    border-color: rgba(255, 191, 0, 0.7);
  }
}

.result-box {
  animation: slideInUp 0.6s ease-out;
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

---
layout: default
---

# 選定ポイント

<div class="mt-8">

### この2つのどちらを選ぶかで必要なキー数が変わる

<div class="grid grid-cols-2 gap-8 mt-8">

<div class="glass text-center">
<h3 class="text-2xl mb-4">ホームポジションから<br>離れたくない 🏠</h3>

↓

**キー数が少ない**キーボード

<div class="mt-4 text-sm">
レイヤー機能を駆使して<br>
少ないキーで全てをカバー
</div>
</div>

<div class="glass text-center">
<h3 class="text-2xl mb-4">同時押しするキーを<br>減らしたい 👆</h3>

↓

**キー数が多い**キーボード

<div class="mt-4 text-sm">
専用キーを増やして<br>
複雑な同時押しを回避
</div>
</div>

</div>

<div v-click class="glass mt-8 text-center">
💡 個人的には <strong>3つまで</strong>なら同時押しに耐えられる
</div>

</div>

---
layout: default
---

# 選定における注意事項

<div class="grid grid-cols-3 gap-6 mt-8">

<div class="glass">
<h3 class="text-lg mb-3">自分で選ぶ必要があるもの</h3>

- キーキャップ
- キースイッチ

</div>

<div class="glass">
<h3 class="text-lg mb-3">キットに入っているもの</h3>

- 基盤
- ケース  
  <small>（ロープロファイル対応は要確認）</small>
- キーソケット  
  <small>（ロープロファイル対応は要確認）</small>

</div>

<div class="glass">
<h3 class="text-lg mb-3">別途購入が必要かも</h3>

- マイコン
- トラックボール
- バッテリー

</div>

</div>

---
layout: default
---

# 選定にあたり知っておくべきこと

<div class="mt-6">

### 決める順番が重要

<div class="flex flex-col items-center mt-8 space-y-4">

<div class="glass w-full max-w-md text-center">
<strong>1. 分割 or 一体型</strong>
</div>

<div class="text-2xl">↓</div>

<div class="glass w-full max-w-md text-center">
<strong>2. トラックボールの有無</strong>
</div>

<div class="text-2xl">↓</div>

<div class="glass w-full max-w-md text-center">
<strong>3. キーの高さ</strong><br>
ロープロファイル or フルハイト
</div>

<div class="text-2xl">↓</div>

<div class="glass w-full max-w-md text-center">
<strong>ここで以下が決まる</strong><br>
キーキャップ・キースイッチ・キーソケット
</div>

</div>

</div>

---
layout: default
---

# 自作キーボードの不安

<div class="glass-section mt-8">
<div class="grid grid-cols-2 gap-8 p-8">

<div>

## よくある不安 😰

<div class="space-y-3">
<div v-click class="glass-item">
はんだ付けできるかな... 🔥
</div>

<div v-click class="glass-item">
コンデンサー？ソケット？<br>なにそれ美味しいの？ 🍕
</div>

<div v-click class="glass-item">
道具はなにが必要？ 🔧
</div>

<div v-click class="glass-item">
動かなかったらどうしよう... 😱
</div>
</div>

</div>

<div>

<h2 v-click class="text-xl mb-4">それ、遊舎工房 で解決します 🎯</h2>

<div v-click class="glass-item">
<h4 class="text-lg mb-3">はんだ付けの練習</h4>

- 基盤込みで **2,500円**
- 丁寧な指導付き

</div>

<div v-click class="glass-item mt-4">
<h4 class="text-lg mb-3">その他のサポート</h4>

- 相談にも乗ってくれる
- 工具の貸出あり
- 初心者に優しい環境
- 工具のセット売りあり

</div>

</div>

</div>
</div>

---
layout: image-right
image: /images/first-keyboard.jpg
---

# 完成したキーボード

<div class="pr-4">

### 初号機の仕様

<div class="glass mb-6">
<h4 class="text-lg mb-2">キーボード</h4>

**roBa** - 42キー分割キーボード

</div>

<div class="mt-8 text-sm opacity-75">
初めての自作キーボード。<br>
ここから沼が始まった...
</div>

</div>

---
layout: center
---

<div>
- おゆまる + レジン でキーキャップを作成
<p v-click class="glass mt-4"> 軸が安定せず断念😢 </p>
 </div>

<div v-click>
- A1 miniを購入
</div>

<div v-click>
- 3Dプリンターでケースを作成
</div>

<div v-click>
- 3Dプリンターでキーキャップを作成
</div>
<div v-click>
- 3Dプリンターで作成したキーキャップ + レジン
</div>

---
layout: image-right
image: /images/second-keyboard.jpg
---

# 完成したキーボード ver.2

<div class="pr-4">

### アップグレード内容

<div class="glass mb-4">
<h4 class="text-lg mb-2">3Dプリンターでケース作成</h4>

yamaryu211さんの3Dデータを<br>使用させていただいてます🙏

<small>
<a href="https://github.com/yamaryu211/zmk-config-roBa/tree/main/model/case/forLP_yamaryu211/v4" target="_blank" class="text-blue-300">
GitHub: zmk-config-roBa
</a>
</small>
</div>

<div class="glass">
<h4 class="text-lg mb-2">レジンでキーキャップをカスタマイズ</h4>

オリジナルデザインで<br>
世界に一つだけのキーボードに！

</div>

</div>

---
layout: default
---

# 3Dプリンターはいいぞ

<div class="grid grid-cols-2 gap-8 mt-8">

<div class="text-center">
<img src="/images/air-pods-pro-case.jpg" class="rounded-lg shadow-lg mb-4" />
<p class="glass">AirPods Proケース</p>
</div>

<div class="text-center">
<img src="/images/3d-printer-sample.jpg" class="rounded-lg shadow-lg mb-4" />
<p class="glass">その他作品たち</p>
</div>

</div>

<div v-click class="glass mt-8 text-center">
キーボード以外にも色々作れて楽しい！ 🎨
</div>

---
layout: center
---

# キーバインドの沼

---
layout: two-cols
---

# キーバインドの設定

## レイヤー機能の活用

<div class="glass mt-4">
<h4 class="text-lg mb-2">別レイヤーに割り当て</h4>

- 数字キー（0-9）
- ファンクションキー（F1~F12）

</div>

<div class="glass mt-4">
<h4 class="text-lg mb-2">Hold機能を使う</h4>

- <span class="key">Ctrl</span> - 長押しで有効
- レイヤーキー - 押している間だけ切替

</div>

---
layout: default
---

## 使用しないキーの省略

<div class="glass mt-12">
<h4 class="text-lg mb-2">代替キーバインド</h4>

- <span class="key">英数/かな</span> → control + j, l (SKK)
- <span class="key">矢印キー</span> → control + n/p/f/b (Emacs)
- <span class="key">Enter</span> → Ctrl + M
- <span class="key">Backspace</span> → Ctrl + H

</div>

---
layout: center
---

<div class="glass-section">
<div class="p-8">

<div class="glass-item mb-6">
<ul class="text-xl space-y-2">
<li><span class="key">Enter</span> → Ctrl + M</li>
<li><span class="key">Backspace</span> → Ctrl + H</li>
</ul>
</div>

<h2 class="text-2xl mb-4 gradient-text">どうやって決めてるの？</h2>

<div class="glass-item">
<p class="text-xl mb-4">シェルのキーバインドを参考に</p>

```sh
bindkey
```
</div>

</div>
</div>

---
layout: default
---

# キーバインド設定で苦戦したこと

<div class="space-y-6 mt-8">

<div class="glass">
<h3 class="text-xl mb-2">ファームウェア: ZMK</h3>

**macのfnキーがない** 😅  
→ 音量の調整などfn機能を個別に指定

</div>

<div class="glass">
<h3 class="text-xl mb-2">日本語配列に対応していない</h3>

→ ブラウザでは確認のみ行い、直接設定ファイルを書き換え

</div>

<div class="glass">
<h3 class="text-xl mb-2">キー入力がうまくいかない</h3>

- オートマウスレイヤーが有効になってしまうので調整
- デフォルトのCombo設定が入力の邪魔をしていたので削除

</div>

</div>

---
layout: default
---

# 苦労したこと

<div class="space-y-8 mt-12">

<div v-click="1" class="glass trouble-card">
<h3 class="text-2xl mb-2">🔄 プリントしたロータリーエンコーダー回らない〜〜</h3>
</div>

<div v-click="2" class="glass trouble-card">
<h3 class="text-2xl mb-2">🤔 打鍵感がぶにゅんぶにゅん</h3>
</div>

<div v-click="3" class="mt-8 text-center">
<p class="text-3xl gradient-text font-bold animate-bounce">✨ やすりがけしたらいけた！</p>
</div>

</div>

<style scoped>
h1 {
  text-shadow: 
    3px 3px 0 rgba(0, 0, 0, 0.2),
    0 0 20px rgba(255, 255, 255, 0.5);
}

.trouble-card {
  transition: all 0.3s ease;
  border-left: 4px solid rgba(255, 107, 53, 0.7);
}

.trouble-card:hover {
  transform: translateX(10px);
  border-left-color: rgba(255, 191, 0, 1);
  box-shadow: -5px 5px 20px rgba(255, 191, 0, 0.3);
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-bounce {
  animation: bounce 1s ease-in-out infinite;
}
</style>

---
layout: center
---

# トラブルシューティング

<div class="glass max-w-2xl mx-auto">

### KeyCastrでe-typing 🎯

<div class="mt-6 text-lg">

キー入力の可視化ツールで<br>
実際の入力を確認しながらデバッグ

<div class="mt-6">
<a href="https://github.com/keycastr/keycastr" target="_blank" class="text-blue-300">
github.com/keycastr/keycastr
</a>
</div>

<div class="mt-6 text-sm opacity-75">
e-typingで練習しながら<br>
キーバインドの調整を行うのがおすすめ
</div>

</div>

</div>

---
layout: center
---

# まとめ

<div class="glass max-w-3xl mx-auto summary-container">

<h3 class="text-center text-3xl mb-8 gradient-text">自作キーボードは...</h3>

<div class="grid grid-cols-2 gap-6">

<div v-click="1" class="text-center summary-card">
<h3 class="text-3xl mb-4">🎯 効率的</h3>
<p class="text-lg">自分に最適化された<br>キー配置とバインド</p>
</div>

<div v-click="2" class="text-center summary-card">
<h3 class="text-3xl mb-4">💪 健康的</h3>
<p class="text-lg">分割キーボードで<br>肩こり・首こり軽減</p>
</div>

<div v-click="3" class="text-center summary-card">
<h3 class="text-3xl mb-4">🎨 創造的</h3>
<p class="text-lg">3Dプリンターやレジンで<br>オリジナルデザイン</p>
</div>

<div v-click="4" class="text-center summary-card special-card">
<h3 class="text-3xl mb-4 gradient-text">🌊 深い沼</h3>
<p class="font-bold text-lg">一度入ったら<br>抜け出せない...！</p>
</div>

</div>

<div v-click="5" class="mt-12 text-center">
<p class="text-3xl font-bold cta-text">
あなたも<span class="gradient-text">自作キーボード</span>の世界へ！ 🚀
</p>
</div>

</div>

<style scoped>
h1 {
  text-shadow: 
    3px 3px 0 rgba(0, 0, 0, 0.2),
    0 0 20px rgba(255, 255, 255, 0.5);
  margin-bottom: 2rem;
}

.summary-container {
  padding: 2rem;
  position: relative;
  overflow: hidden;
}

.summary-container::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255, 191, 0, 0.1) 0%, transparent 70%);
  animation: rotate 20s linear infinite;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.summary-card {
  background: rgba(255, 255, 255, 0.05);
  padding: 1.5rem;
  border-radius: 12px;
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;
}

.summary-card:hover {
  transform: translateY(-5px) scale(1.05);
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 10px 30px rgba(0, 191, 255, 0.3);
}

.special-card {
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    box-shadow: 0 0 20px rgba(255, 191, 0, 0.4);
  }
  50% {
    box-shadow: 0 0 30px rgba(255, 191, 0, 0.6);
  }
}

.cta-text {
  animation: slideInUp 0.8s ease-out;
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

---
layout: end
---

# <span class="gradient-text">ご清聴ありがとうございました</span>

<div class="text-center mt-12">

<h3 class="text-3xl mb-8 font-bold">質問・相談はお気軽に！ 💬</h3>

<div class="mt-8 end-message">
<p class="text-2xl">自作キーボードの<span class="gradient-text font-bold">沼</span>でお待ちしています 🌊</p>
</div>

</div>

<style scoped>
h1 {
  font-size: 4.5rem;
  text-shadow: 
    3px 3px 0 rgba(0, 0, 0, 0.2),
    0 0 20px rgba(255, 255, 255, 0.5);
  animation: fadeInScale 1s ease-out;
}

h3 {
  animation: fadeInUp 1s ease-out 0.5s both;
}

.end-message {
  animation: fadeInUp 1s ease-out 1s both;
}

@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
