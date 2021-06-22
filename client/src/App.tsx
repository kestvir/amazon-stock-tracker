import React from 'react';
import { ProductList } from './components/ProductList';
import { AddProductForm } from './components/AddProductForm';

export default function App() {
  return (
    <div id="main-container">
      <AddProductForm />
      <ProductList />
    </div>
  );
}
