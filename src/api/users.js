import axios from "./axios";

export const getUserRequest = async () => axios.get(`/users/`);

export const updateUserRequest = async (users) => axios.put(`/users/`, users);

export const deleteUserRequest = async () => axios.delete(`/users/`);