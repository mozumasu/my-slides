---
theme: default
title: 楽しくインフラ入門するために
info: |
  ## インフラエンジニア4ヶ月目の学び
  WeztermとNeovimはいいぞ

class: text-center
# https://sli.dev/features/drawing
drawings:
  persist: true
# slide transition: https://sli.dev/guide/animations.html#slide-transitions
transition: slide-left
# enable MDC Syntax: https://sli.dev/features/mdc
mdc: true
overviewSnapshots: true

fonts:
  # basically the text
  sans: "Noto Sans JP"
  # sans: "Klee One"
  # use with `font-serif` css class from windicss
  serif: "Robot Slab"
  # for code blocks, inline code, etc.
  mono: "Fira Code"
---

# 楽しいインフラ入門

## インフラを楽しむための知識たち

めぐろLT #22 「LT忘年会2024」

<div class="pt-12">
  <span class="px-2 py-1 rounded cursor-pointer" hover="bg-white bg-opacity-10">mozumasu</span>
</div>

<div class="abs-br m-6 flex gap-2">
  <a href="https://github.com/mozumasu/my-slides?tab=readme-ov-file" target="_blank" alt="GitHub" title="Open in GitHub"
    class="text-xl slidev-icon-btn opacity-50 !border-none !hover:text-white">
    <carbon-logo-github />
  </a>
</div>

