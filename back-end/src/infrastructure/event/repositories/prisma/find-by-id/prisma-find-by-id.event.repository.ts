import { EventEntity } from '@domain/event/entity/event.entity';
import { FindEventByIdRepository } from '@domain/event/repositories/find-by-id.event.repository';
import { PrismaClient } from '@prisma/client';
import { EventModelMapper } from 'src/infrastructure/event/models/prisma/event-model.mapper';

export class PrismaFindEventByIdRepository implements FindEventByIdRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findById(id: string): Promise<EventEntity | null> {
    const event = await this.prisma.event.findUnique({
      where: { id },
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
    if (!event) return null;
    return EventModelMapper.toEntity(event);
  }
}
