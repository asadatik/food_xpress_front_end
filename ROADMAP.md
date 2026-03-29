# FoodExpress Feature Roadmap

This document outlines future features that can be easily integrated into FoodExpress, along with exact code locations and implementation strategies.

## Phase 1: Authentication & User Management (Week 1-2)

### Feature: User Registration & Login
**Why**: Enable per-user order history, favorites, and saved addresses

**Files to Create**:
- `app/auth/login/page.tsx` - Login form
- `app/auth/register/page.tsx` - Registration form
- `lib/auth.ts` - Authentication utilities
- `features/auth/auth-context.tsx` - User state management
- `types/user.ts` - User type definitions

**Integration Points**:

1. **In `app/layout.tsx`**:
```typescript
import { AuthProvider } from '@/features/auth/auth-context'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <AuthProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
```

2. **In `features/navbar/navbar.tsx`**:
```typescript
import { useAuth } from '@/features/auth/auth-context'

export function Navbar() {
  const { user, logout } = useAuth()
  
  return (
    <nav>
      {user ? (
        <UserMenu user={user} onLogout={logout} />
      ) : (
        <LoginButton />
      )}
    </nav>
  )
}
```

**Recommended Service**: Supabase Auth or Auth.js
- Supabase: `npm install @supabase/supabase-js`
- Auth.js: `npm install next-auth`

**Database Schema** (if using Postgres):
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR UNIQUE NOT NULL,
  password_hash VARCHAR,
  name VARCHAR,
  phone VARCHAR,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

---

## Phase 2: Order Management & History (Week 2-3)

### Feature: Order Placement & Tracking
**Why**: Users need to complete purchases and track deliveries

**Files to Create**:
- `app/checkout/page.tsx` - Checkout page
- `app/orders/page.tsx` - Order history
- `app/orders/[orderId]/page.tsx` - Order details
- `features/checkout/checkout-form.tsx` - Address & payment form
- `features/orders/order-card.tsx` - Order display component
- `lib/checkout.ts` - Order processing logic

**Integration Points**:

1. **In `features/cart/cart-drawer.tsx`** (add checkout button):
```typescript
'use client'
import { useRouter } from 'next/navigation'

export function CartDrawer() {
  const router = useRouter()
  
  const handleCheckout = () => {
    if (items.length === 0) return
    router.push('/checkout')
  }
  
  return (
    <div>
      {/* ... cart items ... */}
      <PremiumButton onClick={handleCheckout}>
        Proceed to Checkout
      </PremiumButton>
    </div>
  )
}
```

2. **In `features/navbar/navbar.tsx`** (add orders link):
```typescript
<nav>
  {user && (
    <NavLink href="/orders">
      My Orders
    </NavLink>
  )}
</nav>
```

**Database Schema**:
```sql
CREATE TABLE orders (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  total DECIMAL(10,2),
  status VARCHAR, -- pending, confirmed, preparing, on-the-way, delivered
  delivery_address TEXT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

CREATE TABLE order_items (
  id UUID PRIMARY KEY,
  order_id UUID REFERENCES orders(id),
  menu_item_id VARCHAR,
  quantity INT,
  price DECIMAL(10,2)
);
```

---

## Phase 3: Payment Processing (Week 3-4)

### Feature: Stripe or PayPal Integration
**Why**: Accept real payments from customers

**Files to Create**:
- `app/api/checkout/route.ts` - Stripe session creation
- `app/api/webhooks/stripe/route.ts` - Webhook handler
- `features/payments/stripe-checkout.tsx` - Stripe integration
- `lib/stripe.ts` - Stripe utilities

**Integration Points**:

1. **In `features/checkout/checkout-form.tsx`**:
```typescript
'use client'
import { loadStripe } from '@stripe/stripe-js'
import { useCart } from '@/features/cart/cart-context'

export function CheckoutForm() {
  const { items, total } = useCart()
  
  const handlePayment = async () => {
    const response = await fetch('/api/checkout', {
      method: 'POST',
      body: JSON.stringify({ items, total, address })
    })
    const { sessionId } = await response.json()
    
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!)
    await stripe?.redirectToCheckout({ sessionId })
  }
  
  return (
    <form onSubmit={handlePayment}>
      {/* payment form fields */}
    </form>
  )
}
```