<style>
.slidev-layout {
  background: #000428;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #004e92, #000428);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #004e92, #000428); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>

<!--
The last comment block of each slide will be treated as slide notes. It will be visible and editable in Presenter Mode along with the slide. [Read more in the docs](https://sli.dev/guide/syntax.html#notes)
-->

---
layout: center
---

# CLI は良いぞ

---
layout: center
---

# 最も自分の思考について来れるもの

# それはCLI

---

## 自己紹介

コード化されているものと[CLI]{style="color:red"}と[CUI]{style="color:red"}が好き  
インフラ4ヶ月目

<a href="https://zenn.dev/mozumasu" target="_blank">
<img src=./images/zenn-2024.png alt="Zenn" width="900">
</a>

---
layout: center
---

# ランキング形式でお届け

~ 独断と偏見を添えて ~

---

# 3位 <v-click> ターミナルとNeovimのカスタマイズ </v-click>

<v-click>ターミナルとエディタに詳しくなる</v-click>
<v-click>

- 初めての言語を触る時もエディタが知らないことを教えてくれる  
  LSP, Linter, Formatterを設定する習慣がつく

- viの操作も怖く無い

</v-click>

<br>
<br>

<v-click>

## Neovimあるある

</v-click>

<v-click>

- 途中から入った現場のコードでLinterのWarning祭り

- プラグイン情報 「そこ (公式) に無かったら無いですね」

</v-click>

<v-click>公式ドキュメントを読む習慣がつく</v-click>

<!--
エディタで解決できることはエディタで解決するべき
-->

<style>
h1 {
  background-color: #2B90B6;
  background-image: linear-gradient(45deg, #4EC5D4 10%, #146b8c 20%);
  background-size: 100%;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
}
</style>

---

# 案件掛け持ちあるある

<br>
管理しないといけないサーバーが増える

接続情報を入力するのが大変😵

<br>

```sh
ssh -i ~/.ssh/hoge-key hoge-user@127.0.0.0.1 -p 22
```

---

# 2位 ~/.ssh/config

```sh
# ~/.ssh/config
HOST __hoge_prod
  HOSTNAME 127.0.0.1
  User hoge-user
  Port 22
  IdentityFile ~/.ssh/hoge-key
```

before

```sh
ssh -i ~/.ssh/hoge-key hoge-user@127.0.0.0.1 -p 22
```

after

```sh
ssh __hoge_prod
```

<br>
エイリアスでssh接続できて楽ちん

<style>
h1 {
  background-color: #2B90B6;
  background-image: linear-gradient(45deg, #4EC5D4 10%, #146b8c 20%);
  background-size: 100%;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
}
</style>

---

# 案件ごとにファイルを分けて管理

<br>

Step1. configファイルを分割

````md magic-move {lines: true}
```sh
.ssh
└── config
```

```sh
.ssh
├── config
└── conf.d
    └── hosts
        ├── 案件1
        └── 案件2
```
````

<div v-click="2">
Step2. Includeで読み込む

````md magic-move {at:3, lines: true}
```sh
# ~/.ssh/config
HOST __hoge_prod
  HOSTNAME 127.0.0.1
  User hoge-user
  Port 22
  IdentityFile ~/.ssh/hoge-key
```

```sh
# ~/.ssh/config
Include conf.d/hosts/*
```
````

</div>

<br>
<div v-click="4">最初に知りたかった😇</div>

---

# 余談: 〇〇.dのdって何？

<br>

## UNIX系あるある

〇〇.d みたいな謎ディレクトリ名ありがち

- ~/.ssh/conf.d
- /etc/cron.d

<br>

<div v-click="1">

ディレクトリ (directory) を示す慣習的な命名  
設定を分割して管理するのに使われる

</div>

---

# 1位 dotfiles

<br>
dotfile : 設定ファイル全般のこと

↑これを管理するリポジトリをdotfilesリポジトリと呼ぶ

<style>
h1 {
  background-color: #2B90B6;
  background-image: linear-gradient(45deg, #4EC5D4 10%, #146b8c 20%);
  background-size: 100%;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
}
</style>

---
layout: center
---

# 設定 =

# <v-click>呼吸</v-click>

---

# 得られるの恩恵

- 設定ファイルに詳しくなる
- 構成管理の習慣がつく
- 他人のdotfilesを見るのが楽しくなる
- ツールに詳しくなる

---
layout: center
---

# dotfiles 入門

---

# ちょっと準備....

CLI生活を快適にするツールをインストール  
なくてもいいけどあると便利

```sh
brew install gh      # GitHub CLI
brew install ghq     # ローカルでのリポジトリ管理
brew install fzf     # ファジーファインダー: 曖昧検索して選択
brew install zoxide  # ディレクトリ移動の履歴を保存・移動
```

<br>
参照

> https://formulae.brew.sh/formula/gh  
> https://formulae.brew.sh/formula/ghq  
> https://formulae.brew.sh/formula/fzf  
> https://formulae.brew.sh/formula/zoxide

---

# ちょっと準備....

クローンしたリポジトリに爆速移動できるようにしよう

Control + g でプロジェクトに移動できる

```sh
# ~/.zshrc
function ghq-fzf() {
  local src=$(ghq list | fzf --preview "bat --color=always --style=header,grid --line-range :80 $(ghq root)/{}/README.*")
  if [ -n "$src" ]; then
    BUFFER="cd $(ghq root)/$src"
    zle accept-line
  fi
  zle -R -c
}
zle -N ghq-fzf
bindkey '^g' ghq-fzf
```

設定を反映

```sh
exec $SHELL -l
```

---

# dotfilesを始めよう

<br>

## リポジトリを用意しよう

dotfilesというGitHubリポジトリを用意

```sh
gh repo create dotfiles --private
```

GitHubリポジトリをローカルにクローン

```sh
ghq get dotfiles
```

Control + g でプロジェクトディレクトリに移動

---

# Brewfileを管理しよう

現在インストールしているパッケージをBrewfileに書き出す

```sh
brew bundle dump
```

早速Git管理だ！

```sh
git add Brewfile
git commit -m "Add Brewfile."
git push
```

GitHubリポジトリを確認してみよう

```sh
gh browse
```

---
layout: center
---

# 設定ファイルを追加しよ

---

# zshの設定ファイルを追加

```sh
mv ~/.zshrc [dotfileのパス]
```

---
layout: center
---

# そのファイル、いつまで探し続けるの？

人生探し物で終えるつもり？

---

# ディレクトリは飛び回ってなんぼ

```sh
z  [移動したいディレクトリ名の一部]
```

---

# プロジェクトルートに戻るたびにやってない？

階層間違えがち

```sh
cd ../../../
```

---

# もっとスマートに

もう.の数を気にしなくていい

```sh
git rev-parse --show-toplevel
```

<br>
<div v-click>
  長すぎる

# aliasで短く賢く

```sh
abbr -S proot='cd $(git rev-parse --show-toplevel)' >>/dev/null
```

設定後のコマンド

```sh
proot
```

</div>

---

# aliasの設定にもいろいろ

<br>
入力後にスペースを入力したり、コマンド実行すると元のコマンドが表示される (Zshの独自機能)

```sh
abbr -S ll='ls -l' >>/dev/null
```

<br>
元のコマンドを表示しない

```sh
alias ggrks='google'
```

---

# 直前のディレクトリに移動

```sh
cd -
```

---

# zshのキーバインドを確認してみよう

```sh
bindkey
```

---

# 謎の記号だらけ...?

キーバインドを割り当てたいけど、記号がわからない

これで確認できる

```sh
cat
```

参考になるサイト↓
[にわか管理者のためのLinux運用入門(286) zshを使う - ショートカットキーの読み方 | TECH+（テックプラス）](https://news.mynavi.jp/techplus/article/techp5581/)

---

# オレオレキーバインド思想

キーバインドの設定で守るべき方針

- デフォルトのキーバインド必ず確認
- emacs/vimのキーバインドを潰さない
- 使わないキーバインドは無効化

---

# CLIに影響するキーバインド設定の場

- シェル
- ターミナル
- karabiner

影響範囲は下に行くほど大きい

---

# ランキングには入らなかったけどいい感じのやつ

- Makefile
- Taskfile

---

# Taskfile

```sh
brew install go-task
```

---

## layout: center

# まとめ

- 設定 = 呼吸
- 設定ファイルを開くのにかけていい時間は5秒まで

---

## layout: center

# ご清聴ありがとうございました！
