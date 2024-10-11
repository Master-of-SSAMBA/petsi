import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa';
import react from '@vitejs/plugin-react-swc'
import path from "path"
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), 
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "mask-icon.svg"],
      manifest: {
        name: "Petsi",
        short_name: "Petsi",
        theme_color: "#ffffff",
        icons: [
          {
            src: "pwa-64x64.png",
            sizes: "64x64",
            type: "images/petsi.webb",
          },
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "images/petsi.webb",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "images/petsi.webb",
            purpose: "any",
          },
          {
            src: "maskable-icon-512x512.png",
            sizes: "512x512",
            type: "images/petsi.webb",
            purpose: "maskable",
          },
        ],
      }
    }),
    svgr()],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
    ]
  }
})
