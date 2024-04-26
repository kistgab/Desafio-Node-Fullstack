export interface IsPlaceAvailableAtRepository {
  isAvailableAt(
    placeId: string,
    startDate: Date,
    endDate: Date,
    eventIdsToIgnore?: string[],
  ): Promise<boolean>;
}
