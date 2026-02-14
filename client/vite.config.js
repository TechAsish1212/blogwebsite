// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// export default defineConfig({
//   plugins: [react()],
//   css: {
//     postcss: './postcss.config.js'
//   }
// })

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: './postcss.config.js',
  },
  optimizeDeps: {
    include: [
      "prismjs",       // ✅ force Vite to prebundle Prism.js
      "highlight.js"   // ✅ if you use highlight.js instead
    ],
  },
})
