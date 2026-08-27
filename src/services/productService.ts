import api from "./api";
import type { Product } from "../types/productType";

export const productService = {
  async getAll() {
    const response = await api.get<Product[]>("/products");
    return response.data;
  },

  async create(data: Product) {
    const response = await api.post<Product>("/products", data);
    return response.data;
  },

  async update(id: number, data: Product) {
    const response = await api.put<Product>(`/products/${id}`, data);
    return response.data;
  },

  async getOne(id: number) {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  async delete(id: number) {
    await api.delete(`/products/${id}`);
  },
};
