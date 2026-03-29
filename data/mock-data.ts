export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: string
  image: string
  rating?: number
  isPopular?: boolean
}

export interface Restaurant {
  id: string
  name: string
  image: string
  rating: number
  deliveryTime: number
  deliveryFee: number
  distance: number
  minOrder: number
  cuisineType: string
  badge?: string
  badgeColor?: string
  menu: MenuItem[]
  isOpen: boolean
}

export interface Category {
  id: string
  name: string
  icon: string
  slug: string
}

export const categories: Category[] = [
  {
    id: '1',
    name: 'Burgers',
    icon: '🍔',
    slug: 'burgers',
  },
  {
    id: '2',
    name: 'Pizza',
    icon: '🍕',
    slug: 'pizza',
  },
  {
    id: '3',
    name: 'Sushi',
    icon: '🍣',
    slug: 'sushi',
  },
  {
    id: '4',
    name: 'Indian',
    icon: '🥘',
    slug: 'indian',
  },
  {
    id: '5',
    name: 'Italian',
    icon: '🍝',
    slug: 'italian',
  },
  {
    id: '6',
    name: 'Asian',
    icon: '🥢',
    slug: 'asian',
  },
  {
    id: '7',
    name: 'Mexican',
    icon: '🌮',
    slug: 'mexican',
  },
  {
    id: '8',
    name: 'Desserts',
    icon: '🍰',
    slug: 'desserts',
  },
]

