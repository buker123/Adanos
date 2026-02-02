import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Checkbox } from '../components/ui/checkbox';
import { toast } from '../hooks/use-toast';
import { Plus, LogOut, Save, X, Trash2 } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const AdminDashboard = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('beef-burgers');
  const [selectedItem, setSelectedItem] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    mealPrice: '',
    image: '',
    category: 'beef-burgers',
    popular: false,
    spicy: false,
    available: true,
    hasMealOption: true
  });

  const categories = [
    { id: 'beef-burgers', name: 'Beef Burgers' },
    { id: 'chicken-burgers', name: 'Chicken Burgers' },
    { id: 'box-meals', name: 'Box Meals' },
    { id: 'light-meals', name: 'Light Meals' },
    { id: 'loaded-chips', name: 'Loaded Chips' },
    { id: 'adanos-grilled', name: 'Adanos Grilled' },
    { id: 'sides', name: 'Sides' },
    { id: 'kids-meals', name: 'Kids Meals' },
    { id: 'milkshakes', name: 'Milkshakes' },
    { id: 'smoothies', name: 'Smoothies' },
    { id: 'ice-cream', name: 'Ice Cream' },
    { id: 'waffles', name: 'Waffles' },
    { id: 'desserts', name: 'Desserts' }
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

  const handleSelectItem = (item) => {
    setSelectedItem(item);
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price?.toString() || '',
      mealPrice: item.mealPrice?.toString() || '',
      image: item.image,
      category: item.category,
      popular: item.popular || false,
      spicy: item.spicy || false,
      available: item.available !== false,
      hasMealOption: item.hasMealOption !== false
    });
    setIsEditing(false);
    setIsAddingNew(false);
  };

  const handleStartEdit = () => {
    setIsEditing(true);
  };

  const handleStartAddNew = () => {
    setIsAddingNew(true);
    setSelectedItem(null);
    setFormData({
      name: '',
      description: '',
      price: '',
      mealPrice: '',
      image: '',
      category: selectedCategory,
      popular: false,
      spicy: false,
      available: true,
      hasMealOption: true
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setIsAddingNew(false);
    if (selectedItem) {
      handleSelectItem(selectedItem);
    }
  };

  const handleSave = async () => {
    const token = localStorage.getItem('admin_token');
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    const dataToSave = {
      ...formData,
      price: parseFloat(formData.price),
      mealPrice: formData.mealPrice ? parseFloat(formData.mealPrice) : null
    };

    try {
      if (isAddingNew) {
        await axios.post(`${BACKEND_URL}/api/menu/items`, dataToSave, config);
        toast({ title: "Item created successfully!" });
      } else {
        await axios.put(`${BACKEND_URL}/api/menu/items/${selectedItem.id}`, dataToSave, config);
        toast({ title: "Item updated successfully!" });
      }
      setIsEditing(false);
      setIsAddingNew(false);
      fetchMenuItems();
    } catch (error) {
      toast({ title: "Error", description: error.response?.data?.detail || error.message, variant: "destructive" });
    }
  };

  const handleDelete = async () => {
    if (!selectedItem) return;
    
    if (window.confirm(`Are you sure you want to delete "${selectedItem.name}"?`)) {
      const token = localStorage.getItem('admin_token');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      try {
        await axios.delete(`${BACKEND_URL}/api/menu/items/${selectedItem.id}`, config);
        toast({ title: "Item deleted successfully!" });
        setSelectedItem(null);
        fetchMenuItems();
      } catch (error) {
        toast({ title: "Error", description: error.response?.data?.detail || error.message, variant: "destructive" });
      }
    }
  };

  const filteredItems = menuItems.filter(item => item.category === selectedCategory);

  const getCategoryCount = (catId) => {
    return menuItems.filter(item => item.category === catId).length;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-red-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-black">ADANOS BURGER</h1>
            <p className="text-red-200 text-sm">Admin Panel - Menu Editor</p>
          </div>
          <Button onClick={handleLogout} variant="outline" className="bg-white text-red-600 hover:bg-red-50">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="bg-white border-b shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto py-3 gap-2 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setSelectedItem(null);
                  setIsEditing(false);
                  setIsAddingNew(false);
                }}
                className={`px-4 py-2 rounded-full whitespace-nowrap font-semibold text-sm transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat.name} ({getCategoryCount(cat.id)})
              </button>
            ))}
          </div>
          {/* Progress bar */}
          <div className="h-1 bg-gray-200 rounded-full mb-2">
            <div 
              className="h-1 bg-red-500 rounded-full transition-all duration-300"
              style={{ width: `${((categories.findIndex(c => c.id === selectedCategory) + 1) / categories.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Sidebar - Item List */}
          <div className="w-80 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 border-b flex justify-between items-center">
                <h2 className="font-bold text-gray-800">
                  {categories.find(c => c.id === selectedCategory)?.name}
                </h2>
                <Button 
                  size="sm" 
                  onClick={handleStartAddNew}
                  className="bg-red-600 hover:bg-red-700"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="max-h-[calc(100vh-280px)] overflow-y-auto">
                {filteredItems.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    <p>No items in this category</p>
                    <Button 
                      size="sm" 
                      onClick={handleStartAddNew}
                      className="mt-4 bg-red-600 hover:bg-red-700"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add First Item
                    </Button>
                  </div>
                ) : (
                  filteredItems.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleSelectItem(item)}
                      className={`p-3 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
                        selectedItem?.id === item.id ? 'bg-red-50 border-l-4 border-l-red-600' : ''
                      }`}
                    >
                      <div className="flex gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 truncate">{item.name}</h3>
                          <p className="text-xs text-gray-500 line-clamp-2">{item.description}</p>
                          <p className="text-red-600 font-bold mt-1">
                            £{item.price?.toFixed(2)}
                            {item.mealPrice && <span className="text-gray-400 font-normal"> / £{item.mealPrice?.toFixed(2)} meal</span>}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Main Panel - Item Details/Editor */}
          <div className="flex-1">
            {isAddingNew ? (
              /* Add New Item Form */
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Add New Item</h2>
                    <div className="flex gap-2">
                      <Button onClick={handleCancel} variant="outline">
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </Button>
                      <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                        <Save className="h-4 w-4 mr-2" />
                        Save Item
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="col-span-2">
                      <Label className="text-base font-semibold">Item Name</Label>
                      <Input
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="mt-1 text-lg"
                        placeholder="Enter item name"
                      />
                    </div>

                    <div className="col-span-2">
                      <Label className="text-base font-semibold">Description</Label>
                      <Textarea
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        className="mt-1 min-h-[100px]"
                        placeholder="Enter item description"
                      />
                    </div>

                    <div>
                      <Label className="text-base font-semibold">Single Price (£)</Label>
                      <Input
                        type="number"
                        step="0.01"
                        value={formData.price}
                        onChange={(e) => setFormData({...formData, price: e.target.value})}
                        className="mt-1 text-lg"
                        placeholder="0.00"
                      />
                    </div>

                    <div>
                      <Label className="text-base font-semibold">Meal Price (£)</Label>
                      <Input
                        type="number"
                        step="0.01"
                        value={formData.mealPrice}
                        onChange={(e) => setFormData({...formData, mealPrice: e.target.value})}
                        className="mt-1 text-lg"
                        placeholder="0.00"
                      />
                    </div>

                    <div className="col-span-2">
                      <Label className="text-base font-semibold">Image URL</Label>
                      <Input
                        value={formData.image}
                        onChange={(e) => setFormData({...formData, image: e.target.value})}
                        className="mt-1"
                        placeholder="https://..."
                      />
                    </div>

                    <div>
                      <Label className="text-base font-semibold">Category</Label>
                      <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map(cat => (
                            <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex flex-col gap-3 pt-6">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          checked={formData.hasMealOption} 
                          onCheckedChange={(checked) => setFormData({...formData, hasMealOption: checked})} 
                        />
                        <Label>Has Meal Option</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          checked={formData.popular} 
                          onCheckedChange={(checked) => setFormData({...formData, popular: checked})} 
                        />
                        <Label>Popular Item</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          checked={formData.available} 
                          onCheckedChange={(checked) => setFormData({...formData, available: checked})} 
                        />
                        <Label>Available</Label>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : selectedItem ? (
              /* View/Edit Selected Item */
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <span className="inline-block px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm font-semibold mb-2">
                        {categories.find(c => c.id === selectedItem.category)?.name}
                      </span>
                      {!isEditing ? (
                        <h2 className="text-3xl font-bold text-gray-900">{selectedItem.name}</h2>
                      ) : (
                        <Input
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="text-2xl font-bold"
                        />
                      )}
                    </div>
                    <div className="flex gap-2">
                      {!isEditing ? (
                        <>
                          <Button onClick={handleStartEdit} className="bg-blue-600 hover:bg-blue-700">
                            Edit Item
                          </Button>
                          <Button onClick={handleDelete} variant="destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button onClick={handleCancel} variant="outline">
                            <X className="h-4 w-4 mr-2" />
                            Cancel
                          </Button>
                          <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                            <Save className="h-4 w-4 mr-2" />
                            Save Changes
                          </Button>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    {/* Image */}
                    <div className="col-span-2 md:col-span-1">
                      <div className="aspect-square rounded-xl overflow-hidden bg-gray-100">
                        <img
                          src={isEditing ? formData.image : selectedItem.image}
                          alt={selectedItem.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {isEditing && (
                        <div className="mt-3">
                          <Label className="text-sm font-semibold">Image URL</Label>
                          <Input
                            value={formData.image}
                            onChange={(e) => setFormData({...formData, image: e.target.value})}
                            className="mt-1"
                            placeholder="https://..."
                          />
                        </div>
                      )}
                    </div>

                    {/* Details */}
                    <div className="col-span-2 md:col-span-1 space-y-4">
                      <div>
                        <Label className="text-sm font-semibold text-gray-500">Description</Label>
                        {!isEditing ? (
                          <p className="text-gray-700 mt-1">{selectedItem.description}</p>
                        ) : (
                          <Textarea
                            value={formData.description}
                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                            className="mt-1 min-h-[120px]"
                          />
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-semibold text-gray-500">Single Price</Label>
                          {!isEditing ? (
                            <p className="text-2xl font-black text-red-600 mt-1">£{selectedItem.price?.toFixed(2)}</p>
                          ) : (
                            <Input
                              type="number"
                              step="0.01"
                              value={formData.price}
                              onChange={(e) => setFormData({...formData, price: e.target.value})}
                              className="mt-1 text-lg"
                            />
                          )}
                        </div>
                        <div>
                          <Label className="text-sm font-semibold text-gray-500">Meal Price</Label>
                          {!isEditing ? (
                            <p className="text-2xl font-black text-red-600 mt-1">
                              {selectedItem.mealPrice ? `£${selectedItem.mealPrice?.toFixed(2)}` : '-'}
                            </p>
                          ) : (
                            <Input
                              type="number"
                              step="0.01"
                              value={formData.mealPrice}
                              onChange={(e) => setFormData({...formData, mealPrice: e.target.value})}
                              className="mt-1 text-lg"
                              placeholder="0.00"
                            />
                          )}
                        </div>
                      </div>

                      {isEditing && (
                        <div className="space-y-3 pt-4 border-t">
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              checked={formData.hasMealOption} 
                              onCheckedChange={(checked) => setFormData({...formData, hasMealOption: checked})} 
                            />
                            <Label>Has Meal Option</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              checked={formData.popular} 
                              onCheckedChange={(checked) => setFormData({...formData, popular: checked})} 
                            />
                            <Label>Popular Item</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              checked={formData.available} 
                              onCheckedChange={(checked) => setFormData({...formData, available: checked})} 
                            />
                            <Label>Available</Label>
                          </div>
                        </div>
                      )}

                      {!isEditing && (
                        <div className="flex gap-2 pt-4 border-t">
                          {selectedItem.popular && (
                            <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-semibold">
                              Popular
                            </span>
                          )}
                          {selectedItem.available ? (
                            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                              Available
                            </span>
                          ) : (
                            <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold">
                              Unavailable
                            </span>
                          )}
                          {selectedItem.hasMealOption && (
                            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                              Meal Option
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              /* No Item Selected */
              <Card className="shadow-lg">
                <CardContent className="p-12 text-center">
                  <div className="text-gray-400 mb-4">
                    <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">Select an item to edit</h3>
                  <p className="text-gray-500 mb-6">Choose an item from the sidebar or add a new one</p>
                  <Button onClick={handleStartAddNew} className="bg-red-600 hover:bg-red-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Item
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
