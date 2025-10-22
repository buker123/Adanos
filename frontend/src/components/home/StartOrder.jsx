import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { allProducts } from '../../data/mockData';
import { useCart } from '../../context/CartContext';
import { toast } from '../ui/use-toast';

const StartOrder = () => {
  const { addToCart } = useCart();
  const featuredProducts = allProducts.slice(0, 6);

  const handleAddToOrder = (product) => {
    addToCart(product);
    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your order.`,
    });
  };

  return (
    <section id="menu" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-4">
            Start Your Order
          </h2>
          <div className="w-24 h-1 bg-red-600 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <Card
              key={product.id}
              className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-2 hover:border-red-600"
            >
              <div className="relative overflow-hidden bg-gradient-to-br from-red-50 to-white h-64">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black text-red-600">
                    ${product.price.toFixed(2)}
                  </span>
                  <Button
                    onClick={() => handleAddToOrder(product)}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold rounded-full transition-transform hover:scale-105"
                  >
                    ADD TO ORDER
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StartOrder;
