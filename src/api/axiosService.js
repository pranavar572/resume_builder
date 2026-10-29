
import axiosinstance from "/src/api/axiosInstance.js";

const axiosService = async (httpMethod, url, reqBody) => {
  try {
    const response = await axiosinstance({
      method: httpMethod,
      url,
      data: reqBody
    });

    return response;
  } catch (error) {
    throw error;
  }
};

export default axiosService;