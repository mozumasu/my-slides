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
  sans: "Noto Sans JP"
  serif: "Robot Slab"
  mono: "Fira Code"
css: unocss
---

# 自作キーボードに入門した人はどうなる?

<br>

### カスタムキーボードの世界への旅

<div class="pt-12">
  <span @click="$nav.next" class="px-2 py-1 rounded cursor-pointer" hover="bg-white bg-opacity-10">
    Press Space for next page <kbd>space</kbd>
  </span>
</div>

<style>
/* Ocean title effects - blue glow for h1 */
h1 {
  color: #00bfff;
  text-shadow:
    0 0 1px #00bfff,
    0 0 15px #00bfff,
    0 0 8px #4dd0e1,
    0 0 25px #4dd0e1;
  font-weight: 300;
  letter-spacing: 1px;
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

# 自己紹介

<div class="glass max-w-2xl mx-auto">

### もずます

- **エンジニア**として日々コーディング
- **Emacs**使い（だからキーバインドにこだわる）
- **自作キーボード**沼に入って1年
- **3Dプリンター**で色々作るのが好き

</div>

---
layout: default
---

# あなたの沼はどこから？

<div class="mt-8 space-y-6">

<div v-click class="glass">
  <h3 class="text-2xl mb-2">1. 思想が合わない 🤔</h3>
  <p>使わないキーが視界に入るのが許せない...</p>
</div>

<div v-click class="glass">
  <h3 class="text-2xl mb-2">2. 肩と首辛い 😣</h3>
  <p>長時間のコーディングで体がバキバキ...</p>
</div>

<div v-click class="glass">
  <h3 class="text-2xl mb-2">3. 見た目にこだわりたい ✨</h3>
  <p>デスクの上もオシャレにしたい！</p>
</div>

</div>

---
layout: default
---

# 思想が合わない？

<div class="mt-6">

### 使わないキーがポジションを占有しているのが気にくわない

<div class="grid grid-cols-2 gap-6 mt-8">

<div class="glass">
<h4 class="text-xl mb-4">無駄なキーたち</h4>

- <span class="key">Enter</span> → Ctrl + M で代替
- <span class="key">Backspace</span> → Ctrl + H で代替  
- <span class="key">英数/かな</span> → SKKなので不要
- <span class="key">矢印キー</span> → Emacsキーバインド

</div>

<div class="glass">
<h4 class="text-xl mb-4">その他の不満</h4>

- 数字キーが遠い 📏
- 印字は不要 🚫
- → **必要なものだけ視界に入ってほしい**

</div>

</div>

</div>

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
  <p>これ重要！モチベーション爆上がり</p>
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
  <small>（アルファベットは26キー）</small>
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
- → **roBa** を選択！

</div>

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

### 決める順番が重要！

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

### よくある不安 😰

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

<div v-click>

### 解決策：遊舎工房 🎯

<div class="glass">
<h4 class="text-lg mb-3">はんだ付けの練習</h4>

- 基盤込みで **2,500円**
- 丁寧な指導付き
- 失敗しても安心

</div>

<div class="glass mt-4">
<h4 class="text-lg mb-3">その他のサポート</h4>

- 相談にも乗ってくれる
- 工具の貸出あり
- 初心者に優しい環境

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

<div class="glass">
<h4 class="text-lg mb-2">IME</h4>

**SKK** - シンプルな日本語入力

<small>英数/かなキーが不要になる理由</small>

</div>

<div class="mt-8 text-sm opacity-75">
初めての自作キーボード。<br>
ここから沼が始まった...
</div>

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
layout: two-cols
---

# キーバインドの設定

### レイヤー機能の活用

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

::right::

### 使用しないキーの省略

<div class="glass mt-12">
<h4 class="text-lg mb-2">代替キーバインド</h4>

- <span class="key">英数/かな</span> → SKKなので不要
- <span class="key">矢印キー</span> → Emacsのキーバインド
- <span class="key">Enter</span> → Ctrl + M
- <span class="key">Backspace</span> → Ctrl + H

</div>

<div class="glass mt-4">
<h4 class="text-lg mb-2">どうやって決めてる？</h4>

シェルのキーバインドを参考に

```sh
bindkey
```

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

### 自作キーボードは...

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