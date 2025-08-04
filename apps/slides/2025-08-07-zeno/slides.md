---
theme: default
title: zeno.zshで始めるCLI無双
info: |
  ## zeno.zshで始めるCLI無双
  zeno.zshを使ったCLI効率化の紹介

class: text-center
# https://sli.dev/features/drawing
drawings:
  persist: true
# slide transition: https://sli.dev/guide/animations.html#slide-transitions
transition: fade-out
# enable MDC Syntax: https://sli.dev/features/mdc
mdc: true
overviewSnapshots: true

colorSchema: dark

fonts:
  # basically the text
  sans: "Noto Sans JP"
  # use with `font-serif` css class from windicss
  serif: "Robot Slab"
  # for code blocks, inline code, etc.
  mono: "Fira Code"

css: unocss
---

<style>
/* Enhanced code blocks */
.slidev-code {
  background: rgba(15, 23, 42, 0.4) !important;
  backdrop-filter: blur(12px);
  border: 1px solid rgba(100, 116, 139, 0.2);
}

pre {
  background: rgba(15, 23, 42, 0.4) !important;
  backdrop-filter: blur(12px);
  border: 1px solid rgba(100, 116, 139, 0.2);
}

.code-container {
  background: rgba(15, 23, 42, 0.3) !important;
  backdrop-filter: blur(12px);
  border: 1px solid rgba(100, 116, 139, 0.2);
}

/* Override existing background classes */
.bg-slate-900\/70,
.bg-slate-800\/50,
.bg-slate-800 {
  background: rgba(15, 23, 42, 0.3) !important;
  backdrop-filter: blur(12px);
  border: 1px solid rgba(100, 116, 139, 0.2) !important;
}

/* Tab key styling */
.tab-key {
  display: inline-block;
  background: rgba(139, 92, 246, 0.2);
  color: #a78bfa;
  padding: 4px 12px;
  border-radius: 8px;
  border: 1px solid rgba(139, 92, 246, 0.3);
  font-family: "Fira Code", monospace;
  font-size: 0.75em;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin: 0 4px;
}

/* Neon title effects - green glow for h1 */
h1 {
  color: #00ff41;
  text-shadow: 
    0 0 1px #00ff41, 
    0 0 15px #00ff41, 
    0 0 8px #39ff14, 
    0 0 25px #39ff14;
  font-weight: 300;
  letter-spacing: 1px;
}


@keyframes neon-flicker {
  0%, 18%, 22%, 25%, 53%, 57%, 100% {
    text-shadow: 
      0 0 1px #6F51A1, 
      0 0 20px #6F51A1, 
      0 0 10px #0ff, 
      0 0 10px #0ff, 
      0 0 60px #0ff;
  }
  20%, 24%, 55% {
    text-shadow: 0 0 1px #6F51A1;
  }
}

@keyframes zeno-flicker {
  0%, 18%, 22%, 25%, 53%, 57%, 100% {
    text-shadow: 
      0 0 2px #fff, 
      0 0 25px #fff, 
      0 0 10px #0ff, 
      0 0 40px #0ff;
  }
  20%, 24%, 55% {
    text-shadow: 0 0 1px #fff;
  }
}

/* First slide subtitle and author styling */
.neon-subtitle {
  color: #aaa;
  text-shadow: 
    0 0 1px #0ff, 
    0 0 3px #0ff;
  font-size: 0.9em;
  font-weight: 300;
  margin: 1.5em 0;
  text-align: center;
  letter-spacing: 0.5px;
  opacity: 0.7;
}

.neon-author {
  color: #ff69b4;
  text-shadow: 
    0 0 1px #ff69b4, 
    0 0 12px #ff69b4, 
    0 0 5px #ff0080, 
    0 0 20px #ff0080;
  font-size: 1.5em;
  font-weight: 600;
  margin-top: 3em;
  text-align: center;
  letter-spacing: 1px;
}

