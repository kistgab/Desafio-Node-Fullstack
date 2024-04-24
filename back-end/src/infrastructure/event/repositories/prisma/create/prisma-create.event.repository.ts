import { EventEntity } from '@domain/event/entity/event.entity';
import { CreateEventRepository } from '@domain/event/repositories/create.event.repository';
import { PrismaClient } from '@prisma/client';

export class PrismaCreateEventRepository implements CreateEventRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(event: EventEntity): Promise<void> {
    await this.prisma.event.create({
      data: {
        contact_email: event.contact.email,
        contact_phone: event.contact.phone,
        startDate: event.duration.startsAt,
        endDate: event.duration.endsAt,
        name: event.name,
        place_id: event.place.id,
        type: event.type,
        id: event.id,
      },
    });
  }
}
