import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const BASE_URL = "https://node-bookshelf-4loa.onrender.com";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const registerApi = async (data) => {
  return await axiosInstance.post(`${BASE_URL}/auth/register`, data);
};

export const loginApi = async (data) => {
  return await axiosInstance.post(`${BASE_URL}/auth/login`, data);
};

export const logoutApi = async () => {
  return await axiosInstance.get(`${BASE_URL}/auth/logout`);
};

export const getBooks = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token");
  }

  const response = await axiosInstance.get(`${BASE_URL}/books`);
  return response.data;
};

export const createBook = async (formData) => {
  return axiosInstance.post("/books", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteBook = async (data) => {
  return await axiosInstance.delete(`${BASE_URL}/books/${data}`);
};

export const getCurrentUserApi = async () => {
  return await axiosInstance.get(`${BASE_URL}/user`);
};

export const useGetBooks = () => {
  const token = localStorage.getItem("token");
  return useQuery({
    queryKey: ["books"],
    queryFn: () => getBooks(),
    enabled: !!token,
  });
};
