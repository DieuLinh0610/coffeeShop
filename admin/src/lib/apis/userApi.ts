import axios from "../axiosCustomize";

const getAllUsers = async () => {
    try {
        const response = await axios.get("/users");
        return response.data;
    } catch (error) {
        console.error("Lỗi khi lấy danh sách user:", error);
        return [];
    }
};
const addUser = async (userData: {
    userName: string;
    email: string;
    password: string;
    phoneNumber: string;
    location: string;
    gender: string;
    role: string;
  }) => {
    try {
      const response = await axios.post("/users/create", userData);
      return response.data;
    } catch (error) {
      console.error("Lỗi khi thêm user:", error);
      throw error;
    }
  };
const deleteUser = async (userId: string) => {
    try {
      const response = await axios.delete(`/users/${userId}`);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { message: "Failed to delete user" };
    }
  };

const loginAdmin = async (email, password) => {
    try {
      const response = await axios.post("/login/admin", { email, password });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Lỗi đăng nhập" };
    }
  };
export { getAllUsers , addUser, deleteUser, loginAdmin};
