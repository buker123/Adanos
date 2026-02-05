import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { Toaster } from "./components/ui/toaster";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import SignIn from "./pages/SignIn";
import Menu from "./pages/Menu";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";

// Layout for public pages with Header and Footer
const PublicLayout = () => (
  <>
    <Header />
    <main className="flex-1">
      <Outlet />
    </main>
    <Footer />
  </>
);

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <div className="App min-h-screen flex flex-col">
          <Routes>
            {/* Admin routes without header/footer */}
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            
            {/* Public routes with header/footer */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order-success" element={<OrderSuccess />} />
              <Route path="/signin" element={<SignIn />} />
            </Route>
          </Routes>
          <Toaster />
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
