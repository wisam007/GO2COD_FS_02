import { create } from "zustand";

export const useCart = create((set) => ({
  cart: [],
  setCart: (cart) => set({ cart }),
  addToCart: async (cartItem) => {
    const token = localStorage.getItem("User");
    if (!token) {
      console.log("No token");
      return { success: false, messsage: "No token found" };
    }
    try {
    } catch (error) {
      console.log(error);
    }
  },
}));
