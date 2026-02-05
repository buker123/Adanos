import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { toast } from '../hooks/use-toast';
import { ShoppingBag, CreditCard, Loader2 } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Checkout = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_phone: '',
    customer_email: '',
    order_type: 'collection',
    delivery_address: '',
    notes: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    
    if (cartItems.length === 0) {
      toast({ title: "Cart is empty", variant: "destructive" });
      return;
    }

    if (!formData.customer_name || !formData.customer_phone) {
      toast({ title: "Please fill in your name and phone number", variant: "destructive" });
      return;
    }

    if (formData.order_type === 'delivery' && !formData.delivery_address) {
      toast({ title: "Please enter your delivery address", variant: "destructive" });
      return;
    }

    setLoading(true);

    try {
      const items = cartItems.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image
      }));

      const response = await axios.post(`${BACKEND_URL}/api/payments/checkout`, {
        items,
        customer_name: formData.customer_name,
        customer_phone: formData.customer_phone,
        customer_email: formData.customer_email || null,
        order_type: formData.order_type,
        delivery_address: formData.order_type === 'delivery' ? formData.delivery_address : null,
        notes: formData.notes || null,
        origin_url: window.location.origin
      });

      if (response.data.url) {
        // Redirect to Stripe checkout
        window.location.href = response.data.url;
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast({ 
        title: "Checkout failed", 
        description: error.response?.data?.detail || "Please try again",
        variant: "destructive" 
      });
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <ShoppingBag className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
          <Button onClick={() => navigate('/menu')} className="bg-red-600 hover:bg-red-700">
            Browse Menu
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-black text-gray-900 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5" />
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center py-2 border-b">
                    <div className="flex items-center gap-3">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-bold">£{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
                
                <div className="pt-4 border-t">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-red-600">£{getCartTotal().toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Customer Details Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Your Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCheckout} className="space-y-4">
                <div>
                  <Label htmlFor="customer_name">Name *</Label>
                  <Input
                    id="customer_name"
                    name="customer_name"
                    value={formData.customer_name}
                    onChange={handleInputChange}
                    placeholder="Your full name"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="customer_phone">Phone Number *</Label>
                  <Input
                    id="customer_phone"
                    name="customer_phone"
                    type="tel"
                    value={formData.customer_phone}
                    onChange={handleInputChange}
                    placeholder="07xxx xxx xxx"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="customer_email">Email (optional)</Label>
                  <Input
                    id="customer_email"
                    name="customer_email"
                    type="email"
                    value={formData.customer_email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <Label>Order Type *</Label>
                  <RadioGroup
                    value={formData.order_type}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, order_type: value }))}
                    className="flex gap-4 mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="collection" id="collection" />
                      <Label htmlFor="collection" className="cursor-pointer">Collection</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="delivery" id="delivery" />
                      <Label htmlFor="delivery" className="cursor-pointer">Delivery</Label>
                    </div>
                  </RadioGroup>
                </div>

                {formData.order_type === 'delivery' && (
                  <div>
                    <Label htmlFor="delivery_address">Delivery Address *</Label>
                    <Textarea
                      id="delivery_address"
                      name="delivery_address"
                      value={formData.delivery_address}
                      onChange={handleInputChange}
                      placeholder="Enter your full delivery address"
                      required
                    />
                  </div>
                )}

                <div>
                  <Label htmlFor="notes">Special Instructions (optional)</Label>
                  <Textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Any allergies or special requests?"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-red-600 hover:bg-red-700 py-6 text-lg font-bold"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard className="mr-2 h-5 w-5" />
                      Pay £{getCartTotal().toFixed(2)}
                    </>
                  )}
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  You'll be redirected to Stripe for secure payment
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
