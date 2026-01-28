import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { Checkbox } from '../components/ui/checkbox';
import { Label } from '../components/ui/label';
import { Plus, Minus, ShoppingCart } from 'lucide-react';
import { 
  beefBurgers, 
  chickenBurgers, 
  boxMeals, 
  lightMeals, 
  loadedChips, 
  adanosGrilled,
  sides, 
  drinks, 
  toppings, 
  sauces,
  menuCategories 
} from '../data/mockData';
import { useCart } from '../context/CartContext';
import { toast } from '../hooks/use-toast';

const Menu = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || 'beef-burgers');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isMealOption, setIsMealOption] = useState(false);
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [selectedSauces, setSelectedSauces] = useState([]);
  const [selectedSides, setSelectedSides] = useState([]);
  const [selectedDrinks, setSelectedDrinks] = useState([]);
  const [showProductList, setShowProductList] = useState(true);
  const { addToCart } = useCart();

  // Update selected category when URL changes
  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  // Get filtered items based on selected category
  const getFilteredItems = () => {
    switch (selectedCategory) {
      case 'beef-burgers':
        return [{ name: 'Beef Burgers', items: beefBurgers }];
      case 'chicken-burgers':
        return [{ name: 'Chicken Burgers', items: chickenBurgers }];
      case 'box-meals':
        return [{ name: 'Box Meals', items: boxMeals }];
      case 'light-meals':
        return [{ name: 'Light Meals', items: lightMeals }];
      case 'loaded-chips':
        return [{ name: 'Loaded Chips', items: loadedChips }];
      case 'adanos-grilled':
        return [{ name: 'Adanos Grilled', items: adanosGrilled }];
      default:
        return [
          { name: 'Beef Burgers', items: beefBurgers },
          { name: 'Chicken Burgers', items: chickenBurgers },
          { name: 'Box Meals', items: boxMeals },
          { name: 'Light Meals', items: lightMeals },
          { name: 'Loaded Chips', items: loadedChips },
          { name: 'Adanos Grilled', items: adanosGrilled },
        ];
    }
  };

  const categories = getFilteredItems();

  // Set initial selected product
  useEffect(() => {
    if (categories.length > 0 && categories[0].items.length > 0 && !selectedProduct) {
      setSelectedProduct(categories[0].items[0]);
    }
  }, [categories, selectedProduct]);

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
    if (!selectedProduct) return 0;
    const basePrice = (isMealOption && selectedProduct.mealPrice ? selectedProduct.mealPrice : selectedProduct.price) * quantity;
    const toppingsPrice = selectedToppings.reduce((sum, t) => sum + t.price, 0) * quantity;
    const saucesPrice = selectedSauces.reduce((sum, s) => sum + s.price, 0) * quantity;
    const sidesPrice = selectedSides.reduce((sum, s) => sum + s.price, 0);
    const drinksPrice = selectedDrinks.reduce((sum, d) => sum + d.price, 0);
    return basePrice + toppingsPrice + saucesPrice + sidesPrice + drinksPrice;
  };

  const handleAddToCart = () => {
    if (!selectedProduct) return;
    
    const customizedProduct = {
      ...selectedProduct,
      isMealOption,
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
      description: `${selectedProduct.name}${isMealOption ? ' (Meal)' : ''} has been added to your order.`,
    });
    
    // Reset selections
    setQuantity(1);
    setIsMealOption(false);
    setSelectedToppings([]);
    setSelectedSauces([]);
    setSelectedSides([]);
    setSelectedDrinks([]);
  };

  const getCategoryTitle = () => {
    switch (selectedCategory) {
      case 'beef-burgers': return 'Beef Burgers';
      case 'chicken-burgers': return 'Chicken Burgers';
      case 'box-meals': return 'Box Meals';
      case 'light-meals': return 'Light Meals';
      case 'loaded-chips': return 'Loaded Chips';
      case 'adanos-grilled': return 'Adanos Grilled';
      default: return 'Our Menu';
    }
  };

  if (!selectedProduct) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading menu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-black text-gray-900 mb-4">{getCategoryTitle()}</h1>
          <p className="text-xl text-gray-600">
            {selectedCategory === 'all' ? 'Customize your perfect meal' : 'All meals are served with chips & drinks'}
          </p>
          <div className="w-24 h-1 bg-red-600 mx-auto mt-4"></div>
        </div>

        {/* Category Filter Tabs */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex space-x-2 pb-2 min-w-max">
            <Button
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              className={selectedCategory === 'all' ? 'bg-red-600 hover:bg-red-700' : ''}
              onClick={() => setSelectedCategory('all')}
            >
              All Menu
            </Button>
            {menuCategories.map((cat) => (
              <Button
                key={cat.id}
                variant={selectedCategory === cat.id ? 'default' : 'outline'}
                className={selectedCategory === cat.id ? 'bg-red-600 hover:bg-red-700' : ''}
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.name}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Product List */}
          <div className={`lg:col-span-1 space-y-6 ${showProductList ? 'block' : 'hidden'} lg:block`}>
            {categories.map((category) => (
              <div key={category.name}>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="w-2 h-8 bg-red-600 rounded mr-3"></span>
                  {category.name}
                </h2>
                <div className="space-y-3">
                  {category.items.map((item) => (
                    <Card
                      key={item.id}
                      className={`cursor-pointer transition-all hover:shadow-lg ${
                        selectedProduct.id === item.id ? 'border-2 border-red-600 shadow-lg' : ''
                      }`}
                      onClick={() => {
                        setSelectedProduct(item);
                        setIsMealOption(false);
                        setShowProductList(false);
                      }}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h3 className="font-bold text-gray-900">{item.name}</h3>
                            <p className="text-gray-500 text-sm line-clamp-1">{item.description}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-red-600 font-bold">£{item.price.toFixed(2)}</span>
                              {item.hasMealOption && item.mealPrice && (
                                <span className="text-gray-500 text-sm">/ £{item.mealPrice.toFixed(2)} meal</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Product Details & Customization */}
          <div className={`lg:col-span-2 ${!showProductList ? 'block' : 'hidden'} lg:block`}>
            {/* Back button for mobile */}
            <button
              onClick={() => setShowProductList(true)}
              className="lg:hidden mb-4 text-red-600 font-bold flex items-center text-lg"
            >
              ← Back to Menu
            </button>
            <Card className="shadow-xl">
              <CardContent className="p-8">
                {/* Product Image & Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="relative">
                    <img
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      className="w-full h-80 object-cover rounded-xl shadow-lg"
                    />
                    <Badge className="absolute top-4 left-4 bg-green-600 text-white">
                      HALAL
                    </Badge>
                  </div>
                  <div>
                    <h2 className="text-3xl font-black text-gray-900 mb-4">
                      {selectedProduct.name}
                    </h2>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {selectedProduct.description}
                    </p>
                    
                    {/* Price Display */}
                    <div className="mb-6">
                      {selectedProduct.hasMealOption && selectedProduct.mealPrice ? (
                        <div className="space-y-3">
                          <div 
                            className={`flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-all ${
                              !isMealOption ? 'border-red-600 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                            }`}
                            onClick={() => setIsMealOption(false)}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                !isMealOption ? 'border-red-600' : 'border-gray-300'
                              }`}>
                                {!isMealOption && <div className="w-3 h-3 rounded-full bg-red-600"></div>}
                              </div>
                              <span className="font-bold">Single</span>
                            </div>
                            <span className="text-2xl font-black text-red-600">£{selectedProduct.price.toFixed(2)}</span>
                          </div>
                          <div 
                            className={`flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-all ${
                              isMealOption ? 'border-red-600 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                            }`}
                            onClick={() => setIsMealOption(true)}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                isMealOption ? 'border-red-600' : 'border-gray-300'
                              }`}>
                                {isMealOption && <div className="w-3 h-3 rounded-full bg-red-600"></div>}
                              </div>
                              <div>
                                <span className="font-bold">Meal</span>
                                <span className="text-gray-500 text-sm ml-2">(with chips & drink)</span>
                              </div>
                            </div>
                            <span className="text-2xl font-black text-red-600">£{selectedProduct.mealPrice.toFixed(2)}</span>
                          </div>
                        </div>
                      ) : (
                        <span className="text-4xl font-black text-red-600">
                          £{selectedProduct.price.toFixed(2)}
                        </span>
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

                {/* Customization Options - Only show for burgers */}
                {(selectedProduct.category === 'beef-burgers' || selectedProduct.category === 'chicken-burgers') && (
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

                    {/* Add Sides - only if not meal option */}
                    {!isMealOption && (
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
                    )}

                    {/* Add Drinks - only if not meal option */}
                    {!isMealOption && (
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
                    )}
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
        </div>
      </div>
    </div>
  );
};

export default Menu;
