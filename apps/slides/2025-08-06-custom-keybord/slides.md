---
# Ocean themed presentation with mozumasu theme
theme: mozumasu
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
  font-size: 3.5rem;
  font-weight: 700;
  letter-spacing: -0.5px;
  margin-bottom: 2rem;
  text-shadow: 
    3px 3px 0 rgba(0, 0, 0, 0.2),
    0 0 20px rgba(255, 255, 255, 0.5);
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
  font-size: 2.5rem;
  color: #ffffff;
  font-weight: 900;
  margin: 0;
  font-family: "Rounded Mplus 1c", "M PLUS Rounded 1c", "Hiragino Maru Gothic ProN", "Hiragino Kaku Gothic ProN", sans-serif;
  text-shadow: 
    3px 3px 0 rgba(0, 0, 0, 0.2),
    0 0 20px rgba(255, 255, 255, 0.5);
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
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 1.5rem;
}

/* Code blocks with glass effect */
.slidev-code {
  background: rgba(15, 23, 42, 0.4) !important;
  backdrop-filter: blur(12px);
  border: 1px solid rgba(100, 116, 139, 0.2);
  font-size: 1.1em !important;
}

pre {
  background: rgba(15, 23, 42, 0.4) !important;
  backdrop-filter: blur(12px);
  border: 1px solid rgba(100, 116, 139, 0.2);
}

/* Keyboard key styling */
.key {
  display: inline-block;
  background: rgba(139, 92, 246, 0.2);
  color: #a78bfa;
  padding: 4px 12px;
  border-radius: 8px;
  border: 1px solid rgba(139, 92, 246, 0.3);
  font-family: "Fira Code", monospace;
  font-size: 0.85em;
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

# Q. <span v-click>あなたの沼はどこから？</span>

---
layout: center
---

# A. <span v-click>私は思想から</span>

---
layout: default
---

# 思想？

<div v-click class="glass">
  <h3 class="text-2xl mb-2">デザインは必要最低限であるべき</h3>
</div>

<div v-click class="glass">
  <h3 class="text-2xl mb-2">→ 使わないキーがポジションを占有しているのが気にくわない
</h3>
</div>

---

<div class="grid grid-cols-2 gap-6 mt-8">

<div class="glass">
<h2 class="text-xl mb-4">使用しないキーたち</h2>

- <span class="key">Enter</span>
- <span class="key">Backspace</span>
- <span class="key">英数/かな</span>
- <span class="key">矢印キー</span>

</div>

<div class="glass">
<h2 class="text-xl mb-4">その他の不満</h2>

- 数字キーが遠い 📏
- 印字は不要 🚫

</div>

</div>

<div v-click class="grid grid-cols-2 gap-6 mt-8">
必要なものだけ視界に入ってほしい</div>

---
layout: center
---

# 自作キーボードのメリット

<div class="mt-8 max-w-3xl mx-auto">

<div v-click class="glass mb-6">
  <h3 class="text-xl mb-2">🎮 ARグラスと組み合わせれば寝ながら作業できる</h3>
  <p>究極のリラックスコーディング環境</p>
</div>

<div v-click class="glass mb-6">
  <h3 class="text-xl mb-2">💪 分割キーボードで肩凝り軽減</h3>
  <p>自然な姿勢で長時間作業も快適に</p>
</div>

<div v-click class="glass mb-6">
  <h3 class="text-xl mb-2">⚡ ホームポジションから離れない</h3>
  <p>レイヤー機能とカスタムキーバインドで効率UP</p>
</div>

<div v-click class="glass">
  <h3 class="text-xl mb-2">😎 かっこいい</h3>
</div>

</div>

---
layout: default
---

# キーボードの選定

<div class="grid grid-cols-2 gap-8 mt-8">

<div class="glass">
<h3 class="text-xl mb-4">考慮すべきポイント</h3>

- **トラックボールの有無** 🖲️
- **キーの数** → 40くらいほしい  
  <small>※ アルファベットは26キー</small>
- **接続方式**  
  Bluetooth or 有線
- **購入形態**  
  組み立て済み or キット or すべて自作

</div>

<div class="glass">
<h3 class="text-xl mb-4">私の選択</h3>

- トラックボール **あり** ✅
- キー数 **42キー**
- **Bluetooth** 接続
- **キット** で購入

</div>

</div>

<div v-click class="glass mt-8 text-center">
→ roBa を選択！
</div>

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

<div class="grid grid-cols-2 gap-8 mt-8">

<div>

## よくある不安 😰

<div class="space-y-3">
<div v-click class="glass">
はんだ付けできるかな... 🔥
</div>

<div v-click class="glass">
コンデンサー？ソケット？<br>なにそれ美味しいの？ 🍕
</div>

<div v-click class="glass">
道具はなにが必要？ 🔧
</div>

<div v-click class="glass">
動かなかったらどうしよう... 😱
</div>
</div>

</div>

<div>

<h2 v-click class="text-xl mb-4">それ、遊舎工房 で解決します 🎯</h2>

<div v-click class="glass">
<h4 class="text-lg mb-3">はんだ付けの練習</h4>

- 基盤込みで **2,500円**
- 丁寧な指導付き

</div>

<div v-click class="glass mt-4">
<h4 class="text-lg mb-3">その他のサポート</h4>

- 相談にも乗ってくれる
- 工具の貸出あり
- 初心者に優しい環境
- 工具のセット売りあり

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

- <span class="key">Enter</span> → Ctrl + M
- <span class="key">Backspace</span> → Ctrl + H

## どうやって決めてるの？

シェルのキーバインドを参考に

```sh
bindkey
```

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

## プリントしたロータリーエンコーダー回らない~~

## 打鍵感がぶにゅんぶにゅん

<div v-click>やすりがけしたらいけた</div>

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

<div class="glass max-w-3xl mx-auto">

### 自作キーボードは

<div class="grid grid-cols-2 gap-6 mt-8">

<div class="text-center">
<h3 class="text-2xl mb-4">🎯 効率的</h3>
自分に最適化された<br>キー配置とバインド
</div>

<div class="text-center">
<h3 class="text-2xl mb-4">💪 健康的</h3>
分割キーボードで<br>肩こり・首こり軽減
</div>

<div class="text-center">
<h3 class="text-2xl mb-4">🎨 創造的</h3>
3Dプリンターやレジンで<br>オリジナルデザイン
</div>

<div class="text-center">
<h3 class="text-2xl mb-4">🌊 深い沼</h3>
一度入ったら<br>抜け出せない...！
</div>

</div>

<div class="mt-8 text-center text-xl">
**あなたも自作キーボードの世界へ！** 🚀
</div>

</div>

---
layout: end
---

# ご清聴ありがとうございました

<div class="text-center mt-8">

### 質問・相談はお気軽に！ 💬

<div class="mt-8 opacity-75">
自作キーボードの沼でお待ちしています 🌊
</div>

</div>
