import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { sites } from '@openai/sites-vite-plugin'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), sites()],
})
