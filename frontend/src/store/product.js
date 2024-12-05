import { create } from "zustand";
import axios from "axios";

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.image || !newProduct.price) {
      return { success: false, message: "Please fill in all fields:" };
    }
    try {
      const { data } = await axios.post("/api/products/add", newProduct, {
        headers: { "Content-Type": "application/json" },
      });
      set((state) => ({ products: [...state.products, data.data] }));
      return { success: true, message: "Product created successfully" };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Error creating product",
      };
    }
  },

  fetchProducts: async () => {
    try {
      const { data } = await axios.get("api/products");
      set({ products: data.data });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  },
}));
