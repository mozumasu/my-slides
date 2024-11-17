import { defineConfig } from "vite";

export default defineConfig({
  build: {
    emptyOutDir: false, // 出力ディレクトリを空にする
    outDir: "./dist", // 出力先ディレクトリを指定
  },
});
