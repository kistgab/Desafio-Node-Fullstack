import { AxiosRequestConfig, AxiosResponse } from "axios";
import { axiosInstance } from "libs/axios/axios.instance";
import { useEffect, useState } from "react";

export function useFetchData<T>(
  url: string,
  params?: AxiosRequestConfig,
  trigger?: boolean
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response: AxiosResponse<T> = await axiosInstance.get(url, params);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError("Error getting the data");
        setLoading(false);
      }
    };

    fetchData();
  }, [params, url, trigger]);

  return { data, loading, error };
}
