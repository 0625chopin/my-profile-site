import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages는 https://<user>.github.io/my-profile-site/ 하위 경로에서 서빙되므로 base 지정
  base: '/my-profile-site/',
  plugins: [react()],
})