/* Highlight zeno.zsh part with white flickering */
.zeno-highlight {
  color: #fff;
  text-shadow: 
    0 0 2px #fff, 
    0 0 25px #fff, 
    0 0 10px #0ff, 
    0 0 40px #0ff;
  font-size: 1.8em;
  font-weight: 800;
  letter-spacing: 3px;
  animation: zeno-flicker 2s infinite alternate;
}

/* Smaller subtitle text */
.subtitle-text {
  font-size: 0.7em;
  font-weight: 200;
  letter-spacing: 0.5px;
}

/* Title container styling */
.title-container {
  text-align: center;
  margin: 2rem 0;
}

/* First line styling */
.title-line1 {
  color: #fff;
  text-shadow: 
    0 0 1px #0ff, 
    0 0 15px #0ff, 
    0 0 8px #0ff, 
    0 0 25px #0ff;
  font-size: 2.5rem;
  font-weight: 300;
  letter-spacing: 1px;
  margin-bottom: -1.2rem;
}

/* Second line styling */
.title-line2 {
  color: #00ff41;
  text-shadow: 
    0 0 1px #00ff41, 
    0 0 8px #00ff41, 
    0 0 4px #39ff14;
  font-size: 6rem;
  font-weight: 700;
  letter-spacing: 8px;
  text-transform: uppercase;
}
</style>

<div class="title-container">
  <div class="title-line1"><span class="zeno-highlight">zeno.zsh</span> <span class="subtitle-text">で始める</span></div>
  <div class="title-line2">CLI無双</div>
</div>

<div class="neon-subtitle">2025/08/07 ペチオブLT会</div>

---

# zeno.zsh とは

<div class="mt-8 grid grid-cols-2 gap-8">

<div class="bg-slate-800/50 p-6 rounded-lg border border-slate-600">
<div class="text-purple-400 font-mono text-sm mb-4">// plugin.info</div>
<div class="space-y-3">
<div><span class="text-blue-400">type:</span> <span class="text-green-400">"zsh-plugin"</span></div>

<div><span class="text-blue-400">supports:</span> <span class="text-green-400">["zsh", "fish"]</span></div>
<div><span class="text-blue-400">powered_by:</span> <span class="text-green-400">"deno"</span></div>
</div>
</div>

<div class="bg-slate-800/50 p-6 rounded-lg border border-slate-600">
<div class="text-purple-400 font-mono text-sm mb-4">// features</div>
<div class="space-y-2 text-sm">
<div>• <span class="text-yellow-400">abbrev</span> snippet expansion</div>
<div>• <span class="text-cyan-400">fzf</span> completion</div>
<div>• <span class="text-pink-400">snippet</span> insertion</div>
<div>• various <span class="text-green-400">utilities</span></div>
</div>
</div>

</div>

<div class="mt-8 text-center">
<div class="inline-block bg-slate-900/50 px-4 py-2 rounded border border-slate-700">
<span class="text-purple-400 font-mono text-xs">ref:</span>
<a href="https://zenn.dev/yano/articles/zsh_plugin_from_deno" target="_blank"
   class="text-cyan-400 hover:text-cyan-300 font-mono text-xs">zenn.dev/yano/articles/zsh_plugin_from_deno</a>
</div>
</div>

---
layout: center
---

# さっそく試してみよう

---

# 例: EC2 Instance Connect経由で接続

<div class="mt-8 bg-slate-900/70 p-6 rounded-lg border border-slate-600">
<div class="flex items-center gap-2 mb-4">
<div class="w-3 h-3 bg-red-500 rounded-full"></div>
<div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
<div class="w-3 h-3 bg-green-500 rounded-full"></div>
<span class="ml-4 text-slate-400 text-sm font-mono">terminal</span>
</div>

```bash
aws ec2-instance-connect ssh \
    --instance-id <EC2のinstance-id> \
    --os-user ec2-user
```

</div>

---

# 接続時のつらみ

<div class="mt-8 grid grid-cols-2 gap-6">

<div class="bg-slate-900/70 p-6 rounded-lg border border-slate-600">
<div class="text-yellow-400 font-mono text-sm mb-4">// step 1: 確認</div>

```bash
aws ec2 describe-instances \
  --query 'Reservations[*].Instances[*]...' \
  --output table
```

