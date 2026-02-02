// Mock data for Adanos Burger - Based on Physical Menu

// BEEF BURGERS
export const beefBurgers = [
  {
    id: 'bb1',
    name: 'Adanos Burger',
    description: '2 Smashed Angus Patties, American Cheese, Lettuce, Onions, Gherkin\'s and House Sauce',
    price: 7.99,
    mealPrice: 9.99,
    image: 'https://customer-assets.emergentagent.com/job_adanos-import/artifacts/67vgde9o_Adanos%20BUrger.webp',
    category: 'beef-burgers',
    hasMealOption: true
  },
  {
    id: 'bb2',
    name: 'Meat Stack',
    description: 'Angus Beef Patty, Chicken Fillet, Onion Rings, American Cheese, Salad & House Sauce',
    price: 9.99,
    mealPrice: 11.99,
    image: 'https://customer-assets.emergentagent.com/job_adanos-import/artifacts/oh3gy15a_Meat%20Stack.webp',
    category: 'beef-burgers',
    hasMealOption: true
  },
  {
    id: 'bb3',
    name: 'Daddy Burger',
    description: 'Angus Beef Patty, Peri Chicken, Turkey Rasher, American Cheese, Salad & House Sauce',
    price: 9.99,
    mealPrice: 11.99,
    image: 'https://customer-assets.emergentagent.com/job_adanos-import/artifacts/g1rp4zla_Daddy%20Burger.webp',
    category: 'beef-burgers',
    hasMealOption: true
  },
  {
    id: 'bb4',
    name: 'Cheese Burger',
    description: 'Angus Beef, Cheese, Ketchup, Mayo',
    price: 6.99,
    mealPrice: 8.99,
    image: 'https://customer-assets.emergentagent.com/job_adanos-import/artifacts/jyf3g8hq_cheese%20burger.webp',
    category: 'beef-burgers',
    hasMealOption: true
  },
  {
    id: 'bb5',
    name: 'Black Angus Special',
    description: '2 Black Angus Patty, Caramelised Onions, Secret Sauce, Cheese Slice',
    price: 9.99,
    mealPrice: 11.99,
    image: 'https://customer-assets.emergentagent.com/job_adanos-import/artifacts/54ti5jjs_black%20Angus%20Burger.jpeg',
    category: 'beef-burgers',
    hasMealOption: true
  }
];

// CHICKEN BURGERS
export const chickenBurgers = [
  {
    id: 'cb1',
    name: 'Peri Peri Burger',
    description: 'Grilled Peri Peri Sauced Chicken, Cheese, Red Onions, Mayo & Lettuce',
    price: 6.99,
    mealPrice: 8.99,
    image: 'https://customer-assets.emergentagent.com/job_adanos-import/artifacts/xb24i529_Peri%20Peri%20Burger.webp',
    category: 'chicken-burgers',
    hasMealOption: true
  },
  {
    id: 'cb2',
    name: 'Classic Chicken Burger',
    description: 'Chicken Fillet, Lettuce, Mayo, Cheese Slice',
    price: 6.49,
    mealPrice: 8.49,
    image: 'https://customer-assets.emergentagent.com/job_adanos-import/artifacts/o4ck70mu_Classic.webp',
    category: 'chicken-burgers',
    hasMealOption: true
  },
  {
    id: 'cb3',
    name: 'Big Yummy Burger',
    description: 'Crispy Fried Chicken, Cheese, BBQ Sauce, Hash Brown, Jalepenos, Lettuce, Mayo, Nachos',
    price: 7.49,
    mealPrice: 9.49,
    image: 'https://customer-assets.emergentagent.com/job_adanos-import/artifacts/5ol2sf81_Big%20Yummy%20Burger.webp',
    category: 'chicken-burgers',
    hasMealOption: true
  },
  {
    id: 'cb4',
    name: 'Hot Yummy Burger',
    description: 'Hot Fillet, Hot Sauce, Mayo, Hash Brown, Cheese Slice, Lettuce, Jalapeno',
    price: 7.49,
    mealPrice: 9.49,
    image: 'https://customer-assets.emergentagent.com/job_adanos-import/artifacts/29ou6h7z_Hot%20Yummy%20Burger.webp',
    category: 'chicken-burgers',
    hasMealOption: true
  }
];

