export interface IsPlaceAvailableAtRepository {
  isAvailableAt(
    placeId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<boolean>;
}
