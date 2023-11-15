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
    console.log("axiosToken 요청 인터셉터: 요청 시작", config.url);
    const accessToken = await retrieveData();
    console.log("axiosToken 요청 인터셉터: 토큰 취득", accessToken);
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    console.log("axiosToken 요청 인터셉터: 요청 완료", config);
    return config;
  },
  (error) => {
    console.error("axiosToken 요청 인터셉터 에러:", error);
    return Promise.reject(error);
  }
);

axiosToken.interceptors.response.use(
  (response) => {
    console.log("응답 인터셉터: 성공 응답", response);
    return response;
  },
  async (error) => {
    console.error("응답 인터셉터: 초기 에러", error);

    const originalRequest = error.config;
    if (error.response && error.response.data.status === 401 && !originalRequest._retry) {
      console.log("응답 인터셉터: 401 오류 감지, 토큰 갱신 시도");

      originalRequest._retry = true;
      try {
        const response = await axiosToken.post(REFRESH_TOKEN_URL);
        const { accessToken } = response.data;

        console.log("응답 인터셉터: 새 토큰 받음", accessToken);

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
      console.log("요청 인터셉터: 현재 토큰", accessToken);
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
    console.log("응답 인터셉터: 성공 응답", response);
    return response;
  },
  async (error) => {
    console.error("응답 인터셉터: 초기 에러", error);
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
        console.log("응답 인터셉터: 새 토큰", accessToken);

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
      console.log("요청 인터셉터: 현재 토큰", accessToken);
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
    console.log("응답 인터셉터: 성공 응답", response);
    return response;
  },
  async (error) => {
    console.error("응답 인터셉터: 초기 에러", error);
    const originalRequest = error.config;
    if (error.response && error.response.status === 400) {
      try {
        const response = await axiosToken.post(REFRESH_TOKEN_URL);
        const { accessToken } = response.data;
        console.log("응답 인터셉터: 새 토큰", accessToken);

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
