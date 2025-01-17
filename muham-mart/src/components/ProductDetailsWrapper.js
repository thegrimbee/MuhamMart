import React from 'react';
import { useParams } from 'react-router-dom';
import ProductDetails from '../pages/ProductDetails';
import Header from '../components/Header';
import Footer from '../components/Footer';
const ProductDetailsWrapper = () => {
  const { id } = useParams();
  return(
  <>
  <Header />
  <ProductDetails id={id} />
    <Footer />
  </>); 
  
};

export default ProductDetailsWrapper;