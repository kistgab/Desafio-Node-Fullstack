import { IsPlaceAvailableAtRepository } from '@domain/place/repositories/is-place-available-at.place.repository';

import { Prisma, PrismaClient } from '@prisma/client';

export class PrismaIsPlaceAvailableAtRepository
  implements IsPlaceAvailableAtRepository
{
  constructor(private readonly prisma: PrismaClient) {}

  async isAvailableAt(
    placeId: string,
    startDate: Date,
    endDate: Date,
    eventIdsToIgnore?: string[],
  ): Promise<boolean> {
    const eventsInPeriodCount = await this.prisma.event.count({
      where: {
        place_id: placeId,
        id: {
          notIn: eventIdsToIgnore,
        },
        OR: this.getConditionToCheckEventsInPeriod(startDate, endDate),
      },
    });
    return eventsInPeriodCount === 0;
  }

  private getConditionToCheckEventsInPeriod(
    startDate: Date,
    endDate: Date,
  ): Prisma.EventWhereInput[] {
    const checkIfStartsInMiddleAndEndsInMiddle: Prisma.EventWhereInput = {
      startDate: { gte: startDate, lte: endDate },
      endDate: { lte: endDate },
    };
    const checkIfStartsInMiddleAndEndsAfter: Prisma.EventWhereInput = {
      startDate: { gte: startDate, lte: endDate },
      endDate: { gte: endDate },
    };
    const checkIfStartsBeforeAndEndsInMiddle: Prisma.EventWhereInput = {
      startDate: { lte: startDate },
      endDate: { gte: startDate, lte: endDate },
    };
    const checkIfStartsBeforeAndEndsAfter: Prisma.EventWhereInput = {
      startDate: { lte: startDate },
      endDate: { gte: endDate },
    };
    return [
      checkIfStartsInMiddleAndEndsInMiddle,
      checkIfStartsInMiddleAndEndsAfter,
      checkIfStartsBeforeAndEndsInMiddle,
      checkIfStartsBeforeAndEndsAfter,
    ];
  }
}
