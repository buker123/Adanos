import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { CheckCircle, XCircle, Loader2, Phone, MapPin } from 'lucide-react';
import { useCart } from '../context/CartContext';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const OrderSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const [status, setStatus] = useState('loading'); // loading, success, error
  const [order, setOrder] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (!sessionId) {
      setStatus('error');
      return;
    }

    let pollCount = 0;
    const maxPolls = 10;
    const pollInterval = 2000;

    const pollPaymentStatus = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/payments/status/${sessionId}`);
        setPaymentDetails(response.data);

        if (response.data.payment_status === 'paid') {
          setStatus('success');
          clearCart(); // Clear cart after successful payment
          return true;
        } else if (response.data.status === 'expired') {
          setStatus('error');
          return true;
        }
        return false;
      } catch (error) {
        console.error('Error checking payment status:', error);
        if (pollCount >= maxPolls - 1) {
          setStatus('error');
          return true;
        }
        return false;
      }
    };

    const startPolling = async () => {
      const done = await pollPaymentStatus();
      if (!done && pollCount < maxPolls) {
        pollCount++;
        setTimeout(startPolling, pollInterval);
      }
    };

    startPolling();
  }, [sessionId, clearCart]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="p-8 text-center">
            <Loader2 className="h-16 w-16 mx-auto text-red-600 animate-spin mb-4" />
            <h2 className="text-xl font-bold mb-2">Processing your payment...</h2>
            <p className="text-gray-500">Please wait while we confirm your order.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="p-8 text-center">
            <XCircle className="h-16 w-16 mx-auto text-red-500 mb-4" />
            <h2 className="text-xl font-bold mb-2">Payment Issue</h2>
            <p className="text-gray-500 mb-6">
              We couldn't confirm your payment. If money was deducted, please contact us.
            </p>
            <div className="space-y-3">
              <Button onClick={() => navigate('/cart')} className="w-full bg-red-600 hover:bg-red-700">
                Return to Cart
              </Button>
              <Button onClick={() => navigate('/')} variant="outline" className="w-full">
                Go Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-lg">
        <Card className="shadow-lg">
          <CardContent className="p-8 text-center">
            <div className="bg-green-100 rounded-full w-20 h-20 mx-auto flex items-center justify-center mb-6">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            
            <h1 className="text-2xl font-black text-gray-900 mb-2">Order Confirmed!</h1>
            <p className="text-gray-600 mb-6">
              Thank you for your order. We're preparing your delicious food!
            </p>

            {paymentDetails && (
              <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                <h3 className="font-bold text-gray-900 mb-2">Order Details</h3>
                <p className="text-gray-600">
                  <span className="font-semibold">Amount Paid:</span>{' '}
                  £{(paymentDetails.amount_total / 100).toFixed(2)}
                </p>
              </div>
            )}

            <div className="bg-red-50 rounded-lg p-4 mb-6">
              <h3 className="font-bold text-red-600 mb-2">Collection Point</h3>
              <div className="flex items-start gap-2 text-gray-700 text-sm">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>153 Oldham Rd, Failsworth, Manchester M35 0BX</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700 text-sm mt-2">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>0161 843 2233</span>
              </div>
            </div>

            <p className="text-sm text-gray-500 mb-6">
              Your order will be ready in approximately 15-25 minutes.
              We'll call you when it's ready!
            </p>

            <div className="space-y-3">
              <Button onClick={() => navigate('/menu')} className="w-full bg-red-600 hover:bg-red-700">
                Order More
              </Button>
              <Button onClick={() => navigate('/')} variant="outline" className="w-full">
                Go Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OrderSuccess;
