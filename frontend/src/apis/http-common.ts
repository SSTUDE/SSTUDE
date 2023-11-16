import baseAxios from "axios";
import { storageData, retrieveData } from "./JWT-common";
import { SERVER_URL, REFRESH_TOKEN_URL, PYTHON_SERVER_URL } from "./constants";

const axiosToken = baseAxios.create({
  baseURL: SERVER_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosToken.interceptors.request.use(
  async (config) => {
    const accessToken = await retrieveData();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    console.error("axiosToken 요청 인터셉터 에러:", error);
    return Promise.reject(error);
  }
);

axiosToken.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.data.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const response = await axiosToken.post(REFRESH_TOKEN_URL);
        const { accessToken } = response.data;

        storageData(accessToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axiosToken(originalRequest);
      } catch (refreshError) {
        console.error("응답 인터셉터: 토큰 갱신 실패", refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

const pythonAxiosToken = baseAxios.create({
  baseURL: PYTHON_SERVER_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

pythonAxiosToken.interceptors.request.use(
  async (config) => {
    const accessToken = await retrieveData();
    if (accessToken) {
      config.headers.access_token = `${accessToken}`;
    }
    return config;
  },
  (error) => {
    console.error("요청 인터셉터 에러:", error);
    return Promise.reject(error);
  }
);

pythonAxiosToken.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.data.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const response = await axiosToken.post(REFRESH_TOKEN_URL);
        const { accessToken } = response.data;

        storageData(accessToken);

        originalRequest.headers.access_token = `${accessToken}`;
        return pythonAxiosToken(originalRequest);
      } catch (refreshError) {
        console.error("응답 인터셉터: 토큰 갱신 에러", refreshError);
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

const pythonFormAxiosToken = baseAxios.create({
  baseURL: PYTHON_SERVER_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

pythonFormAxiosToken.interceptors.request.use(
  async (config) => {
    const accessToken = await retrieveData();
    if (accessToken) {
      config.headers.access_token = `${accessToken}`;
    }
    return config;
  },
  (error) => {
    console.error("요청 인터셉터 에러:", error);
    return Promise.reject(error);
  }
);

pythonFormAxiosToken.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 400) {
      try {
        const response = await axiosToken.post(REFRESH_TOKEN_URL);
        const { accessToken } = response.data;

        storageData(accessToken);

        originalRequest.headers.access_token = `${accessToken}`;
        return pythonFormAxiosToken(originalRequest);
      } catch (refreshError) {
        console.error("응답 인터셉터: 토큰 갱신 에러", refreshError);
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosToken;
export { pythonAxiosToken, pythonFormAxiosToken };
