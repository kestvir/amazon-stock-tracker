import React, { useState, useCallback } from 'react';
import {
  useGetProductsQuery,
  useDeleteProductMutation,
  useUpdateProductMutation,
} from '../redux/api';
import { Modal } from './Modal';

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
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [updateTitle, setUpdateTitle] = useState('');

  const [openModal, setOpenModal] = useState(false);

  const setupMutationState = (
    id: string,
    mutationType: string,
    currentTitle?: string
  ) => {
    if (mutationType === 'update' && currentTitle) {
      setUpdateId(id);
      setUpdateTitle(currentTitle);
      return;
    }
    setDeleteId(id);
    setOpenModal(true);
  };

  const updateProductOnBlur = useCallback(
    (id: string, currentTitle: string) => {
      if (currentTitle === updateTitle) return;
      if (!updateTitle.trim()) return;
      updateProduct({ _id: id, title: updateTitle });
      setUpdateId(null);
      setUpdateTitle('');
    },
    [updateTitle]
  );

  const deleteProductOnClick = useCallback(() => {
    if (deleteId) {
      deleteProduct(deleteId);
      setDeleteId(null);
      setOpenModal(false);
    }
  }, [deleteId]);

  return (
    <>
      <div className="products">
        {result.isLoading && <h1>LOADING...</h1>}
        {result.isError && (
          <span className="error">{JSON.stringify(result.error)}</span>
        )}
        {result.isSuccess && (
          <ul>
            {result.data.map((product) => {
              const { _id, imgURL, title, productURL, inStock } = product;
              return (
                <li key={_id} className="product grid">
                  <img src={imgURL} alt="product image" />
                  {updateId === _id ? (
                    <>
                      {isLoadingUpdate ? (
                        <span className="loading">Loading update...</span>
                      ) : (
                        <input
                          type="text"
                          value={updateTitle}
                          onChange={(e) => setUpdateTitle(e.target.value)}
                          onBlur={() => updateProductOnBlur(_id, title)}
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
                  {updateId !== _id && (
                    <div className="product__options">
                      <button
                        className="product__option-update-button"
                        onClick={() => setupMutationState(_id, 'update', title)}
                      >
                        Update
                      </button>
                      <button
                        className="product__option-delete-button"
                        onClick={() => setupMutationState(_id, 'delete')}
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
      {openModal && (
        <Modal
          isLoading={isLoadingDelete}
          setOpenModal={setOpenModal}
          confirmAction={deleteProductOnClick}
          actionName={'delete'}
          actionDescription={'this product will be deleted permentatley'}
        />
      )}
    </>
  );
};
