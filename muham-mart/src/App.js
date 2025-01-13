import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './components/Dashboard';
import About from './pages/About';
import Products from './pages/Products';
import Header from './components/Header.js';
import theme from './theme.js'
import { ThemeProvider } from '@mui/material/styles';
function App() {
  return (
    <>
    <ThemeProvider theme={theme}>
    <Header></Header>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products/>} />
        </Routes>
      </Router>
      </ThemeProvider>
    </>
    
  );
}

export default App;