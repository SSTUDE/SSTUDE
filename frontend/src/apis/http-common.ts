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
      const { sendMessage } = useWebSocketContext();
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
      config.headers.access_token = `${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

pythonAxiosToken.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.data.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const response = await pythonAxiosToken.post(REFRESH_TOKEN_URL);
      const { accessToken } = response.data;
      const { sendMessage } = useWebSocketContext();
      storageData(accessToken, sendMessage ?? (() => {}));
      originalRequest.headers.access_token = `${accessToken}`;
      return pythonAxiosToken(originalRequest);
    }
    return Promise.reject(error);
  }
);

export const requestGet = async (
  url: string,
  params: Record<string, any> = {}
) => {
  const token = "Bearer " + (await retrieveData());
  try {
    const data = await axiosToken.get(url, {
      params: params,
      headers: {
        Authorization: token,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const requestPost = async (
  url: string,
  body: Record<string, any> = {},
  headers: Record<string, any> = {}
) => {
  const token = "Bearer " + (await retrieveData());
  try {
    const data = await axiosToken.post(url, body, {
      headers: { Authorization: token },
    });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const requestPut = async (
  url: string,
  body: Record<string, any> = {},
  headers: Record<string, any> = {}
) => {
  const token = "Bearer " + (await retrieveData());
  try {
    const data = await axiosToken.put(url, body, {
      headers: { Authorization: token },
    });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const requestDel = async (url: string) => {
  try {
    const data = await axiosToken.delete(url);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default axiosToken;
export { pythonAxiosToken };
