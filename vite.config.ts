// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': '/src' }
  },
  server: {
    port: 4000,       // 開発サーバーのデフォルトポート
    strictPort: true, // 他プロセスが使っていたらエラーにする（optional）
  },
  preview: {
    port: 4000,       // npm run preview 時も同じポートを使いたいなら
    strictPort: true,
  },
})
