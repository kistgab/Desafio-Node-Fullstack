import { useDeleteData } from "@hooks/use-delete-data";

export function useDeleteEvent() {
  const { error, loading, deleteData, finished } = useDeleteData();

  function deleteEvent(id: string) {
    return deleteData(`/events/${id}`);
  }

  return { error, loading, finished, deleteEvent };
}
