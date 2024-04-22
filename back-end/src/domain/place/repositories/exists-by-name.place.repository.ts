export interface PlaceExistsByNameRepository {
  existsByName(name: string): Promise<boolean>;
}
