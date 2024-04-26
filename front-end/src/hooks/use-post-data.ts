import { axiosInstance } from "libs/axios/axios.instance";
import { useState } from "react";

export function usePostData<I, O>(url: string) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<O | null>(null);
  const [error, setError] = useState<object | null>(null);

  const postData = async (requestBody: I) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post(url, requestBody);
      setData(response.data);
      setLoading(false);
    } catch (error) {
      setError((error as { response: { data: object } }).response.data);
      setLoading(false);
    }
  };

  return { loading, error, postData, data };
}
