import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './components/Dashboard';
import Store from './pages/Store';
import About from './pages/About';
import Products from './pages/Products';
import Profile from './pages/Profile.js';
import theme from './theme.js';
import { ThemeProvider } from '@emotion/react';

function App() {
  return (
    <ThemeProvider theme={theme}>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products/>} />
        <Route path="/store" element={<Store />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
    </ThemeProvider>
  );
}

export default App;