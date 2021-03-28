import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Icons from 'vite-plugin-icons'
import path from 'path'

export default defineConfig({
  plugins: [vue(), Icons()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '/src'),
    },
  },
  server: {
    open: true,
  },
})
