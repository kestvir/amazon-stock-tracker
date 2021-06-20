import React from 'react';
import { ProductList } from './components/ProductList';
import { AddProductForm } from './components/AddProductForm';
import { Modal } from './components/Modal';

export default function App() {
  return (
    <div id="main-container">
      <AddProductForm />
      <ProductList />
      <Modal />
    </div>
  );
}
