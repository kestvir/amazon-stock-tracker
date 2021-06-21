export type Product = {
  productURL: string;
  imgURL: string;
  title: string;
  inStock: boolean;
};

export type Data = {
  products: Product[];
};
