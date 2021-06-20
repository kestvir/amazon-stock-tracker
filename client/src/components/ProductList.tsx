import React, { useState } from 'react';
import {
  useGetProductsQuery,
  useDeleteProductMutation,
  useUpdateProductMutation,
} from '../redux/api';

interface ProductListProps {}

export const ProductList: React.FC<ProductListProps> = ({}) => {
  const result = useGetProductsQuery();
  const [deleteProduct, { isLoading: isLoadingDelete }] =
    useDeleteProductMutation();
  const [updateProduct, { isLoading: isLoadingUpdate }] =
    useUpdateProductMutation();

  const [updateId, setUpdateId] = useState<string | null>(null);
  const [updateTitle, setUpdateTitle] = useState('');

  function setupUpdateState(id: string, currentTitle: string) {
    setUpdateId(id);
    setUpdateTitle(currentTitle);
  }

  function updateProductOnBlur(id: string, currentTitle: string) {
    console.log(updateTitle);
    if (currentTitle === updateTitle) return;
    if (!updateTitle.trim()) return;
    updateProduct({ id, title: updateTitle });
    setUpdateId(null);
    setUpdateTitle('');
  }

  return (
    <div className="products">
      {result.isLoading && <h1>'LOADING...'</h1>}
      {result.isError && JSON.stringify(result.error)}
      {result.isSuccess && (
        <ul>
          {result.data.map((product) => {
            const { id, imgURL, title, productURL, inStock } = product;
            return (
              <li key={id} className="product">
                <img src={imgURL} alt="product image" />\
                {updateId === id ? (
                  <input
                    type="text"
                    value={updateTitle}
                    onChange={(e) => setUpdateTitle(e.target.value)}
                    onBlur={() => updateProductOnBlur(id, title)}
                  />
                ) : (
                  <h2 className="product__title">
                    <a href={productURL} target="_blank">
                      {title}
                    </a>
                  </h2>
                )}
                <h3
                  className={`product__in-stock product__in-stock--${
                    inStock ? 'true' : 'false'
                  }`}
                >
                  {inStock ? 'In stock' : 'Not in stock'}
                </h3>
                {updateId !== id && (
                  <div className="product__options">
                    <button
                      className="product__option-update"
                      onClick={() => setupUpdateState(id, title)}
                    >
                      Update
                    </button>
                    <button
                      className="product__option-delete"
                      onClick={() => deleteProduct(id)}
                      disabled={isLoadingDelete ? true : false}
                    >
                      {isLoadingDelete ? 'Loading...' : 'Delete'}
                    </button>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
