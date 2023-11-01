let refreshTokenInMemory: string | null = null;

export const storageData = async (
  accessToken: string,
  refreshToken: string
) => {
  try {
    localStorage.setItem("SSTUDE", JSON.stringify({ accessToken }));
    refreshTokenInMemory = refreshToken;
  } catch (err) {
    console.error("토큰 저장 실패, JWT-common");
  }
};

export const retrieveData = async () => {
  try {
    const response = localStorage.getItem("SSTUDE");
    const data = JSON.parse(response || "{}");
    return data.accessToken;
  } catch (err) {
    console.error("토큰 불러오기 실패, JWT-common");
  }
};

export const getRefreshToken = () => refreshTokenInMemory;
