import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";


export function createAxiosClient({
      options,
      getCurrentAccessToken,
      logout
    }: {
      options: AxiosRequestConfig;
      getCurrentAccessToken: () => string | null;
      logout: (params: any) => void;
    }) {
      const client = axios.create(options);

      client.interceptors.request.use(
        (config) => {
          if (config.headers.authorization !== false) {
            const token = getCurrentAccessToken();
            if (token) {
              config.headers.Authorization = "Bearer " + token;
            }
          }
          return config;
        },
        (error) => {
          return Promise.reject(error);
        }
      );

      return client;
  
  }

// export default function AxiosInterceptor(onUnauthenticated: )