import AsyncStorage from '@react-native-async-storage/async-storage';

// 🔹 Lưu danh sách yêu thích vào AsyncStorage
export const saveFavorites = async (favorites) => {
  try {
    const jsonValue = JSON.stringify(favorites);
    await AsyncStorage.setItem('favorites', jsonValue);
  } catch (e) {
    console.error('Lỗi lưu danh sách yêu thích:', e);
  }
};

// 🔹 Lấy danh sách yêu thích từ AsyncStorage
export const getFavorites = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('favorites');
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error('Lỗi lấy danh sách yêu thích:', e);
    return [];
  }
};

// 🔹 Thêm sản phẩm vào danh sách yêu thích
export const addToFavorites = async (product) => {
  try {
    const favorites = await getFavorites();
    const exists = favorites.some((item) => item._id === product._id);

    if (!exists) {
      const newFavorites = [...favorites, product];
      await saveFavorites(newFavorites);
    }
  } catch (e) {
    console.error('Lỗi thêm vào danh sách yêu thích:', e);
  }
};

// 🔹 Xóa sản phẩm khỏi danh sách yêu thích
export const removeFromFavorites = async (productId) => {
  try {
    const favorites = await getFavorites();
    const newFavorites = favorites.filter((item) => item._id !== productId);
    await saveFavorites(newFavorites);
  } catch (e) {
    console.error('Lỗi xóa khỏi danh sách yêu thích:', e);
  }
};
