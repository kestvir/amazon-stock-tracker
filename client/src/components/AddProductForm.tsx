import React, { useState } from 'react';
import { useAddProductMutation } from '../redux/api';

interface AddProductFormProps {}

export const AddProductForm: React.FC<AddProductFormProps> = ({}) => {
  const [productURL, setProductURL] = useState('');

  const [addProduct, { isLoading }] = useAddProductMutation();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!productURL) return;
    addProduct({ productURL });
    setProductURL('');
  }

  return (
    <form className="add-product-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="add-product-form__input"
        value={productURL}
        onChange={(e) => setProductURL(e.target.value)}
      />
      <button
        type="submit"
        className="add-product-form__submit-button"
        disabled={isLoading ? true : false}
      >
        {isLoading ? 'Loading...' : 'Add'}
      </button>
    </form>
  );
};
