import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'url'

import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'
// https://vitejs.dev/config/
export default defineConfig({
  server: { port: 4000 },
  
  plugins: [
    
    vue(),
    svgLoader()
  ], resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),

    },
    extensions:['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json','.vue']
  },
})
