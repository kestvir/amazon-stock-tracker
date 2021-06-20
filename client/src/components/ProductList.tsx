import React, { useState } from 'react';
import {
  useGetProductsQuery,
  useDeleteProductMutation,
  useUpdateProductMutation,
} from '../redux/api';

const shortenTitleIfTooLong = (title: string) => {
  if (title.length <= 30) {
    return title;
  }
  return title.slice(0, 30) + '...';
};

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
      {result.isError && (
        <span className="error">JSON.stringify(result.error)</span>
      )}
      {result.isSuccess && (
        <ul>
          {result.data.map((product) => {
            const { id, imgURL, title, productURL, inStock } = product;
            return (
              <li key={id} className="product grid">
                <img src={imgURL} alt="product image" />
                {updateId === id ? (
                  <>
                    {isLoadingUpdate ? (
                      <span className="loading">Loading update...</span>
                    ) : (
                      <input
                        type="text"
                        value={updateTitle}
                        onChange={(e) => setUpdateTitle(e.target.value)}
                        onBlur={() => updateProductOnBlur(id, title)}
                      />
                    )}
                  </>
                ) : (
                  <h2 className="product__title">
                    <a href={productURL} target="_blank">
                      {shortenTitleIfTooLong(title)}
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
                      className="product__option-update-button"
                      onClick={() => setupUpdateState(id, title)}
                    >
                      Update
                    </button>
                    <button
                      className="product__option-delete-button"
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
