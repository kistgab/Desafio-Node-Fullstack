export interface DeleteEventRepository {
  delete(id: string): Promise<void>;
}
