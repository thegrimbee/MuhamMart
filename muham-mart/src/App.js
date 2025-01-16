import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';
import Products from './pages/Products';
import Profile from './pages/Profile.js';
import ProductRequest from './pages/ProductRequest.js';
import ProductDetails from './pages/ProductDetails';
import AddProduct from './pages/AddProduct.js';
import theme from './theme.js';
import { ThemeProvider } from '@emotion/react';
import { useUser } from './contexts/UserContext.js';

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
        <Route path="/products/:id" element={<ProductDetails/>} />
        <Route path="/add-product" element={<AddProduct />} />
      </Routes>
    </Router>
    </ThemeProvider>
  );
}

export default App;