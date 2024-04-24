import { RequestPagination } from '@domain/@shared/utils/pagination.dto';
import { EventEntity } from '@domain/event/entity/event.entity';
import { EventFilters } from '@domain/event/filters/filters.event';
import { FindAllEventsRepository } from '@domain/event/repositories/find-all.event.repository';
import { PrismaClient } from '@prisma/client';
import { EventModelMapper } from 'src/infrastructure/event/models/prisma/event-model.mapper';

export class PrismaFindAllEventsRepository implements FindAllEventsRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findAll(
    options: RequestPagination<EventFilters>,
  ): Promise<EventEntity[]> {
    const quantityInLastPages = (options.page - 1) * options.take;
    const foundEvents = await this.prisma.event.findMany({
      skip: quantityInLastPages,
      take: options.take,
      where: {
        name: {
          contains: options.filters?.name,
        },
      },
      include: {
        place: {
          include: {
            place_address: true,
            entries: true,
            ticket_gates: true,
          },
        },
      },
    });
    return foundEvents.map(EventModelMapper.toEntity);
  }
}
