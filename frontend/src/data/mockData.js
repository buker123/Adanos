// Mock data for Adanos Burger

export const burgers = [
  {
    id: 1,
    name: 'SINGLE SMASHBURGER',
    description: 'Premium beef patty, cheese, lettuce, tomato, pickles, onions, special sauce',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=600&fit=crop',
    category: 'burger',
    size: 'single'
  },
  {
    id: 2,
    name: 'DOUBLE SMASHBURGER',
    description: 'Two premium beef patties, double cheese, lettuce, tomato, pickles, onions, special sauce',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&h=600&fit=crop',
    category: 'burger',
    size: 'double'
  },
  {
    id: 3,
    name: 'TRIPLE SMASHBURGER',
    description: 'Three premium beef patties, triple cheese, lettuce, tomato, pickles, onions, special sauce',
    price: 15.99,
    image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=800&h=600&fit=crop',
    category: 'burger',
    size: 'triple'
  },
  {
    id: 4,
    name: 'CLASSIC CHEESEBURGER',
    description: 'Premium beef patty, cheese, lettuce, tomato, onions',
    price: 7.99,
    image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=800&h=600&fit=crop',
    category: 'burger'
  },
  {
    id: 5,
    name: 'CHICKEN BURGER',
    description: 'Crispy chicken breast, lettuce, tomato, mayo',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=800&h=600&fit=crop',
    category: 'burger'
  },
  {
    id: 6,
    name: 'VEGGIE BURGER',
    description: 'Plant-based patty, lettuce, tomato, pickles, vegan sauce',
    price: 9.99,
    image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?w=800&h=600&fit=crop',
    category: 'burger'
  }
];

export const sides = [
  {
    id: 7,
    name: 'CLASSIC FRIES',
    description: 'Crispy golden fries',
    price: 3.99,
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=800&h=600&fit=crop',
    category: 'sides'
  },
  {
    id: 8,
    name: 'LOADED FRIES',
    description: 'Fries topped with cheese and special sauce',
    price: 6.99,
    image: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=800&h=600&fit=crop',
    category: 'sides'
  },
  {
    id: 9,
    name: 'ONION RINGS',
    description: 'Crispy battered onion rings',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1639024471283-03518883512d?w=800&h=600&fit=crop',
    category: 'sides'
  }
];

export const drinks = [
  {
    id: 10,
    name: 'SOFT DRINK',
    description: 'Coca-Cola, Sprite, Fanta',
    price: 2.99,
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=800&h=600&fit=crop',
    category: 'drinks'
  },
  {
    id: 11,
    name: 'MILKSHAKE',
    description: 'Vanilla, Chocolate, or Strawberry',
    price: 5.99,
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=800&h=600&fit=crop',
    category: 'drinks'
  }
];

export const merchandise = [
  {
    id: 'm1',
    name: 'HOODIE',
    description: 'I KNOW ON',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=600&fit=crop',
    category: 'merch',
    type: 'hoodie'
  },
  {
    id: 'm2',
    name: 'T-SHIRT',
    description: 'Classic Adanos Burger Tee',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=600&fit=crop',
    category: 'merch',
    type: 'tshirt'
  },
  {
    id: 'm3',
    name: 'CAP',
    description: 'Adanos Burger Cap',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&h=600&fit=crop',
    category: 'merch',
    type: 'cap'
  },
  {
    id: 'm4',
    name: 'SWEATSHIRT',
    description: 'Comfortable crew neck',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&h=600&fit=crop',
    category: 'merch',
    type: 'sweatshirt'
  }
];

export const allProducts = [...burgers, ...sides, ...drinks, ...merchandise];

export const restaurantInfo = {
  name: 'Adanos Burger',
  address: '153 Oldham Rd, Failsworth, Manchester M35 0BX',
  phone: '0161 843 2233',
  email: 'info@adanosburger.com',
  hours: {
    weekday: '11:00 AM - 10:00 PM',
    weekend: '11:00 AM - 11:00 PM'
  },
  social: {
    instagram: '#',
    facebook: '#',
    twitter: '#'
  },
  mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2373.8395!2d-2.1637!3d53.5138!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487bb3b6!2s153%20Oldham%20Rd%2C%20Failsworth%2C%20Manchester%20M35%200BX!5e0!3m2!1sen!2suk!4v1234567890'
};

export const galleryImages = [
  'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1585238342024-78d387f4a707?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1582196016295-f8c8bd4b3a99?w=800&h=600&fit=crop'
];
