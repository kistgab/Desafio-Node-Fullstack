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
        AND: [
          {
            startDate: { lte: startDate },
            endDate: { gte: endDate },
          },
          { startDate: { gte: startDate }, endDate: { lte: endDate } },
        ],
      },
    });
    return eventsInPeriodCount > 0;
  }
}