<div class="mt-4 bg-slate-800 p-3 rounded text-xs font-mono">
<div class="text-slate-300">|  i-XXXXXXXXXXXXXXXXX |  dev-Instance  |</div>
</div>
</div>

<div class="bg-slate-900/70 p-6 rounded-lg border border-slate-600">
<div class="text-cyan-400 font-mono text-sm mb-4">// step 2: 実行</div>

```bash
aws ec2-instance-connect ssh \
    --instance-id i-XXXXXXXXXXXXXXXXX \
    --os-user ec2-user
```

<div class="mt-4 text-sm">
<div class="text-red-400">⚠️ コピペが必要</div>
</div>
</div>

</div>

<div class="mt-8 text-center">
<div class="inline-flex items-center gap-4 bg-red-900/30 px-6 py-3 rounded-lg border border-red-600/50">
<span class="text-red-400">❌</span> <span class="text-sm">idの確認とコピペが面倒</span>
<span class="text-red-400">❌</span> <span class="text-sm">コマンド入力が面倒</span>
</div>
</div>

---

# zeno.zshで解決

<div class="mt-8 grid grid-cols-2 gap-8">

<div class="bg-red-900/20 p-6 rounded-lg border border-red-600/30">
<div class="text-red-400 font-mono text-sm mb-4">// before</div>
<div class="space-y-3 text-sm">
<div class="flex items-center gap-2">
<span class="text-red-400">❌</span>
<span>コマンド入力が面倒</span>
</div>
<div class="flex items-center gap-2">
<span class="text-red-400">❌</span>
<span>idのコピペが面倒</span>
</div>
<div class="flex items-center gap-2">
<span class="text-red-400">❌</span>
<span>毎回同じ作業</span>
</div>
</div>
</div>

<div class="bg-green-900/20 p-6 rounded-lg border border-green-600/30">
<div class="text-green-400 font-mono text-sm mb-4">// after</div>
<div class="space-y-3 text-sm">
<div class="flex items-center gap-2">
<span class="text-green-400">✅</span>
<span><strong>snippet展開</strong>でコマンド入力簡単</span>
</div>
<div class="flex items-center gap-2">
<span class="text-green-400">✅</span>
<span><strong>fzf補完</strong>でidを選択するだけ</span>
</div>
<div class="flex items-center gap-2">
<span class="text-green-400">✅</span>
<span>自動化された効率的な操作</span>
</div>
</div>
</div>

</div>

<div class="mt-8 bg-slate-900/70 p-6 rounded-lg border border-slate-600">
<div class="flex items-center gap-2 mb-4">
<div class="w-3 h-3 bg-red-500 rounded-full"></div>
<div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
<div class="w-3 h-3 bg-green-500 rounded-full"></div>
<span class="ml-4 text-slate-400 text-sm font-mono">result</span>
</div>

```bash
aws ec2-instance-connect ssh \
    --instance-id i-XXXXXXXXXXXXXXXXX \
    --os-user ec2-user
```

</div>

---

# コマンド入力が面倒

<div class="mt-8 text-center">
<div class="inline-block bg-blue-900/30 px-4 py-2 rounded border border-blue-600/50">
<span class="text-blue-400 font-mono">snippet</span> を追加
</div>
</div>

<div class="mt-8 bg-slate-900/70 p-6 rounded-lg border border-slate-600">
<div class="flex items-center gap-2 mb-4">
<div class="w-3 h-3 bg-red-500 rounded-full"></div>
<div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
<div class="w-3 h-3 bg-green-500 rounded-full"></div>
<span class="ml-4 text-slate-400 text-sm font-mono">~/.config/zeno/config.yml</span>
</div>

```yaml
snippets:
  - keyword: instance-connect
    snippet: aws ec2-instance-connect ssh --instance-id {{instance-id}} --os-user ec2-user
```

</div>

---

# スニペット実践

<div class="mt-8 text-center mb-6">
<div class="inline-block bg-green-900/30 px-4 py-2 rounded border border-green-600/50">
<span class="text-green-400 font-mono">展開後のカーソル位置</span>も指定可能
</div>
</div>