// BOX MEALS
export const boxMeals = [
  {
    id: 'bm1',
    name: 'Mini Munch Box',
    description: 'Beef or Chicken Burger, 2 Onion Rings, Chilli Cheese Bites, 2 Mild Wings, Cheesy House Fries',
    price: 11.99,
    image: 'https://images.unsplash.com/photo-1619881590738-a111d176d936?w=800&h=600&fit=crop',
    category: 'box-meals',
    hasMealOption: false
  },
  {
    id: 'bm2',
    name: 'Feast Munch Box',
    description: '1 Adanos Burger, 1 Chicken Burger, 4 Chilli Cheese Bites, 4 Onion Rings, 4 Wings, 2 Tender Strips, Cheesy Chips',
    price: 27.99,
    image: 'https://images.unsplash.com/photo-1561758033-7e924f619b47?w=800&h=600&fit=crop',
    category: 'box-meals',
    hasMealOption: false
  }
];

// LIGHT MEALS
export const lightMeals = [
  {
    id: 'lm1',
    name: 'Peri Peri Wrap',
    description: 'Grilled Peri Peri Chicken, Peri Peri Sauce, Cheese, Red Onions, Lettuce, Mayo',
    price: 6.99,
    mealPrice: 7.99,
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=800&h=600&fit=crop',
    category: 'light-meals',
    hasMealOption: true
  },
  {
    id: 'lm2',
    name: 'Classic Wrap',
    description: 'Fried Chicken Fillet, Lettuce, Cheese, Mayo',
    price: 6.99,
    mealPrice: 7.99,
    image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=800&h=600&fit=crop',
    category: 'light-meals',
    hasMealOption: true
  },
  {
    id: 'lm3',
    name: 'Veggie Burger',
    description: 'Veggie Burger, Cheese, Lettuce, Mayo',
    price: 6.49,
    mealPrice: 8.49,
    image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?w=800&h=600&fit=crop',
    category: 'light-meals',
    hasMealOption: true
  },
  {
    id: 'lm4',
    name: 'Chicken & Rice',
    description: 'Chicken Strips Served with Rice',
    price: 6.99,
    mealPrice: 9.49,
    image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&h=600&fit=crop',
    category: 'light-meals',
    hasMealOption: true
  },
  {
    id: 'lm5',
    name: 'Spicy Turkish Vegan Wrap',
    description: 'Fine Bulgur, Tomato Paste, Fresh Parsley, Green Onion, Olive Oil, Lemon Juice, Turkish Spices',
    price: 5.99,
    mealPrice: 7.49,
    image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=800&h=600&fit=crop',
    category: 'light-meals',
    hasMealOption: true
  },
  {
    id: 'lm6',
    name: 'Chicken Salad',
    description: 'Mixed leaf salad, olives, feta, lettuce, onion, tomato, cucumber, peppers, chicken',
    price: 6.49,
    mealPrice: 8.49,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop',
    category: 'light-meals',
    hasMealOption: true
  }
];

// LOADED CHIPS
export const loadedChips = [
  {
    id: 'lc1',
    name: 'Chicken Loaded Chips',
    description: '3 Chicken Strips, Skin on Fries, Nachos, Homemade Sauce and Cheese Sauce',
    price: 7.99,
    image: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=800&h=600&fit=crop',
    category: 'loaded-chips',
    hasMealOption: false
  },
  {
    id: 'lc2',
    name: 'Beef Loaded Chips',
    description: '2 Beef Patties, Skin on Fries, Nachos, Homemade Sauce and Cheese Sauce',
    price: 7.99,
    image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?w=800&h=600&fit=crop',
    category: 'loaded-chips',
    hasMealOption: false
  },
  {
    id: 'lc3',
    name: 'Mixed Loaded Chips',
    description: '1 Beef, 2 Chicken Strips, Skin on Fries, Nachos, Homemade Sauce and Cheese Sauce',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=800&h=600&fit=crop',
    category: 'loaded-chips',
    hasMealOption: false
  }
];

