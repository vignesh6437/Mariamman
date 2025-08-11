import axiosInstance from "../BaseService/BaseURL";

export const PageLoad = async () => {
  try {
    const response = await axiosInstance.get(
      `/api/Donates/GetDonate`
    );
    return {
      ok: true,
      result: response.data,
    };
  } catch (error) {
    return {
      ok: false,
      result: error.response?.data || { message: "Server error" },
    };
  }
};