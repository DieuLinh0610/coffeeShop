import axiosCustomize from '../utils/axiosCustomize'
import axios from 'axios'
export const loginAPIs = async (email: string, password: string ) => {
    return await axiosCustomize.post('/users/login', {email, password})
}

export const getCategoriesAPIs = async () => {
  return await axiosCustomize.get('/categories')
}

export const getProductsAPIs = async () => {
  return await axiosCustomize.get('/products')
}

export const addToCartAPI = async (userId, productId, quantity) => {
 
   return   await axiosCustomize.post(`/cart/add`, {
      userId,
      items: [{ productId, quantity }],
    });
     
};

export const getCartAPI = async (userId: string) => {
  return await axiosCustomize.get(`/cart/${userId}`);
};

export const removeFromCartAPI = async (userId: string, productId: string) => {
  return await axiosCustomize.post('/cart/remove', { userId, productId });
};

export const updateCartAPI = async (userId, productId, quantity) => {
  return await axiosCustomize.put(`/cart/update`, {
    userId,
    productId,
    quantity,
  });
};

export const getWishlistAPI = async (userId) => {
  return await axiosCustomize.get(`/favotite/${userId}`);
};


export const addToWishlistAPI = async (userId, productId) => {
  return await axiosCustomize.post('/favotite/add', { userId, productId });
};

export const removeFromWishlistAPI = async (userId, productId) => {
  return await axiosCustomize.post('/favotite/remove', { userId, productId });
};

export const updateUserAPI = async (userId, updatedData) => {
  return await axiosCustomize.put(`/users/update/${userId}`, updatedData);
};