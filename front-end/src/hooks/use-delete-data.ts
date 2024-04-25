import { axiosInstance } from "libs/axios/axios.instance";
import { useState } from "react";

export function useDeleteData() {
  const [loading, setLoading] = useState(false);
  const [finished, setFinished] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteData = async (url: string) => {
    try {
      setLoading(true);
      await axiosInstance.delete(url);
      setLoading(false);
      setFinished(true);
    } catch (error) {
      setError("Error deleting the data");
      setLoading(false);
      setFinished(true);
    }
  };

  return { loading, error, deleteData, finished };
}