// ADANOS GRILLED
export const adanosGrilled = [
  {
    id: 'ag1',
    name: 'Butterfly Chicken',
    description: 'Marinated butterfly chicken served with salad, rice, chips & drinks. Choose your heat: Lemon & Herb, Mild, Hot, or Buffalo BBQ',
    price: 8.99,
    mealPrice: 10.99,
    image: 'https://customer-assets.emergentagent.com/job_adanos-import/artifacts/ulhyskkv_Butterfly%20Chicken.jpeg',
    category: 'adanos-grilled',
    hasMealOption: true
  },
  {
    id: 'ag3',
    name: 'Half Chicken',
    description: 'Half grilled chicken served with salad, rice, chips & drinks. Choose your heat level',
    price: 9.49,
    mealPrice: 11.49,
    image: 'https://customer-assets.emergentagent.com/job_adanos-import/artifacts/68ehhavv_Half%20Chicken.jpeg',
    category: 'adanos-grilled',
    hasMealOption: true
  },
  {
    id: 'ag5',
    name: '6pcs Chicken Wings',
    description: 'Meals Served with Fries and Drink. Choose your heat: Lemon & Herb, Mild, Hot, or Buffalo BBQ',
    price: 6.49,
    mealPrice: 8.99,
    image: 'https://customer-assets.emergentagent.com/job_adanos-import/artifacts/fu6n6o58_6%20Pieces%20Of%20Chicken%20Wings.jpeg',
    category: 'adanos-grilled',
    hasMealOption: true
  },
  {
    id: 'ag7',
    name: '4 Lamb Chops',
    description: 'Meals Served with Salad, Fries and Drink',
    price: 11.99,
    mealPrice: 14.49,
    image: 'https://customer-assets.emergentagent.com/job_adanos-import/artifacts/rdgpk4e7_Lamb%20Chops.jpeg',
    category: 'adanos-grilled',
    hasMealOption: true
  }
];

// SIDES
export const sides = [
  {
    id: 's1',
    name: 'Classic Fries',
    description: 'Crispy golden fries',
    price: 3.99,
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=800&h=600&fit=crop',
    category: 'sides',
    hasMealOption: false
  },
  {
    id: 's2',
    name: 'Onion Rings',
    description: 'Crispy battered onion rings',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1639024471283-03518883512d?w=800&h=600&fit=crop',
    category: 'sides',
    hasMealOption: false
  },
  {
    id: 's3',
    name: 'Cheese Fries',
    description: 'Fries topped with melted cheese sauce',
    price: 5.99,
    image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?w=800&h=600&fit=crop',
    category: 'sides',
    hasMealOption: false
  }
];

// DRINKS
export const drinks = [
  {
    id: 'd1',
    name: 'Soft Drink',
    description: 'Coca-Cola, Sprite, Fanta',
    price: 2.99,
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=800&h=600&fit=crop',
    category: 'drinks',
    hasMealOption: false
  },
  {
    id: 'd2',
    name: 'Milkshake',
    description: 'Vanilla, Chocolate, or Strawberry',
    price: 5.99,
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=800&h=600&fit=crop',
    category: 'drinks',
    hasMealOption: false
  }
];

// MERCHANDISE
export const merchandise = [
  {
    id: 'm1',
    name: 'HOODIE',
    description: 'Adanos Burger Hoodie',
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

// Toppings and Sauces
export const toppings = [
  { id: 't1', name: 'Extra Cheese', price: 1.50 },
  { id: 't2', name: 'Jalapeños', price: 1.00 },
  { id: 't3', name: 'Fried Egg', price: 1.50 },
  { id: 't4', name: 'Mushrooms', price: 1.50 },
  { id: 't5', name: 'Avocado', price: 2.00 },
  { id: 't6', name: 'Grilled Onions', price: 1.00 },
  { id: 't7', name: 'Crispy Onions', price: 1.00 },
  { id: 't8', name: 'Lettuce', price: 0.50 },
  { id: 't9', name: 'Tomatoes', price: 0.50 },
  { id: 't10', name: 'Pickles', price: 0.50 }
];

export const sauces = [
  { id: 's1', name: 'BBQ Sauce', price: 0.50 },
  { id: 's2', name: 'Garlic Mayo', price: 0.50 },
  { id: 's3', name: 'Peri-Peri Sauce', price: 0.50 },
  { id: 's4', name: 'Hot Sauce', price: 0.50 },
  { id: 's5', name: 'Burger Sauce', price: 0.50 },
  { id: 's6', name: 'Mustard', price: 0.50 }
];

// Menu categories for navigation
export const menuCategories = [
  { id: 'beef-burgers', name: 'Beef Burgers', items: beefBurgers },
  { id: 'chicken-burgers', name: 'Chicken Burgers', items: chickenBurgers },
  { id: 'box-meals', name: 'Box Meals', items: boxMeals },
  { id: 'light-meals', name: 'Light Meals', items: lightMeals },
  { id: 'loaded-chips', name: 'Loaded Chips', items: loadedChips },
  { id: 'adanos-grilled', name: 'Adanos Grilled', items: adanosGrilled },
];

// All products combined
export const allProducts = [
  ...beefBurgers,
  ...chickenBurgers,
  ...boxMeals,
  ...lightMeals,
  ...loadedChips,
  ...adanosGrilled,
  ...sides,
  ...drinks,
  ...merchandise
];

// Legacy exports for backward compatibility
export const burgers = [...beefBurgers, ...chickenBurgers];

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
    instagram: 'https://instagram.com/adanosburger',
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
