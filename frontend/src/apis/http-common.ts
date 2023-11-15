import baseAxios from "axios";
import { SERVER_URL, REFRESH_TOKEN_URL, PYTHON_SERVER_URL } from "./constants";
import { storageData, retrieveData } from "./JWT-common";
import { useWebSocketContext } from "../components/Common/WebSocketContext";

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
    return Promise.reject(error);
  }
);

axiosToken.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.data.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const response = await axiosToken.post(REFRESH_TOKEN_URL);
      const { accessToken } = response.data;
      // const { sendMessage } = useWebSocketContext();
      const sendMessage = (message: any) => console.log("더미 메시지 전송:", message);
      storageData(accessToken, sendMessage ?? (() => {}));
      originalRequest.headers.Authorization = `Bearer ${accessToken}`;
      return axiosToken(originalRequest);
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
    if (error.response && error.response.data.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const response = await axiosToken.post(REFRESH_TOKEN_URL);
        const { accessToken } = response.data;
        console.log("응답 인터셉터: 새 토큰", accessToken);
        
        // const { sendMessage } = useWebSocketContext();
        const sendMessage = (message: any) => console.log("더미 메시지 전송:", message);
        storageData(accessToken, sendMessage ?? (() => {}));
        
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
        
        // const { sendMessage } = useWebSocketContext();
        const sendMessage = (message: any) => console.log("더미 메시지 전송:", message);
        storageData(accessToken, sendMessage ?? (() => {}));
        
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