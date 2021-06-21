import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export type Product = {
  _id: string;
  __v: number;
  productURL: string;
  imgURL: string;
  title: string;
  inStock: boolean;
};

type ProductsResponse = Product[];

const BASE_API_URL = 'http://localhost:9000/';

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: BASE_API_URL }),
  tagTypes: ['Product'],
  endpoints: (build) => ({
    getProducts: build.query<ProductsResponse, void>({
      query: () => 'products',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({
                type: 'Product' as const,
                id: _id,
              })),
              { type: 'Product', id: 'LIST' },
            ]
          : [{ type: 'Product', id: 'LIST' }],
    }),
    addProduct: build.mutation<{}, Partial<Product>>({
      query: (body) => ({
        url: `products`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Product', id: 'LIST' }],
    }),
    updateProduct: build.mutation<{}, Pick<Product, '_id'> & Partial<Product>>({
      query: ({ _id, ...patch }) => ({
        url: `products/${_id}`,
        method: 'PUT',
        body: patch,
      }),
      invalidatesTags: (result, error, { _id }) => [
        { type: 'Product', id: _id },
      ],
    }),
    deleteProduct: build.mutation<{}, string>({
      query(id) {
        return {
          url: `products/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: (result, error, _id) => [{ type: 'Product', id: _id }],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = api;
