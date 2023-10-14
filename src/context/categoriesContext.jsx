import { createContext, useContext, useState } from "react";
import {
    createCategoryRequest,
    deleteCategoryRequest,
    getCategoriesRequest,
    getCategoryRequest,
    updateCategoryRequest,
} from "../api/categories";

const CategoryContext = createContext();

export const useCategories = () => {
    const context = useContext(CategoryContext);
    if (!context) throw new Error("useCategories must be used within a CategoryProvider");
    return context;
};

export function CategoryProvider({ children }) {
    const [categories, setCategories] = useState([]);
    const [refresh, setRefresh] = useState(false);

    const getCategories = async () => {
        const res = await getCategoriesRequest();
        setCategories(res.data);
    };

    const deleteCategory = async (id) => {
        try {
            const res = await deleteCategoryRequest(id);
            setRefresh(!refresh);

            if (res.status === 204) setCategories(categories.filter((category) => category._id !== id));
        } catch (error) {
            console.log(error);
        }
    };

    const createCategory = async (category) => {
        try {
            const res = await createCategoryRequest(category);
            console.log(res.data);
            setRefresh(!refresh);


        } catch (error) {
            console.log(error);
        }
    };

    const getCategory = async (id) => {
        try {
            const res = await getCategoryRequest(id);
            return res.data;
        } catch (error) {
            console.error(error);
        }
    };

    const updateCategory = async (id, category) => {
        try {
            await updateCategoryRequest(id, category);
            setRefresh(!refresh);

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <CategoryContext.Provider
            value={{
                categories,
                getCategories,
                deleteCategory,
                createCategory,
                getCategory,
                updateCategory,
                refresh

            }}
        >
            {children}
        </CategoryContext.Provider>
    );
}
