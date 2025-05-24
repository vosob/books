import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const BASE_URL = "http://localhost:8080";
const token = localStorage.getItem("token");

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
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

export const logoutApi = async (data) => {
  return await axiosInstance.get(`${BASE_URL}/auth/logout`, data);
};

export const getBooks = async () => {
  if (!token) {
    throw new Error("No token");
  }

  const response = await axiosInstance.get(`${BASE_URL}/books`);
  return response.data;
};

// export const createBook = async (data) => {
//   return await axiosInstance.post(`${BASE_URL}/books`, data);
// };

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

export const useGetBooks = () => {
  return useQuery({
    queryKey: ["books"],
    queryFn: () => getBooks(),
    enabled: !!token,
  });
};
