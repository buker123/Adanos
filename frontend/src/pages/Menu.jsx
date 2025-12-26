import React, { useState } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { Checkbox } from '../components/ui/checkbox';
import { Label } from '../components/ui/label';
import { Plus, Minus, ShoppingCart } from 'lucide-react';
import { 
  mealDeals, 
  burgers, 
  loadedFries, 
  fries, 
  chicken, 
  wraps, 
  sides, 
  desserts, 
  milkshakes, 
  drinks,
  toppings,
  sauces
} from '../data/justEatMenu';
import { useCart } from '../context/CartContext';
import { toast } from '../hooks/use-toast';

const Menu = () => {
  const [selectedProduct, setSelectedProduct] = useState(mealDeals[0]);
  const [quantity, setQuantity] = useState(1);
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [selectedSauces, setSelectedSauces] = useState([]);
  const [selectedSides, setSelectedSides] = useState([]);
  const [selectedDrinks, setSelectedDrinks] = useState([]);
  const [showProductList, setShowProductList] = useState(true);
  const { addToCart } = useCart();

  const categories = [
    { name: 'Meal Deals', items: mealDeals },
    { name: 'Burgers', items: burgers },
    { name: 'Loaded Fries', items: loadedFries },
    { name: 'Fries', items: fries },
    { name: 'Chicken', items: chicken },
    { name: 'Wraps', items: wraps },
    { name: 'Sides', items: sides },
    { name: 'Desserts', items: desserts },
    { name: 'Milkshakes', items: milkshakes },
    { name: 'Drinks', items: drinks }
  ];

  const handleToppingToggle = (topping) => {
    setSelectedToppings(prev =>
      prev.find(t => t.id === topping.id)
        ? prev.filter(t => t.id !== topping.id)
        : [...prev, topping]
    );
  };

  const handleSauceToggle = (sauce) => {
    setSelectedSauces(prev =>
      prev.find(s => s.id === sauce.id)
        ? prev.filter(s => s.id !== sauce.id)
        : [...prev, sauce]
    );
  };

  const handleSideToggle = (side) => {
    setSelectedSides(prev =>
      prev.find(s => s.id === side.id)
        ? prev.filter(s => s.id !== side.id)
        : [...prev, side]
    );
  };

  const handleDrinkToggle = (drink) => {
    setSelectedDrinks(prev =>
      prev.find(d => d.id === drink.id)
        ? prev.filter(d => d.id !== drink.id)
        : [...prev, drink]
    );
  };

  const calculateTotal = () => {
    const basePrice = selectedProduct.price * quantity;
    const toppingsPrice = selectedToppings.reduce((sum, t) => sum + t.price, 0) * quantity;
    const saucesPrice = selectedSauces.reduce((sum, s) => sum + s.price, 0) * quantity;
    const sidesPrice = selectedSides.reduce((sum, s) => sum + s.price, 0);
    const drinksPrice = selectedDrinks.reduce((sum, d) => sum + d.price, 0);
    return basePrice + toppingsPrice + saucesPrice + sidesPrice + drinksPrice;
  };

  const handleAddToCart = () => {
    const customizedProduct = {
      ...selectedProduct,
      customizations: {
        toppings: selectedToppings,
        sauces: selectedSauces,
        sides: selectedSides,
        drinks: selectedDrinks
      },
      totalPrice: calculateTotal(),
      quantity
    };
    
    addToCart(customizedProduct);
    toast({
      title: "Added to cart!",
      description: `${selectedProduct.name} has been added to your order.`,
    });
    
    // Reset selections
    setQuantity(1);
    setSelectedToppings([]);
    setSelectedSauces([]);
    setSelectedSides([]);
    setSelectedDrinks([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-black text-gray-900 mb-4">Our Menu</h1>
          <p className="text-xl text-gray-600">Customize your perfect meal</p>
          <div className="w-24 h-1 bg-red-600 mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Product List - Takes 1 column */}
          <div className={`lg:col-span-1 space-y-4 ${showProductList ? 'block' : 'hidden'} lg:block`}>
            {categories.map((category) => (
              <div key={category.name}>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{category.name}</h2>
                <div className="space-y-3">
                  {category.items.map((item) => (
                    <Card
                      key={item.id}
                      className={`cursor-pointer transition-all hover:shadow-lg ${
                        selectedProduct.id === item.id ? 'border-2 border-red-600 shadow-lg' : ''
                      }`}
                      onClick={() => {
                        setSelectedProduct(item);
                        setShowProductList(false);
                      }}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h3 className="font-bold text-gray-900">{item.name}</h3>
                            <p className="text-red-600 font-bold">£{item.price.toFixed(2)}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Product Details & Customization - Takes 3 columns */}
          <div className={`lg:col-span-3 ${!showProductList ? 'block' : 'hidden'} lg:block`}>
            {/* Back button for mobile */}
            <button
              onClick={() => setShowProductList(true)}
              className="lg:hidden mb-4 text-red-600 font-bold flex items-center text-lg"
            >
              ← Back to Menu
            </button>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Product Card - Takes 2 columns */}
              <div className="lg:col-span-2">
                <Card className="shadow-xl h-full">
              <CardContent className="p-8">
                {/* Product Image & Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="relative">
                    <img
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      className="w-full h-80 object-cover rounded-xl shadow-lg"
                    />
                    {selectedProduct.size && (
                      <Badge className="absolute top-4 left-4 bg-red-600 text-white">
                        {selectedProduct.size.toUpperCase()}
                      </Badge>
                    )}
                  </div>
                  <div>
                    <h2 className="text-3xl font-black text-gray-900 mb-4">
                      {selectedProduct.name}
                    </h2>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {selectedProduct.description}
                    </p>
                    <div className="flex items-center space-x-4 mb-6">
                      <span className="text-4xl font-black text-red-600">
                        £{selectedProduct.price.toFixed(2)}
                      </span>
                      {selectedProduct.category === 'burger' && (
                        <Badge variant="outline" className="border-green-600 text-green-600">
                          HALAL
                        </Badge>
                      )}
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center space-x-4">
                      <span className="text-lg font-bold text-gray-900">Quantity:</span>
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="h-10 w-10 p-0 rounded-full"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="text-2xl font-bold w-12 text-center">{quantity}</span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setQuantity(quantity + 1)}
                          className="h-10 w-10 p-0 rounded-full"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Customization Options */}
                {selectedProduct.category === 'burger' && (
                  <Accordion type="multiple" className="w-full">
                    {/* Extra Toppings */}
                    <AccordionItem value="toppings">
                      <AccordionTrigger className="text-xl font-bold">
                        Extra Toppings
                        {selectedToppings.length > 0 && (
                          <Badge className="ml-2 bg-red-600">{selectedToppings.length}</Badge>
                        )}
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                          {toppings.map((topping) => (
                            <div key={topping.id} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg">
                              <Checkbox
                                id={`topping-${topping.id}`}
                                checked={selectedToppings.find(t => t.id === topping.id)}
                                onCheckedChange={() => handleToppingToggle(topping)}
                              />
                              <Label
                                htmlFor={`topping-${topping.id}`}
                                className="flex-1 cursor-pointer"
                              >
                                <div className="flex justify-between items-center">
                                  <span className="font-semibold">{topping.name}</span>
                                  <span className="text-red-600 font-bold">+£{topping.price.toFixed(2)}</span>
                                </div>
                              </Label>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    {/* Extra Sauces */}
                    <AccordionItem value="sauces">
                      <AccordionTrigger className="text-xl font-bold">
                        Extra Sauces
                        {selectedSauces.length > 0 && (
                          <Badge className="ml-2 bg-red-600">{selectedSauces.length}</Badge>
                        )}
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                          {sauces.map((sauce) => (
                            <div key={sauce.id} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg">
                              <Checkbox
                                id={`sauce-${sauce.id}`}
                                checked={selectedSauces.find(s => s.id === sauce.id)}
                                onCheckedChange={() => handleSauceToggle(sauce)}
                              />
                              <Label
                                htmlFor={`sauce-${sauce.id}`}
                                className="flex-1 cursor-pointer"
                              >
                                <div className="flex justify-between items-center">
                                  <span className="font-semibold">{sauce.name}</span>
                                  <span className="text-red-600 font-bold">+£{sauce.price.toFixed(2)}</span>
                                </div>
                              </Label>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    {/* Add Sides */}
                    <AccordionItem value="sides">
                      <AccordionTrigger className="text-xl font-bold">
                        Add Sides
                        {selectedSides.length > 0 && (
                          <Badge className="ml-2 bg-red-600">{selectedSides.length}</Badge>
                        )}
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="grid grid-cols-1 gap-4 pt-4">
                          {sides.map((side) => (
                            <div key={side.id} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg">
                              <Checkbox
                                id={`side-${side.id}`}
                                checked={selectedSides.find(s => s.id === side.id)}
                                onCheckedChange={() => handleSideToggle(side)}
                              />
                              <Label
                                htmlFor={`side-${side.id}`}
                                className="flex-1 cursor-pointer"
                              >
                                <div className="flex justify-between items-center">
                                  <div>
                                    <span className="font-semibold block">{side.name}</span>
                                    <span className="text-gray-500 text-sm">{side.description}</span>
                                  </div>
                                  <span className="text-red-600 font-bold">£{side.price.toFixed(2)}</span>
                                </div>
                              </Label>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    {/* Add Drinks */}
                    <AccordionItem value="drinks">
                      <AccordionTrigger className="text-xl font-bold">
                        Add Drinks
                        {selectedDrinks.length > 0 && (
                          <Badge className="ml-2 bg-red-600">{selectedDrinks.length}</Badge>
                        )}
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="grid grid-cols-1 gap-4 pt-4">
                          {drinks.map((drink) => (
                            <div key={drink.id} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg">
                              <Checkbox
                                id={`drink-${drink.id}`}
                                checked={selectedDrinks.find(d => d.id === drink.id)}
                                onCheckedChange={() => handleDrinkToggle(drink)}
                              />
                              <Label
                                htmlFor={`drink-${drink.id}`}
                                className="flex-1 cursor-pointer"
                              >
                                <div className="flex justify-between items-center">
                                  <div>
                                    <span className="font-semibold block">{drink.name}</span>
                                    <span className="text-gray-500 text-sm">{drink.description}</span>
                                  </div>
                                  <span className="text-red-600 font-bold">£{drink.price.toFixed(2)}</span>
                                </div>
                              </Label>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                )}

                {/* Total & Add to Cart */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-2xl font-bold text-gray-900">Total:</span>
                    <span className="text-4xl font-black text-red-600">£{calculateTotal().toFixed(2)}</span>
                  </div>
                  <Button
                    onClick={handleAddToCart}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-6 text-lg rounded-full transition-transform hover:scale-105"
                  >
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    ADD TO CART
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Popular Items & Info - Takes 1 column */}
          <div className="lg:col-span-1 space-y-6 hidden lg:block">
            {/* Popular Items */}
            <Card className="shadow-lg bg-gradient-to-br from-red-50 to-white">
              <CardContent className="p-6">
                <h3 className="text-xl font-black text-gray-900 mb-4 flex items-center">
                  🔥 Popular Items
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                    <img
                      src={mealDeals[0].image}
                      alt="Single Burger Meal"
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <p className="font-bold text-sm">Single Burger Meal</p>
                      <p className="text-red-600 font-bold text-sm">£{mealDeals[0].price.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                    <img
                      src={burgers[1].image}
                      alt="Double Burger"
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <p className="font-bold text-sm">Double Adanos Burger</p>
                      <p className="text-red-600 font-bold text-sm">£{burgers[1].price.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                    <img
                      src={chicken[1].image}
                      alt="6 Chicken Strips"
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <p className="font-bold text-sm">6 Chicken Strips</p>
                      <p className="text-red-600 font-bold text-sm">£{chicken[1].price.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Special Offer */}
            <Card className="shadow-lg bg-red-600 text-white">
              <CardContent className="p-6">
                <h3 className="text-xl font-black mb-2">🎉 Special Offer!</h3>
                <p className="text-white/90 text-sm mb-3">
                  Get 10% off on orders over £15
                </p>
                <div className="bg-white/20 rounded-lg p-3 text-center">
                  <p className="text-xs mb-1">Use code:</p>
                  <p className="text-2xl font-black">ADANOS10</p>
                </div>
              </CardContent>
            </Card>

            {/* Delivery Info */}
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-lg font-black text-gray-900 mb-4">📍 Delivery Info</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start space-x-2">
                    <span className="text-red-600">✓</span>
                    <p className="text-gray-600">Free delivery on orders over £20</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-red-600">✓</span>
                    <p className="text-gray-600">Average delivery time: 30-45 min</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-red-600">✓</span>
                    <p className="text-gray-600">All ingredients are 100% Halal</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-lg font-black text-gray-900 mb-4">📞 Contact Us</h3>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-600">153 Oldham Rd, Failsworth</p>
                  <p className="text-gray-600">Manchester M35 0BX</p>
                  <a href="tel:01618432233" className="text-red-600 font-bold hover:underline block">
                    0161 843 2233
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
