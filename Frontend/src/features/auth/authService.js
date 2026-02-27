// import axiosInstance from "../../services/axiosInstance";
import axiosInstance from "../../services/axiosInstance";

export const loginUser = async (loginData) => {
  const response = await axiosInstance.post("/auth/login", loginData);
  return response.data;
};
