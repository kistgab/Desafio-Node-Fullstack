import { useDeleteData } from "@hooks/use-delete-data";

export function useDeletePlace() {
  const { error, loading, deleteData, finished } = useDeleteData();

  function deletePlace(id: string) {
    return deleteData(`/places/${id}`);
  }

  return { error, loading, finished, deletePlace };
}
