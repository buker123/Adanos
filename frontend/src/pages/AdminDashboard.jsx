import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Checkbox } from '../components/ui/checkbox';
import { toast } from '../hooks/use-toast';
import { Plus, Edit, Trash2, LogOut } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const AdminDashboard = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [editingItem, setEditingItem] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    category: 'beef-burgers',
    rating: '',
    popular: false,
    spicy: false,
    available: true
  });

  const categories = [
    { id: 'all', name: 'All Items' },
    { id: 'beef-burgers', name: 'Beef Burgers' },
    { id: 'chicken-burgers', name: 'Chicken Burgers' },
    { id: 'chicken-wings', name: 'Chicken Wings' },
    { id: 'grilled-chicken', name: 'Grilled Chicken' },
    { id: 'lamb-chops', name: 'Lamb Chops' },
    { id: 'light-meals', name: 'Wraps & Light Meals' },
    { id: 'sides', name: 'Sides' },
    { id: 'salads', name: 'Salads' },
    { id: 'kids-meals', name: 'Kids Meals' },
    { id: 'milkshakes', name: 'Milkshakes' },
    { id: 'smoothies', name: 'Smoothies' },
    { id: 'waffles', name: 'Waffles' },
    { id: 'churros', name: 'Churros' },
    { id: 'cookie-dough', name: 'Cookie Dough' },
    { id: 'drinks', name: 'Drinks' }
  ];

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      navigate('/admin');
      return;
    }
    fetchMenuItems();
  }, [navigate]);

  const fetchMenuItems = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/menu/items`);
      setMenuItems(response.data);
    } catch (error) {
      console.error('Error fetching menu items:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    navigate('/admin');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await axios.put(`${BACKEND_URL}/api/menu/items/${editingItem.id}`, formData);
        toast({ title: "Item updated successfully!" });
      } else {
        await axios.post(`${BACKEND_URL}/api/menu/items`, formData);
        toast({ title: "Item created successfully!" });
      }
      resetForm();
      fetchMenuItems();
    } catch (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price.toString(),
      image: item.image,
      category: item.category,
      rating: item.rating || '',
      popular: item.popular || false,
      spicy: item.spicy || false,
      available: item.available !== false
    });
    setShowForm(true);
  };

  const handleDelete = async (itemId) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await axios.delete(`${BACKEND_URL}/api/menu/items/${itemId}`);
        toast({ title: "Item deleted successfully!" });
        fetchMenuItems();
      } catch (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      image: '',
      category: 'beef-burgers',
      rating: '',
      popular: false,
      spicy: false,
      available: true
    });
    setEditingItem(null);
    setShowForm(false);
  };

  const filteredItems = selectedCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-red-600 text-white p-6 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-black">ADANOS BURGER</h1>
            <p className="text-red-100">Admin Panel - Menu Management</p>
          </div>
          <Button onClick={handleLogout} variant="outline" className="bg-white text-red-600 hover:bg-red-50">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>

      <div className="container mx-auto p-6">
        {/* Actions */}
        <div className="mb-6 flex justify-between items-center">
          <div className="flex gap-4">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-64">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map(cat => (
                  <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button onClick={() => setShowForm(!showForm)} className="bg-red-600 hover:bg-red-700">
            <Plus className="mr-2 h-4 w-4" />
            Add New Item
          </Button>
        </div>

        {/* Add/Edit Form */}
        {showForm && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>{editingItem ? 'Edit Item' : 'Add New Item'}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Name</Label>
                  <Input value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
                </div>
                <div>
                  <Label>Price (£)</Label>
                  <Input type="number" step="0.01" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} required />
                </div>
                <div className="md:col-span-2">
                  <Label>Description</Label>
                  <Textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} required />
                </div>
                <div className="md:col-span-2">
                  <Label>Image URL</Label>
                  <Input value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} required />
                </div>
                <div>
                  <Label>Category</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.filter(c => c.id !== 'all').map(cat => (
                        <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Rating (optional)</Label>
                  <Input value={formData.rating} onChange={(e) => setFormData({...formData, rating: e.target.value})} placeholder="90%" />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox checked={formData.popular} onCheckedChange={(checked) => setFormData({...formData, popular: checked})} />
                  <Label>Popular Item</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox checked={formData.spicy} onCheckedChange={(checked) => setFormData({...formData, spicy: checked})} />
                  <Label>Spicy</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox checked={formData.available} onCheckedChange={(checked) => setFormData({...formData, available: checked})} />
                  <Label>Available</Label>
                </div>
                <div className="md:col-span-2 flex gap-4">
                  <Button type="submit" className="bg-red-600 hover:bg-red-700">Save Item</Button>
                  <Button type="button" variant="outline" onClick={resetForm}>Cancel</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map(item => (
            <Card key={item.id}>
              <CardContent className="p-4">
                <img src={item.image} alt={item.name} className="w-full h-40 object-cover rounded mb-3" />
                <h3 className="font-bold text-lg mb-1">{item.name}</h3>
                <p className="text-sm text-gray-600 mb-2 line-clamp-2">{item.description}</p>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xl font-black text-red-600">£{item.price.toFixed(2)}</span>
                  {item.rating && <span className="text-sm text-green-600">{item.rating}</span>}
                </div>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => handleEdit(item)} className="flex-1">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(item.id)} className="flex-1">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p className="text-xl">No items found in this category</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;