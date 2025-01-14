import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './components/Dashboard';
import About from './pages/About';
import Products from './pages/Products';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import theme from './theme.js'
import { ThemeProvider } from '@mui/material/styles';
import ProductDetails from './pages/ProductDetails';
function App() {
  return (
    <>
    <ThemeProvider theme={theme}>
    <Header/>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products/>} />
          <Route path="/products/:id" element={<ProductDetails/>} />
        </Routes>
      </Router>
      <Footer/>
      </ThemeProvider>
    </>
    
  );
}

export default App;