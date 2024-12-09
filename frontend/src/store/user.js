import { create } from "zustand";
import axios from "axios";

export const useUserStore = create((set) => ({
  user: false,
  loading: false,
  setUser: (user) => set({ user }),

  logInUser: async (formData) => {
    try {
      set({ loading: true });
      const { data } = await axios.post("/api/users/login", formData);
      const token = data.token;
      localStorage.setItem("User", token);
      set({ user: data });
      set({ loading: false });
      return { success: true, message: "Logged in successfully" };
    } catch (error) {
      set({ loading: false });
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

  rehydrateUser: async () => {
    const token = localStorage.getItem("User");
    if (token) {
      try {
        set({ user: token }); // Set the user state with the retrieved data
      } catch {
        // If the token is invalid, clear it and reset state
        localStorage.removeItem("User");
        set({ user: false });
      }
    }
  },
}));
