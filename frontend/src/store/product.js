import { create } from "zustand";
import axios from "axios";

export const useProductStore = create((set) => ({
  products: [],

  setProducts: (products) => set({ products }),

  createProduct: async (newProduct) => {
    const token = localStorage.getItem("User");
    if (!token) {
      return { success: false, message: "Not Authorized" };
    }

    if (!newProduct.name || !newProduct.image || !newProduct.price) {
      return { success: false, message: "Please fill in all fields" };
    }

    try {
      const { data } = await axios.post("/api/products/add", newProduct, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
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

  deleteProduct: async (productId) => {
    const token = localStorage.getItem("User");
    if (!token) {
      return { success: false, message: "Not Authorized" };
    }

    try {
      await axios.delete(`/api/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      set((state) => ({
        products: state.products.filter((product) => product._id !== productId),
      }));

      return { success: true, message: "Product deleted successfully" };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Error deleting product",
      };
    }
  },

  editProduct: async (productId, updatedProduct) => {
    const token = localStorage.getItem("User");
    if (!token) {
      return { success: false, message: "Not Authorized" };
    }

    try {
      const { data } = await axios.put(
        `/api/products/${productId}`,
        updatedProduct,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      set((state) => ({
        products: state.products.map((product) =>
          product._id === productId ? { ...product, ...data.data } : product
        ),
      }));

      return { success: true, message: "Product updated successfully" };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Error updating product",
      };
    }
  },

  fetchProducts: async () => {
    try {
      const { data } = await axios.get("/api/products");
      set({ products: data.data });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  },
}));
