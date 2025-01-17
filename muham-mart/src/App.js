import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';
import Products from './pages/Products';
import Profile from './pages/Profile.js';
import ProductRequest from './pages/ProductRequest.js';
import AddProduct from './pages/AddProduct.js';
import theme from './theme.js';
import { ThemeProvider } from '@emotion/react';
import MyCart from './pages/MyCart';
import { useUser } from './contexts/UserContext.js';
import RegisterSuccess from './pages/RegisterSuccess.js';
import Users from './pages/Users.js';
import ProductDetailsWrapper from './components/ProductDetailsWrapper.js';

function App() {
  const { user } = useUser();
  return (
    <ThemeProvider theme={theme}>
    <Router>
      <Routes>
        <Route path="/" element={user ? <Navigate to="/products" /> : <Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products/>} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/product-request" element={<ProductRequest />} />
        <Route path="/products/:id" element={<ProductDetailsWrapper />} />
        <Route path="/my-cart" element={<MyCart />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/register/success" element={<RegisterSuccess />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </Router>
    </ThemeProvider>
  );
}

export default App;