export interface DeletePlaceRepository {
  delete(id: string): Promise<void>;
}
