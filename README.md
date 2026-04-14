# FoodExpress - Premium Food Delivery Web App

A production-ready food delivery platform built with Next.js 16, React 19, Framer Motion, and TypeScript. Features sophisticated animations, a modular architecture, and scalable design.

## Quick Start

### Installation
```bash
# Clone or download the project
cd foodexpress

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000` in your browser.


## Project Status

**Current Phase**: MVP (Minimum Viable Product) 
- Beautiful, animated landing page
- Restaurant browsing & filtering
- Shopping cart with global state management
- Responsive design (mobile-first)
-  User Authentication
-  Order Management
-  Payment Integration

**Upcoming Phases**:
- Phase 4: Real-time Tracking
- Phase 5+: Admin Dashboard, Reviews, etc.

## Key Features

✨ **Premium Animations**
- Physics-based spring animations with Framer Motion
- Staggered entrance effects
- Hover interactions with scale and lift effects
- Scroll-triggered animations

🎨 **Modern Design**
- Glassmorphism UI components
- FoodExpress brand colors (Pink #E21B70, Amber #FFB100)
- Responsive grid layouts (1-4 columns)
- Dark mode support

⚡ **Performance**
- Next.js Image optimization
- Lazy-loaded animations
- Fast builds with Turbopack
- Zero-runtime CSS with Tailwind

🛒 **Functional Cart System**
- Global state with React Context
- Add/remove/update items
- Real-time total calculation
- Smooth animations on interactions

📱 **Mobile Optimized**
- Mobile-first responsive design
- Touch-friendly button sizes (48px+)
- Optimized for iOS Safari and Chrome

## Folder Structure

```
├── app/                    # Next.js pages & layout
├── features/              # Feature-based components
├── components/ui/         # Reusable UI components (shadcn/ui)
├── lib/                   # Utilities, animations, constants
├── data/                  # Mock data (replace with API)
├── hooks/                 # Custom React hooks
├── public/                # Static assets
└── [docs]                 # README
```


## Technology Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 |
| UI Library | React 19 |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion |
| Components | shadcn/ui (Radix UI) |
| Icons | Lucide React |
| Language | TypeScript |
| Package Manager | npm/pnpm |

## Environment Setup

### Required Variables (None for local dev)

### Future Phases (see ROADMAP.md)
```env
NEXT_PUBLIC_STRIPE_KEY=pk_...
STRIPE_SECRET_KEY=sk_...
NEXT_PUBLIC_API_URL=...
SUPABASE_URL=...
SUPABASE_KEY=...
```

## Development Commands

```bash
npm run dev
npm run build       
npm start            
    
```

## First Steps to Customize

1. **Colors**: Edit CSS variables in `app/globals.css`
   ```css
   --primary: #E21B70;      /* Change primary color */
   --secondary: #FFB100;    /* Change secondary color */
   ```

2. **Content**: Edit mock data in `data/mock-data.ts`
   ```typescript
   export const restaurants = [/* your restaurants */]
   ```

3. **Images**: Replace placeholders in `public/`
   - Update restaurant images
   - Update logos and icons

4. **Text**: Update copy in feature components
   - `features/navbar/navbar.tsx` - Header text
   - `features/hero/hero-section.tsx` - Hero copy
   - `app/page.tsx` - Page text