2. **Create `app/api/checkout/route.ts`**:
```typescript
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(request: Request) {
  const { items, total } = await request.json()
  
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: items.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: { name: item.name },
        unit_amount: Math.round(item.price * 100)
      },
      quantity: item.quantity
    })),
    mode: 'payment',
    success_url: `${process.env.BASE_URL}/success`,
    cancel_url: `${process.env.BASE_URL}/checkout`
  })
  
  return Response.json({ sessionId: session.id })
}
```

**Environment Variables**:
```
NEXT_PUBLIC_STRIPE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

---

## Phase 4: Real-Time Order Tracking (Week 4-5)

### Feature: Live Delivery Map & Status Updates
**Why**: Users can see delivery progress in real-time

**Files to Create**:
- `app/orders/[orderId]/tracking/page.tsx` - Tracking page
- `features/tracking/map-component.tsx` - Delivery map
- `features/tracking/order-timeline.tsx` - Status timeline
- `lib/realtime.ts` - WebSocket utilities
- `hooks/use-order-subscription.ts` - Real-time data hook

**Integration Points**:

1. **In `app/orders/[orderId]/tracking/page.tsx`**:
```typescript
'use client'
import { useOrderSubscription } from '@/hooks/use-order-subscription'
import { MapComponent } from '@/features/tracking/map-component'
import { OrderTimeline } from '@/features/tracking/order-timeline'

export default function TrackingPage({ params }: { params: { orderId: string } }) {
  const order = useOrderSubscription(params.orderId)
  
  return (
    <div>
      <MapComponent deliveryLocation={order.delivery_location} />
      <OrderTimeline status={order.status} timeline={order.timeline} />
    </div>
  )
}
```

**Recommended Service**: Supabase Realtime or Socket.io
- Supabase: Built-in WebSocket support
- Socket.io: Custom WebSocket server

---

## Phase 5: Favorites & Personalization (Week 5-6)

### Feature: Save Favorite Restaurants & Menu Items
**Why**: Improve UX and encourage repeat orders

**Files to Create**:
- `app/favorites/page.tsx` - Favorites page
- `features/favorites/favorite-button.tsx` - Toggle favorite button
- `lib/favorites.ts` - Favorite management logic

**Integration Points**:

1. **In `features/restaurants/restaurant-card.tsx`**:
```typescript
'use client'
import { useFavorites } from '@/hooks/use-favorites'
import { Heart } from 'lucide-react'

export function RestaurantCard({ restaurant }) {
  const { favorites, toggleFavorite } = useFavorites()
  const isFavorite = favorites.includes(restaurant.id)
  
  return (
    <div>
      {/* card content */}
      <button onClick={() => toggleFavorite(restaurant.id)}>
        <Heart fill={isFavorite ? 'currentColor' : 'none'} />
      </button>
    </div>
  )
}
```

2. **In `features/navbar/navbar.tsx`**:
```typescript
<nav>
  <NavLink href="/favorites" icon={<Heart />}>
    Favorites
  </NavLink>
</nav>
```

**Database Schema**:
```sql
CREATE TABLE favorites (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  restaurant_id VARCHAR,
  created_at TIMESTAMP,
  UNIQUE(user_id, restaurant_id)
);
```

---

## Phase 6: Search & Filters (Week 6-7)

### Feature: Advanced Search & Restaurant Filtering
**Why**: Help users find restaurants quickly

**Files to Create**:
- `features/search/search-results.tsx` - Results page
- `features/search/search-filters.tsx` - Filter panel
- `lib/search.ts` - Search logic
- `hooks/use-search.ts` - Search state hook

**Integration Points**:

1. **In `features/navbar/navbar.tsx`** (enhance search):
```typescript
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function Navbar() {
  const [query, setQuery] = useState('')
  const router = useRouter()
  
  const handleSearch = (e) => {
    e.preventDefault()
    router.push(`/search?q=${query}`)
  }
  
  return (
    <form onSubmit={handleSearch}>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search restaurants..."
      />
    </form>
  )
}
```

2. **Create `app/search/page.tsx`**:
```typescript
'use client'
import { SearchResults } from '@/features/search/search-results'
import { SearchFilters } from '@/features/search/search-filters'

export default function SearchPage({ searchParams }: { searchParams: { q: string } }) {
  return (
    <div>
      <SearchFilters />
      <SearchResults query={searchParams.q} />
    </div>
  )
}
```

---

## Phase 7: Reviews & Ratings (Week 7-8)

### Feature: Customer Reviews & Ratings
**Why**: Build trust and improve discoverability

**Files to Create**:
- `app/restaurants/[restaurantId]/reviews/page.tsx` - Reviews page
- `features/reviews/review-form.tsx` - Write review form
- `features/reviews/review-list.tsx` - Display reviews
- `lib/reviews.ts` - Review management

**Integration Points**:

1. **In `features/restaurants/restaurant-card.tsx`**:
```typescript
<div>
  <div className="flex items-center gap-2">
    <StarRating rating={restaurant.rating} />
    <Link href={`/restaurants/${restaurant.id}/reviews`}>
      ({restaurant.reviewCount} reviews)
    </Link>
  </div>
