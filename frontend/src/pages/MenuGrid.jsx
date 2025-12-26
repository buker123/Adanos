import React, { useState } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { ShoppingCart } from 'lucide-react';
import { 
  beefBurgers,
  chickenBurgers,
  sides,
  salads,
  kidsMeals,
  chickenWings,
  lightMeals,
  lambChops,
  grilledChicken,
  milkshakes,
  smoothies,
  waffles,
  churros,
  cookieDough,
  drinks,
  allProducts
} from '../data/uberEatsMenu';
import { useCart } from '../context/CartContext';
import { toast } from '../hooks/use-toast';

const MenuGrid = () => {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Items', items: allProducts },
    { id: 'beef-burgers', name: 'Beef Burgers', items: beefBurgers },
    { id: 'chicken-burgers', name: 'Chicken Burgers', items: chickenBurgers },
    { id: 'chicken-wings', name: 'Chicken Wings', items: chickenWings },
    { id: 'grilled-chicken', name: 'Grilled Chicken', items: grilledChicken },
    { id: 'lamb-chops', name: 'Lamb Chops', items: lambChops },
    { id: 'light-meals', name: 'Wraps & Light Meals', items: lightMeals },
    { id: 'sides', name: 'Sides', items: sides },
    { id: 'salads', name: 'Salads', items: salads },
    { id: 'kids-meals', name: 'Kids Meals', items: kidsMeals },
    { id: 'milkshakes', name: 'Milkshakes', items: milkshakes },
    { id: 'smoothies', name: 'Smoothies', items: smoothies },
    { id: 'waffles', name: 'Waffles', items: waffles },
    { id: 'churros', name: 'Churros', items: churros },
    { id: 'cookie-dough', name: 'Cookie Dough', items: cookieDough },
    { id: 'drinks', name: 'Drinks', items: drinks }
  ];

  const currentCategory = categories.find(cat => cat.id === selectedCategory);
  const displayItems = currentCategory ? currentCategory.items : [];

  const handleAddToCart = (item) => {
    addToCart(item);
    toast({
      title: "Added to cart!",
      description: `${item.name} has been added to your order.`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-black text-gray-900 mb-4">Our Menu</h1>
          <p className="text-xl text-gray-600">Browse our complete menu from Just Eat</p>
          <div className="w-24 h-1 bg-red-600 mx-auto mt-4"></div>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <Button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`rounded-full px-6 py-2 font-bold transition-all ${
                  selectedCategory === category.id
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-red-600 hover:text-red-600'
                }`}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayItems.map((item) => (
            <Card
              key={item.id}
              className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-2 hover:border-red-600"
            >
              <div className="relative overflow-hidden bg-gradient-to-br from-red-50 to-white h-48">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {item.category === 'meal-deal' && (
                  <Badge className="absolute top-3 right-3 bg-green-600 text-white">
                    MEAL DEAL
                  </Badge>
                )}
                {item.category === 'burger' && (
                  <Badge className="absolute top-3 right-3 bg-green-600 text-white">
                    HALAL
                  </Badge>
                )}
              </div>
              <CardContent className="p-4">
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 min-h-[56px]">
                  {item.name}
                </h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {item.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black text-red-600">
                    £{item.price.toFixed(2)}
                  </span>
                  <Button
                    onClick={() => handleAddToCart(item)}
                    size="sm"
                    className="bg-red-600 hover:bg-red-700 text-white font-bold rounded-full transition-transform hover:scale-105"
                  >
                    <ShoppingCart className="h-4 w-4 mr-1" />
                    Add
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {displayItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No items in this category</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuGrid;
