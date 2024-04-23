import { EventFilters } from '@domain/event/filters/filters.event';
import { CountAllEventsRepository } from '@domain/event/repositories/count-all.event.repository';
import { PrismaClient } from '@prisma/client';

export class PrismaCountAllEventsRepository
  implements CountAllEventsRepository
{
  constructor(private readonly prisma: PrismaClient) {}

  async countAll(filters?: EventFilters | undefined): Promise<number> {
    return await this.prisma.event.count({
      where: {
        ...filters,
      },
    });
  }
}
