import { EventEntity } from '@domain/event/entity/event.entity';
import { UpdateEventRepository } from '@domain/event/repositories/update.event.repository';
import { PrismaClient } from '@prisma/client';

export class PrismaUpdateEventRepository implements UpdateEventRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async update(event: EventEntity): Promise<void> {
    await this.prisma.event.update({
      data: {
        contact_email: event.contact.email,
        contact_phone: event.contact.phone,
        endDate: event.duration.startsAt,
        startDate: event.duration.endsAt,
        name: event.name,
        type: event.type,
        place: {
          connect: {
            id: event.place.id,
          },
        },
        updated_at: event.updatedAt,
      },
      where: { id: event.id },
    });
  }
}
