import axios from "../axiosCustomize";

export const getAllCategories = async () => {
  try {
    const response = await axios.get("/categories");
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: "Failed to fetch categories" };
  }
};

export const getAllProducts = async () => {
  try {
    const response = await axios.get("/products");
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: "Failed to fetch products" };
  }
};

export const createProduct = async (productData: any) => {
    try {
      const response = await axios.post("/products/create", productData);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { message: "Failed to add product" };
    }
  };

export const deleteProduct = async (id) => {
    try {
      const response = await axios.delete(`/products/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Lỗi khi xóa sản phẩm" };
    }
  };