<div class="grid grid-cols-2 gap-8">

<div class="bg-slate-900/70 p-6 rounded-lg border border-slate-600">
<div class="text-yellow-400 font-mono text-sm mb-4">// input</div>

<div class="font-mono text-green-400 bg-slate-800 p-3 rounded">
$ instance-connect<span class="tab-key">Tab</span>
</div>

</div>

<div class="bg-slate-900/70 p-6 rounded-lg border border-slate-600">
<div class="text-cyan-400 font-mono text-sm mb-4">// expanded</div>

```bash
aws ec2-instance-connect ssh \
    --instance-id █ \
    --os-user ec2-user
```

<div class="mt-2 text-xs text-slate-400">
<span class="text-green-400">█</span> カーソル位置
</div>
</div>

</div>

---

# idのコピペが面倒

<div class="mt-8 text-center">
<div class="inline-block bg-purple-900/30 px-4 py-2 rounded border border-purple-600/50">
<span class="text-purple-400 font-mono">fzf補完</span>を追加
</div>
</div>

<div class="mt-8 bg-slate-900/70 p-6 rounded-lg border border-slate-600">
<div class="flex items-center gap-2 mb-4">
<div class="w-3 h-3 bg-red-500 rounded-full"></div>
<div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
<div class="w-3 h-3 bg-green-500 rounded-full"></div>
<span class="ml-4 text-slate-400 text-sm font-mono">~/.config/zeno/config.yml</span>
</div>

```yaml
completions:
  - name: instance-id
    patterns:
      - "aws ec2-instance-connect ssh --instance-id( .*)?"
    sourceCommand: "aws ec2 describe-instances --query '...' --output text"
    callback: "awk -F ' ' '{ print $1 }'"
```

</div>

---
layout: center
---

# fzf補完実践

```sh
# カーソル位置でTABを入力
aws ec2-instance-connect ssh --instance-id カーソル位置 --os-user ec2-user
```

<div class="mt-8 text-center text-6xl">
🎯
</div>

---

# 導入方法

<div class="mt-8">

zeno.zshで必要なものをインストール

```sh
brew install deno
brew install fzf
```

zeno.zshをインストール  
sheldonの場合は<code>~/.config/plugins.toml</code>に配置

```toml
# ~/.config/plugins.toml
[plugins.zeno]
github = "yuki-yano/zeno.zsh"

[plugins.fast-syntax-highlighting]
github = "zdharma-continuum/fast-syntax-highlighting"
```

</div>

---

# zshの設定ファイル

```sh
# ~/.zshrc
# プラグインの読み込み
eval "$(sheldon source)"

# プラグイン読み込み後にzenoの設定を読み込む
source "$HOME/.config/zsh/rc/pluginconfig/zeno.zsh"
```

---

# zeno.zshの設定例

```zsh
# ~/.config/zsh/rc/pluginconfig/zeno.zsh
# if defined load the configuration file from there
export ZENO_HOME=~/.config/zeno

# if disable deno cache command when plugin loaded
# export ZENO_DISABLE_EXECUTE_CACHE_COMMAND=1

# if enable fzf-tmux
# export ZENO_ENABLE_FZF_TMUX=1

# Experimental: Use UNIX Domain Socket
export ZENO_ENABLE_SOCK=1

# git file preview with color
export ZENO_GIT_CAT="bat --color=always"

# git folder preview with color
export ZENO_GIT_TREE="exa --tree"

if [[ -n $ZENO_LOADED ]]; then
  bindkey ' '  zeno-auto-snippet
  bindkey '^m' zeno-auto-snippet-and-accept-line
  bindkey '^i' zeno-completion
  bindkey '^x '  zeno-insert-space
  bindkey '^x^m' accept-line
  bindkey '^x^z' zeno-toggle-auto-snippet
  bindkey '^r'   zeno-history-selection
  bindkey '^x^s' zeno-insert-snippet
  bindkey '^x^f' zeno-ghq-cd
fi
```

