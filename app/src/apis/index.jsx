import instance from "../utils/axiosCustomize";


export const fetchCategories = async () => {
  const response = await instance.get('categories');
  return response.data;
};

export const fetchProducts = async () => {
  const response = await instance.get('products');
  return response.data;
};

export const login = async (data) => {
  const response = await instance.post('users/login', data);
  return response.data;
};
