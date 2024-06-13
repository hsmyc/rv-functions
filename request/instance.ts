import axios from "axios";

async function authenticateAndGetToken() {
  const response = {
    data: {
      id_token: "",
    },
  };
  return response.data.id_token;
}

const rentvisie = axios.create({
  baseURL: process.env.NEXT_PUBLIC_RV_API_BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

let cachedToken: string | null = null;

let retryCount: number = 0;

const maxRetries = 1;

rentvisie.interceptors.request.use(
  async (config) => {
    if (!cachedToken) {
      cachedToken = await authenticateAndGetToken();
    }
    config.headers.Authorization = `Bearer ${cachedToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

rentvisie.interceptors.response.use(
  (response) => {
    retryCount = 0;
    return response;
  },
  async (error) => {
    if (error.response?.status === 401 && retryCount < maxRetries) {
      retryCount++;
      cachedToken = await authenticateAndGetToken();
      error.config.headers.Authorization = `Bearer ${cachedToken}`;
      return rentvisie(error.config);
    }

    return Promise.reject(error);
  }
);

export default rentvisie;
