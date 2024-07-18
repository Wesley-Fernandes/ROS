import { create } from 'zustand';
import { ProductsStore } from '../models/product-model';

export const ProductStorage = create<ProductsStore>((set, get) => ({
  products: [],
  addProduct: (product) =>
    set((state) => ({ products: [...state.products, product] })),
  removeItem: (id) => {
    const products = get().products;
    const filtered = products.filter((i) => i.id !== id);
    set({ products: filtered });
  },
}));
