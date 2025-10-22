import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { merchandise } from '../../data/mockData';
import { useCart } from '../../context/CartContext';
import { toast } from '../ui/use-toast';

const MerchSection = () => {
  const { addToCart } = useCart();

  const handleAddToCart = (item) => {
    addToCart(item);
    toast({
      title: "Added to cart!",
      description: `${item.name} has been added to your cart.`,
    });
  };

  return (
    <section id="merch" className="py-20 bg-gradient-to-b from-red-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-4">
            Adanos Burger Merch
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Wear your love for great burgers. Check out our exclusive merchandise collection.
          </p>
          <div className="w-24 h-1 bg-red-600 mx-auto mt-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {merchandise.map((item) => (
            <Card
              key={item.id}
              className="group overflow-hidden hover:shadow-xl transition-all duration-300 bg-red-600 text-white border-0"
            >
              <div className="relative overflow-hidden bg-white h-64">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <CardContent className="p-6">
                <div className="text-center">
                  <h3 className="text-xl font-bold mb-2">
                    {item.name}
                  </h3>
                  <p className="text-white/80 text-sm mb-4">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black">
                      ${item.price.toFixed(2)}
                    </span>
                    <Button
                      onClick={() => handleAddToCart(item)}
                      className="bg-white text-red-600 hover:bg-gray-100 font-bold rounded-full transition-transform hover:scale-105"
                    >
                      I KNOW ON
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MerchSection;
