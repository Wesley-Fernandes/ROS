import z from 'zod';

export interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  value: number;
}

export interface ProductsStore {
  products: Product[];
  addProduct: (item: Product) => void;
  removeItem: (id: number) => void;
}
export const ProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  image: z.string().url(),
  value: z.number(),
});
