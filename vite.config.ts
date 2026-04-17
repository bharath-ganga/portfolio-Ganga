import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePluginRadar } from 'vite-plugin-radar'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), VitePluginRadar({
    analytics: {
      id: 'G-VHQ35Z7BE2',
    }
  })],
})