</div>
```

**Database Schema**:
```sql
CREATE TABLE reviews (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  restaurant_id VARCHAR,
  rating INT, -- 1-5
  comment TEXT,
  created_at TIMESTAMP
);
```

---

## Phase 8: Admin Dashboard (Week 8-10)

### Feature: Restaurant/Admin Dashboard
**Why**: Manage orders, menus, and analytics

**Files to Create**:
- `app/admin/page.tsx` - Dashboard home
- `app/admin/orders/page.tsx` - Order management
- `app/admin/menu/page.tsx` - Menu editor
- `features/admin/order-table.tsx` - Orders datatable
- `features/admin/analytics.tsx` - Sales charts

**Integration Points**:

1. **In `app/layout.tsx`** (add admin routes protection):
```typescript
import { checkAdminAccess } from '@/lib/auth'

export default async function RootLayout({ children }) {
  // Admin routes are protected at middleware level
  return (
    <html>
      <body>{children}</body>
    </html>
  )
}
```

2. **Create `middleware.ts`**:
```typescript
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const token = request.cookies.get('auth-token')
    if (!token) {
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }
  }
  return NextResponse.next()
}
```

**Database Schema**:
```sql
CREATE TABLE admin_users (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  restaurant_id VARCHAR,
  role VARCHAR, -- owner, manager, delivery
  created_at TIMESTAMP
);
```

---

## Quick Feature Priority Matrix

| Feature | Complexity | User Impact | Implementation Time |
|---------|-----------|-------------|-------------------|
| Authentication | Medium | High | 3-4 days |
| Order Management | High | High | 4-5 days |
| Payment (Stripe) | Medium | High | 2-3 days |
| Real-time Tracking | High | High | 3-4 days |
| Favorites | Low | Medium | 1-2 days |
| Search & Filters | Medium | Medium | 2-3 days |
| Reviews | Medium | Medium | 2-3 days |
| Admin Dashboard | High | Medium | 5-7 days |

---

## Database Migration Strategy

When moving from mock data to real API:

1. **Create Database** (PostgreSQL):
```bash
# Using Supabase or your own Postgres instance
psql -U postgres -c "CREATE DATABASE foodexpress"
```

2. **Run Migrations**:
```bash
npm install @vercel/postgres
# or
npm install @supabase/postgrest-js
```

3. **Update Data Fetching**:
```typescript
// Before (mock data):
import { restaurants } from '@/data/mock-data'

// After (API):
const response = await fetch('/api/restaurants')
const restaurants = await response.json()
```

4. **Environment Variables**:
```
DATABASE_URL=postgresql://user:password@host:5432/foodexpress
NEXT_PUBLIC_API_URL=https://your-domain.com/api
```

---

## API Endpoint Roadmap

### Phase 1 (MVP)
```
GET  /api/restaurants
GET  /api/restaurants/:id
POST /api/cart/add
POST /api/cart/remove
```

### Phase 2 (Auth)
```
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/auth/user
```

### Phase 3 (Orders)
```
POST   /api/orders
GET    /api/orders/:id
GET    /api/users/:id/orders
PUT    /api/orders/:id/status
```

### Phase 4+ (Tracking, Reviews, Admin)
```
GET    /api/orders/:id/tracking
POST   /api/reviews
GET    /api/restaurants/:id/reviews
GET    /api/admin/orders
PUT    /api/admin/menu/:id
```

---

## Testing Strategy for New Features

```typescript
// Example: Testing authentication
import { render, screen } from '@testing-library/react'
import { LoginPage } from '@/app/auth/login/page'

describe('Login', () => {
  it('should submit login form', async () => {
    render(<LoginPage />)
    const button = screen.getByRole('button', { name: /sign in/i })
    expect(button).toBeInTheDocument()
  })
})
```

---

## Summary

The FoodExpress architecture is designed to scale incrementally. Start with authentication (Phase 1), then move to order management (Phase 2). Each phase is isolated to specific folders, making implementation straightforward without affecting existing features.

**Estimated Total Development Time**: 8-10 weeks for all phases (excluding admin dashboard)
