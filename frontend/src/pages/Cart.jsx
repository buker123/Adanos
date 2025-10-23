import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { toast } from '../hooks/use-toast';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

  const handleCheckout = () => {
    toast({
      title: "Order Placed!",
      description: "Your order has been successfully placed. We'll prepare it fresh for you!",
    });
    clearCart();
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-6" />
            <h1 className="text-4xl font-black text-gray-900 mb-4">Your Cart is Empty</h1>
            <p className="text-xl text-gray-600 mb-8">
              Start adding some delicious burgers to your order!
            </p>
            <Link to="/">
              <Button
                size="lg"
                className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-6 rounded-full transition-transform hover:scale-105"
              >
                START ORDERING
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl lg:text-5xl font-black text-gray-900 mb-8">Your Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item, index) => {
              // Calculate item total including customizations
              const basePrice = item.price;
              const toppingsPrice = item.customizations?.toppings?.reduce((sum, t) => sum + t.price, 0) || 0;
              const saucesPrice = item.customizations?.sauces?.reduce((sum, s) => sum + s.price, 0) || 0;
              const sidesPrice = item.customizations?.sides?.reduce((sum, s) => sum + s.price, 0) || 0;
              const drinksPrice = item.customizations?.drinks?.reduce((sum, d) => sum + d.price, 0) || 0;
              const itemTotal = (basePrice + toppingsPrice + saucesPrice) * item.quantity + sidesPrice + drinksPrice;

              return (
                <Card key={`${item.id}-${index}`} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-6">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{item.name}</h3>
                        <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                        
                        {/* Display Customizations */}
                        {item.customizations && (
                          <div className="space-y-2 mb-3">
                            {item.customizations.toppings?.length > 0 && (
                              <div className="text-sm">
                                <span className="font-semibold text-gray-700">Toppings: </span>
                                <span className="text-gray-600">
                                  {item.customizations.toppings.map(t => `${t.name} (+£${t.price.toFixed(2)})`).join(', ')}
                                </span>
                              </div>
                            )}
                            {item.customizations.sauces?.length > 0 && (
                              <div className="text-sm">
                                <span className="font-semibold text-gray-700">Sauces: </span>
                                <span className="text-gray-600">
                                  {item.customizations.sauces.map(s => `${s.name} (+£${s.price.toFixed(2)})`).join(', ')}
                                </span>
                              </div>
                            )}
                            {item.customizations.sides?.length > 0 && (
                              <div className="text-sm">
                                <span className="font-semibold text-gray-700">Sides: </span>
                                <span className="text-gray-600">
                                  {item.customizations.sides.map(s => `${s.name} (£${s.price.toFixed(2)})`).join(', ')}
                                </span>
                              </div>
                            )}
                            {item.customizations.drinks?.length > 0 && (
                              <div className="text-sm">
                                <span className="font-semibold text-gray-700">Drinks: </span>
                                <span className="text-gray-600">
                                  {item.customizations.drinks.map(d => `${d.name} (£${d.price.toFixed(2)})`).join(', ')}
                                </span>
                              </div>
                            )}
                          </div>
                        )}

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-500">Base: £{basePrice.toFixed(2)}</p>
                            {(toppingsPrice + saucesPrice) > 0 && (
                              <p className="text-sm text-gray-500">Extras: £{(toppingsPrice + saucesPrice).toFixed(2)} × {item.quantity}</p>
                            )}
                            {(sidesPrice + drinksPrice) > 0 && (
                              <p className="text-sm text-gray-500">Sides/Drinks: £{(sidesPrice + drinksPrice).toFixed(2)}</p>
                            )}
                          </div>
                          <p className="text-2xl font-black text-red-600">
                            £{itemTotal.toFixed(2)}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-4">
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="h-8 w-8 p-0 rounded-full"
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="text-lg font-bold w-8 text-center">{item.quantity}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="h-8 w-8 p-0 rounded-full"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => removeFromCart(item.id)}
                          className="h-10 w-10 p-0 rounded-full"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h2 className="text-2xl font-black text-gray-900 mb-6">Order Summary</h2>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-semibold">£{getCartTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery Fee</span>
                    <span className="font-semibold">£3.99</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-xl font-black text-gray-900">
                      <span>Total</span>
                      <span className="text-red-600">£{(getCartTotal() + 3.99).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                <Button
                  onClick={handleCheckout}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-6 rounded-full transition-transform hover:scale-105 text-lg"
                >
                  CHECKOUT
                </Button>
                <Link to="/">
                  <Button
                    variant="outline"
                    className="w-full mt-4 font-bold py-6 rounded-full"
                  >
                    CONTINUE SHOPPING
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
