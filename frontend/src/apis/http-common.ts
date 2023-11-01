import baseAxios from "axios";
import { SERVER_URL, REFRESH_TOKEN_URL } from "./constants";
import { storageData, retrieveData, getRefreshToken } from "./JWT-common";

const axios = baseAxios.create({
  baseURL: SERVER_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axios.interceptors.request.use(
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

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = getRefreshToken();
      if (refreshToken) {
        try {
          const response = await axios.post(REFRESH_TOKEN_URL, {
            refreshToken,
          });
          const { accessToken } = response.data;
          storageData(accessToken, refreshToken);
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return axios(originalRequest);
        } catch (refreshError) {
          return Promise.reject(refreshError);
        }
      }
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
    const data = await axios.get(url, {
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
    const data = await axios.post(url, body, {
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
    const data = await axios.put(url, body, {
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
    const data = await axios.delete(url);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default axios;
