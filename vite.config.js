import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import sitemap from 'vite-plugin-sitemap'

const dynamicRoutes = [
  '/',
  '/privacy',
  '/terms',
  '/services/ceramic-coating',
  '/services/car-wash',
  '/services/paint-protection-film',
  '/services/paint-correction',
  '/services/interior-detailing',
  '/services/underbody-coating',
  '/services/bike-detailing',
  '/locations/kuzhithurai',
  '/locations/arumanai',
  '/locations/thuckalay',
  '/locations/karungal',
  '/locations/kaliakkavilai',
  '/locations/nagercoil',
  '/locations/colachel',
  '/locations/melpuram',
  '/blog',
  '/blog/ceramic-coating-coastal-kanyakumari',
  '/blog/monsoon-car-care-marthandam',
  '/blog/underbody-anti-rust-kanyakumari',
  '/blog/car-water-wash-vs-foam-detailing',
  '/blog/ceramic-coating-vs-ppf-comparison',
  '/vehicles/mahindra-thar-scorpio-xuv700',
  '/vehicles/hyundai-creta-kia-seltos',
  '/vehicles/tata-nexon-harrier-safari',
  '/vehicles/bmw-mercedes-audi-luxury',
  '/vehicles/royal-enfield-superbikes',
]

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
    sitemap({
      hostname: 'https://detailingmasters.in',
      dynamicRoutes,
      outDir: 'dist',
    })
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
      }
    }
  },
  build: {
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('framer-motion') || id.includes('gsap') || id.includes('lenis')) {
              return 'vendor-animation';
            }
            if (id.includes('lucide-react')) {
              return 'vendor-icons';
            }
            if (id.includes('react-router') || id.includes('react-helmet')) {
              return 'vendor-router';
            }
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor-react';
            }
            return 'vendor-libs';
          }
        }
      }
    }
  }
})
