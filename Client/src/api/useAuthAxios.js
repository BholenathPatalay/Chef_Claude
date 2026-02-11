import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { api } from "./axios";

export function useAuthAxios() {
  const { getAccessTokenSilently, isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    const interceptor = api.interceptors.request.use(
      async (config) => {
        if (isLoading || !isAuthenticated) {
          return config;
        }

        try {
          const token = await getAccessTokenSilently();
          config.headers.Authorization = `Bearer ${token}`;
        } catch (err) {
          console.error("Auth token error:", err);
        }

        return config;
      },
      (error) => Promise.reject(error),
    );

    return () => {
      api.interceptors.request.eject(interceptor);
    };
  }, [getAccessTokenSilently, isAuthenticated, isLoading]);

  return api;
}
