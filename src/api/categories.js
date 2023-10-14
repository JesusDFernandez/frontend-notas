import axios from "./axios";

export const getCategoriesRequest = async () => axios.get("/categories");

export const createCategoryRequest = async (category) => axios.post("/categories", category);

export const updateCategoryRequest = async (category) => axios.put(`/categories/${category._id}`, category);

export const deleteCategoryRequest = async (id) => axios.delete(`/categories/${id}`);

export const getCategoryRequest = async (id) => axios.get(`/categories/${id}`);