<div class="text-xs opacity-70 mt-4">
ref: <a href="https://github.com/yuki-yano/zeno.zsh?tab=readme-ov-file#configuration-example" target="_blank">https://github.com/yuki-yano/zeno.zsh?tab=readme-ov-file#configuration-example</a>
</div>

---
layout: center
---

# お気に入りの使い方

---

# sshの接続先の補完

```yaml
# ~/.config/zeno/config.yml
completions:
  - name: ssh login
    patterns:
      - "^ssh(?: .*)? $"
    sourceCommand: |
      cat "$HOME/.ssh/conf.d/hosts/"**/*(.) | grep -E '^HOST\s' | grep -v '\*' | awk '{print $2}' | sort -u
    options:
      --prompt: "'ssh > '"
```

---

# package.jsonのscript実行

```yaml
# ~/.config/zeno/config.yml
completions:
  - name: package scripts
    patterns:
      - "npm run(?: .*)? $"
      - "yarn run(?: .*)? $"
      - "pnpm run(?: .*)? $"
      - "bun run(?: .*)? $"
    sourceCommand: 'jq -r ''.scripts | to_entries | .[] | .key + " = " + .value'' package.json'
    options:
      --prompt: "'npm run > '"
    callback: "awk -F ' = ' '{ print $1 }'"
```

---

# オススメの設定

<div class="space-y-6">

<div class="bg-gray-800 p-4 rounded-lg">
<strong class="text-blue-400">zeno.zsh を活用して Node.js パッケージマネージャの違いを吸収する</strong><br>
<a href="https://www.m3tech.blog/entry/zeno-zsh-abbr" target="_blank" class="text-sm opacity-70">https://www.m3tech.blog/entry/zeno-zsh-abbr</a>
</div>

<div class="bg-gray-800 p-4 rounded-lg">
<strong class="text-purple-400">nbコマンドと組み合わせ</strong>

```yaml
completions:
  - name: nb edit
    patterns:
      - "^nb e( .*)? $"
      - "^nb edit( .*)? $"
    sourceCommand: "nb ls --no-color | grep -E '^\\[[0-9]+\\]'"
    options:
      --ansi: true # ← ANSIカラー有効
      --prompt: "'nb edit >'"
      --preview: "echo {} | sed -E 's/^\\[([0-9]+)\\].*/\\1/' | xargs nb show"
    callback: "sed -E 's/^\\[([0-9]+)\\].*/\\1/'"
```

</div>

</div>

---

# gh コマンドと組み合わせ

```yaml
# ~/.config/zeno/config.yml
completions:
  - name: gh browse
    patterns:
      - "^gh browse -R( .*)? $"
    sourceCommand: "gh repo list | awk '{print $1}'"
    options:
      --prompt: "'browse repo >'"
```

<div class="mt-8 text-center">

<span class="text-2xl">🚀</span>

<div class="mt-4 text-xl">
CLIがもっと楽しくなる！
</div>

</div>

<style>
span {
  font-size: 1.5em;
}
</style>

---

# 参照

<div class="space-y-4 mt-8">

<div class="text-lg">
📚 <strong>公式リポジトリ</strong><br>
<a href="https://github.com/yuki-yano/zeno.zsh" target="_blank">https://github.com/yuki-yano/zeno.zsh</a>
</div>

<div class="text-lg">
🔧 <strong>設定例</strong><br>
<a href="https://github.com/gamoutatsumi/dotfiles/blob/27265ef95acd4542f37b249b55e94c4403dac47c/dot_config/zeno/config.yml#L224" target="_blank">https://github.com/gamoutatsumi/dotfiles/.../config.yml</a>
</div>

<div class="text-lg">
📝 <strong>解説記事</strong><br>
<a href="https://zenn.dev/yano/articles/zsh_plugin_from_deno" target="_blank">https://zenn.dev/yano/articles/zsh_plugin_from_deno</a>
</div>

</div>

<div class="mt-12 text-center text-4xl">
<span>Happy Hacking! 🎉</span>
</div>

<style>
span {
  background: linear-gradient(45deg, #4ade80, #06b6d4, #8b5cf6);
  background-size: 100%;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
}
</style>
