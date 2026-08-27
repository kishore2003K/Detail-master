# Detailing Masters — Web Application

Official website and booking portal for **Detailing Masters**, a premier automotive detailing studio located opposite KTM Bike Showroom, Chankai, Marthandam, Tamil Nadu.

- **Live Production URL:** [https://detailingmasters.in](https://detailingmasters.in)

---

## Features

- **High-Performance 3D Detailing Showcase:** Smooth interactive canvas-based car detailing visualization.
- **Service Catalog & Online Booking:** Real-time booking form connected to backend booking API.
- **Local SEO & Rich Results Optimization:** Complete JSON-LD LocalBusiness and FAQPage schema markup.
- **Customer Reviews & Social Proof:** Integrated Google Business Profile rating and client testimonials.
- **Mobile-First Responsive Design:** Optimized for high-DPI displays and mobile touch devices.

---

## Tech Stack

- **Frontend:** React 19, Vite, Tailwind CSS
- **Animations:** GSAP, ScrollTrigger, Lenis Smooth Scroll, Framer Motion
- **Icons:** Lucide React

---

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

```bash
# Clone repository
git clone https://github.com/kishore2003K/Detail-master.git
cd Detail-master

# Install dependencies
npm install

# Setup environment variables (optional)
cp .env.example .env

# Run local development server
npm run dev
```

### Production Build

```bash
# Build optimized production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## Configuration & Environment Variables

Copy `.env.example` to `.env` to configure:

| Variable | Description | Default / Example |
| :--- | :--- | :--- |
| `VITE_GA_MEASUREMENT_ID` | Google Analytics 4 Measurement ID | `G-XXXXXXXXXX` |
| `VITE_API_URL` | Backend API Endpoint | `https://detail-master-production.up.railway.app` |

---

## SEO & Verification

- **Google Search Console Verification:** Configure the `<meta name="google-site-verification" content="..." />` tag in `index.html`.
- **Sitemap:** Clean canonical sitemap available at [https://detailingmasters.in/sitemap.xml](https://detailingmasters.in/sitemap.xml).
- **Robots.txt:** Standard crawl permissions at [https://detailingmasters.in/robots.txt](https://detailingmasters.in/robots.txt).
