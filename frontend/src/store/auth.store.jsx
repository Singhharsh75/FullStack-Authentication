import { create } from "zustand";
import axios from "axios";

const backend_url = "http://localhost:5004";
axios.defaults.withCredentials = true;
export const useStore = create((set) => ({
  user: null,
  isAuthorized: false,
  isLoading: false,
  error: null,
  isCheckingAuth: true,
  signup: async ({ email, password, name }) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${backend_url}/api/auth/signup`, {
        email,
        password,
        name,
      });
      set({ isLoading: false, isAuthorized: true, user: response.data.user });
      console.log("data", response.data);
    } catch (error) {
      set({ isLoading: false, error: error.message });
      console.log(error.message);
      throw error;
    }
  },

  verify: async (code) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(
        `${backend_url}/api/auth/verify-email`,
        {
          code,
        }
      );
      console.log(response.data);
      set({ isLoading: false, error: null });
    } catch (error) {
      set({ error: error.message, isLoading: false });
      console.log(error.message);
      throw error;
    }
  },

  login: async ({ email, password }) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${backend_url}/api/auth/login`, {
        email,
        password,
      });
      set({
        user: response.data.user,
        isAuthorized: true,
        isLoading: false,
        error: null,
      });
      console.log("data", response.data);
    } catch (error) {
      set({ error: error.message, isLoading: false });
      console.log(error.message);
      throw error;
    }
  },

  passReq: async ({ email }) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(
        `${backend_url}/api/auth/reset-pass-req`,
        {
          email,
        }
      );
      console.log("data", response.data);
      set({ isLoading: false, error: null });
    } catch (error) {
      set({ error: error.message, isLoading: false });
      console.log(error.message);
      throw error;
    }
  },
  passReset: async (password, token) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(
        `${backend_url}/api/auth/reset-pass/${token}`,
        {
          password,
        }
      );
      console.log("data", response.data);
      set({ isLoading: false, error: null });
    } catch (error) {
      set({ isLoading: false, error: error.message });
      console.log(error.message);
      throw error;
    }
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true, error: null });
    try {
      const response = await axios.get(`${backend_url}/api/auth/check-auth`);
      console.log("data", response.data);
      set({
        user: response.data.user,
        isCheckingAuth: false,
        isAuthorized: true,
      });
    } catch (error) {
      set({ error: null, isCheckingAuth: false, isAuthorized: false });
    }
  },
  logout: async () => {
    set({ user: null, isAuthorized: false, isLoading: false, error: null });
    try {
      const response = await axios.post(`${backend_url}/api/auth/logout`, {});
      console.log(response);
    } catch (error) {
      console.log(error.message);
    }
  },
}));
