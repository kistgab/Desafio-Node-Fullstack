import { IsPlaceAvailableAtRepository } from '@domain/place/repositories/is-place-available-at.place.repository';

import { PrismaClient } from '@prisma/client';

export class PrismaIsPlaceAvailableAtRepository
  implements IsPlaceAvailableAtRepository
{
  constructor(private readonly prisma: PrismaClient) {}

  async isAvailableAt(
    placeId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<boolean> {
    const eventsInPeriodCount = await this.prisma.event.count({
      where: {
        place_id: placeId,
        OR: [
          // Starts in the middle, ends in the middle
          {
            startDate: { gte: startDate, lte: endDate },
            endDate: { lte: endDate },
          },
          // Starts in the middle, ends after
          {
            startDate: { gte: startDate, lte: endDate },
            endDate: { gte: endDate },
          },
          // Starts before, ends in the middle
          {
            startDate: { lte: startDate },
            endDate: { gte: startDate, lte: endDate },
          },
          // Starts before, ends after
          {
            startDate: { lte: startDate },
            endDate: { gte: endDate },
          },
        ],
      },
    });
    return eventsInPeriodCount === 0;
  }
}
