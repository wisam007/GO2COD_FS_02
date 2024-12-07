import { create } from "zustand";
import axios from "axios";

export const useUserStore = create((set) => ({
  user: false, // Initialize user as false
  setUser: (user) => set({ user }),

  logInUser: async (formData) => {
    try {
      const { data } = await axios.post("/api/users/login", formData);
      const token = data.token;
      localStorage.setItem("User", token);
      set({ user: data }); // Set user data upon successful login
      return { success: true, message: "Logged in successfully" };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Error logging in",
      };
    }
  },

  logOutUser: async () => {
    if (!localStorage.getItem("User")) {
      return { success: false, message: "User not found" };
    }
    localStorage.removeItem("User");
    set({ user: false }); // Set user to false upon logout
    return { success: true, message: "Logged out successfully" };
  },
}));
