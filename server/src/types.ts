export type Product = {
  id: string;
  productURL: string;
  imgURL: string;
  title: string;
  inStock: boolean;
};

export type Data = {
  products: Product[];
};