export const restaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Prime Burger Co.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&h=300&fit=crop',
    rating: 4.8,
    deliveryTime: 25,
    deliveryFee: 2.99,
    distance: 0.8,
    minOrder: 10,
    cuisineType: 'Burgers',
    badge: 'Flash Sale',
    badgeColor: 'bg-red-500',
    isOpen: true,
    menu: [
      {
        id: 'm1',
        name: 'Premium Wagyu Burger',
        description: 'Juicy wagyu beef with truffle mayo and aged cheddar',
        price: 14.99,
        category: 'burgers',
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=300&fit=crop',
        isPopular: true,
      },
      {
        id: 'm2',
        name: 'Double Stack Deluxe',
        description: 'Two patties, bacon, cheese, lettuce, and special sauce',
        price: 12.99,
        category: 'burgers',
        image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=300&h=300&fit=crop',
        rating: 4.7,
      },
      {
        id: 'm3',
        name: 'Spicy Fried Chicken Burger',
        description: 'Crispy fried chicken with hot sauce and pickles',
        price: 11.99,
        category: 'burgers',
        image: 'https://images.unsplash.com/photo-1562547256-f0f6876fe568?w=300&h=300&fit=crop',
      },
      {
        id: 'm4',
        name: 'Crispy Fries',
        description: 'Perfectly seasoned golden fries',
        price: 4.99,
        category: 'sides',
        image: 'https://images.unsplash.com/photo-1585238341710-4dd0e06ff466?w=300&h=300&fit=crop',
        isPopular: true,
      },
    ],
  },
  {
    id: '2',
    name: 'Artisan Pizza Studio',
    image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=300&h=300&fit=crop',
    rating: 4.7,
    deliveryTime: 30,
    deliveryFee: 3.49,
    distance: 1.2,
    minOrder: 12,
    cuisineType: 'Pizza',
    badge: 'Free Delivery',
    badgeColor: 'bg-green-500',
    isOpen: true,
    menu: [
      {
        id: 'm5',
        name: 'Margherita Classico',
        description: 'Fresh mozzarella, basil, tomato, olive oil',
        price: 13.99,
        category: 'pizza',
        image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=300&h=300&fit=crop',
        isPopular: true,
      },
      {
        id: 'm6',
        name: 'Truffle & Mushroom',
        description: 'Assorted mushrooms with truffle oil and fresh herbs',
        price: 16.99,
        category: 'pizza',
        image: 'https://images.unsplash.com/photo-1571407970349-bc79e6993753?w=300&h=300&fit=crop',
        rating: 4.9,
      },
      {
        id: 'm7',
        name: 'Pepperoni Perfetto',
        description: 'Premium pepperoni with extra cheese',
        price: 14.99,
        category: 'pizza',
        image: 'https://images.unsplash.com/photo-1628840042765-356cda07f128?w=300&h=300&fit=crop',
      },
      {
        id: 'm8',
        name: 'Garlic Bread',
        description: 'Crispy bread with garlic butter and herbs',
        price: 5.99,
        category: 'sides',
        image: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd1529c?w=300&h=300&fit=crop',
      },
    ],
  },
  {
    id: '3',
    name: 'Tokyo Sushi & Roll',
    image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500&h=300&fit=crop',
    rating: 4.9,
    deliveryTime: 28,
    deliveryFee: 4.99,
    distance: 2.1,
    minOrder: 15,
    cuisineType: 'Sushi',
    isOpen: true,
    menu: [
      {
        id: 'm9',
        name: 'Dragon Roll',
        description: 'Shrimp tempura, avocado, cucumber, spicy mayo',
        price: 16.99,
        category: 'sushi',
        image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=300&h=300&fit=crop',
        isPopular: true,
      },
      {
        id: 'm10',
        name: 'Tuna Sashimi Set',
        description: 'Premium sashimi with 8 pieces of fresh tuna',
        price: 19.99,
        category: 'sushi',
        image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=300&h=300&fit=crop',
        rating: 4.9,
      },
      {
        id: 'm11',
        name: 'California Roll',
        description: 'Crab, avocado, cucumber inside-out roll',
        price: 14.99,
        category: 'sushi',
        image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=300&h=300&fit=crop',
      },
      {
        id: 'm12',
        name: 'Miso Soup',
        description: 'Traditional miso soup with tofu and seaweed',
        price: 3.99,
        category: 'sides',
        image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=300&h=300&fit=crop',
      },
    ],
  },
  {
    id: '4',
    name: 'Maharaja Indian Kitchen',
    image: 'https://i.ibb.co.com/1JR3wng8/snappr-g-Ng-Qzet-Qsmw-unsplash.jpg',
    rating: 4.6,
    deliveryTime: 35,
    deliveryFee: 2.49,
    distance: 1.5,
    minOrder: 14,
    cuisineType: 'Indian',
    isOpen: true,
    menu: [
      {
        id: 'm13',
        name: 'Butter Chicken Curry',
        description: 'Tender chicken in creamy tomato butter sauce',
        price: 13.99,
        category: 'curries',
        image: 'https://i.ibb.co.com/1JR3wng8/snappr-g-Ng-Qzet-Qsmw-unsplash.jpg',
        isPopular: true,
      },
      {
        id: 'm14',
        name: 'Tandoori Chicken',
        description: 'Charred chicken marinated in yogurt and spices',
        price: 14.99,
        category: 'tandoori',
        image: 'https://i.ibb.co.com/1JR3wng8/snappr-g-Ng-Qzet-Qsmw-unsplash.jpg',
      },
      {
        id: 'm15',
        name: 'Lamb Biryani',
        description: 'Fragrant basmati rice with tender lamb',
        price: 15.99,
        category: 'biryani',
        image: 'https://i.ibb.co.com/1JR3wng8/snappr-g-Ng-Qzet-Qsmw-unsplash.jpg',
        rating: 4.8,
      },
      {
        id: 'm16',
        name: 'Naan Bread',
        description: 'Soft tandoori naan bread',
        price: 3.49,
        category: 'bread',
        image: 'https://images.unsplash.com/photo-1596726278493-b9aa9a96d78d?w=300&h=300&fit=crop',
      },
    ],
  },
  {
    id: '5',
    name: 'La Dolce Vita Italian',
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=500&h=300&fit=crop',
    rating: 4.8,
    deliveryTime: 32,
    deliveryFee: 3.99,
    distance: 1.8,
    minOrder: 16,
    cuisineType: 'Italian',
    isOpen: true,
    menu: [
      {
        id: 'm17',
        name: 'Spaghetti Carbonara',
        description: 'Creamy pasta with guanciale, pecorino, black pepper',
        price: 14.99,
        category: 'pasta',
        image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=300&h=300&fit=crop',
        isPopular: true,
      },
      {
        id: 'm18',
        name: 'Risotto al Tartufo',
        description: 'Creamy risotto with black truffle shavings',
        price: 17.99,
        category: 'risotto',
        image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=300&h=300&fit=crop',
        rating: 4.9,
      },
      {
        id: 'm19',
        name: 'Osso Buco',
        description: 'Slow-braised veal shank in white wine and vegetables',
        price: 18.99,
        category: 'main',
        image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=300&h=300&fit=crop',
      },
      {
        id: 'm20',
        name: 'Tiramisu',
        description: 'Classic Italian dessert with mascarpone and espresso',
        price: 6.99,
        category: 'dessert',
        image: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=300&h=300&fit=crop',
      },
    ],
  },
  {
    id: '6',
    name: 'Bangkok Street Kitchen',
    image: 'https://i.ibb.co.com/HpM9S1tF/thavatchai-samui-Ec3-1-H0k3q-Y-unsplash.jpg',
    rating: 4.5,
    deliveryTime: 26,
    deliveryFee: 2.99,
    distance: 1.3,
    minOrder: 12,
    cuisineType: 'Asian',
    badge: '20% Off',
    badgeColor: 'bg-amber-500',
    isOpen: true,
    menu: [
      {
        id: 'm21',
        name: 'Pad Thai',
        description: 'Stir-fried rice noodles with shrimp and peanuts',
        price: 11.99,
        category: 'noodles',
        image: 'https://i.ibb.co.com/HpM9S1tF/thavatchai-samui-Ec3-1-H0k3q-Y-unsplash.jpg',
        isPopular: true,
      },
      {
        id: 'm22',
        name: 'Green Curry Chicken',
        description: 'Spicy green curry with chicken and basil',
        price: 12.99,
        category: 'curry',
        image: 'https://i.ibb.co.com/HpM9S1tF/thavatchai-samui-Ec3-1-H0k3q-Y-unsplash.jpg',
      },
      {
        id: 'm23',
        name: 'Tom Yum Goong',
        description: 'Hot and sour soup with shrimp and lemongrass',
        price: 10.99,
        category: 'soup',
        image: 'https://i.ibb.co.com/HpM9S1tF/thavatchai-samui-Ec3-1-H0k3q-Y-unsplash.jpg',
        rating: 4.7,
      },
      {
        id: 'm24',
        name: 'Mango Sticky Rice',
        description: 'Sweet mango with sticky rice and coconut milk',
        price: 5.99,
        category: 'dessert',
        image: 'https://i.ibb.co.com/HpM9S1tF/thavatchai-samui-Ec3-1-H0k3q-Y-unsplash.jpg',
      },
    ],
  },
  {
    id: '7',
    name: 'Taco Fiesta',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500&h=300&fit=crop',
    rating: 4.4,
    deliveryTime: 24,
    deliveryFee: 2.49,
    distance: 0.9,
    minOrder: 10,
    cuisineType: 'Mexican',
    isOpen: true,
    menu: [
      {
        id: 'm25',
        name: 'Carnitas Tacos',
        description: 'Slow-cooked pork with onions, cilantro, and lime',
        price: 10.99,
        category: 'tacos',
        image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=300&h=300&fit=crop',
        isPopular: true,
      },
      {
        id: 'm26',
        name: 'Carne Asada Burrito',
        description: 'Grilled beef with rice, beans, cheese, and salsa',
        price: 11.99,
        category: 'burritos',
        image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=300&h=300&fit=crop',
      },
      {
        id: 'm27',
        name: 'Chile Relleno',
        description: 'Roasted poblano filled with cheese and sauce',
        price: 12.99,
        category: 'main',
        image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=300&h=300&fit=crop',
      },
      {
        id: 'm28',
        name: 'Churros with Chocolate',
        description: 'Crispy churros with dark chocolate dipping sauce',
        price: 5.49,
        category: 'dessert',
        image: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd1529c?w=300&h=300&fit=crop',
      },
    ],
  },
  {
    id: '8',
    name: 'Sweet Haven Bakery',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&h=300&fit=crop',
    rating: 4.9,
    deliveryTime: 20,
    deliveryFee: 1.99,
    distance: 0.6,
    minOrder: 8,
    cuisineType: 'Desserts',
    isOpen: true,
    menu: [
      {
        id: 'm29',
        name: 'Chocolate Lava Cake',
        description: 'Warm chocolate cake with molten center',
        price: 7.99,
        category: 'cakes',
        image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=300&fit=crop',
        isPopular: true,
      },
      {
        id: 'm30',
        name: 'Strawberry Cheesecake',
        description: 'Creamy cheesecake with fresh strawberries',
        price: 7.49,
        category: 'cheesecake',
        image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=300&fit=crop',
        rating: 4.9,
      },
      {
        id: 'm31',
        name: 'Macarons Box (6)',
        description: 'Assorted French macarons in various flavors',
        price: 8.99,
        category: 'macarons',
        image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=300&fit=crop',
      },
      {
        id: 'm32',
        name: 'Croissant',
        description: 'Buttery French croissant',
        price: 3.99,
        category: 'pastry',
        image: 'https://images.unsplash.com/photo-1585073033235-92b0e4f1d8b5?w=300&h=300&fit=crop',
      },
    ],
  },
]

export const getRestaurantById = (id: string) => {
  return restaurants.find((r) => r.id === id)
}

export const getCategoryBySlug = (slug: string) => {
  return categories.find((c) => c.slug === slug)
}

export const getRestaurantsByCategory = (cuisineType: string) => {
  return restaurants.filter((r) => r.cuisineType === cuisineType)
}

export const searchRestaurants = (query: string) => {
  const q = query.toLowerCase()
  return restaurants.filter(
    (r) =>
      r.name.toLowerCase().includes(q) ||
      r.cuisineType.toLowerCase().includes(q)
  )
}
