import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { toast } from '../hooks/use-toast';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${BACKEND_URL}/api/admin/login`, {
        username,
        password
      });

      if (response.data.access_token) {
        localStorage.setItem('admin_token', response.data.access_token);
        toast({
          title: "Login Successful!",
          description: "Welcome to Adanos Admin Panel",
        });
        navigate('/admin/dashboard');
      }
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Invalid username or password",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center bg-red-600 text-white rounded-t-lg py-6">
          <img 
            src="https://customer-assets.emergentagent.com/job_adanos-burger/artifacts/8z4ye4cz_adanos%20logo.jpg" 
            alt="Adanos Burger" 
            className="h-16 object-contain mx-auto mb-2"
          />
          <p className="text-red-100 mt-2">Admin Panel</p>
        </CardHeader>
        <CardContent className="p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <Label htmlFor="username" className="text-lg font-bold">Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                required
                className="mt-2 h-12 text-lg"
              />
            </div>
            <div>
              <Label htmlFor="password" className="text-lg font-bold">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
                className="mt-2 h-12 text-lg"
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-6 text-lg rounded-full"
            >
              {loading ? 'Logging in...' : 'Login to Admin Panel'}
            </Button>
          </form>
          <div className="mt-6 text-center text-sm text-gray-600">
            <p>Username: adanos</p>
            <p>Password: adanos2026</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;