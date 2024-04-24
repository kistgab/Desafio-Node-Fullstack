import { PlaceEntity } from '@domain/place/entity/place.entity';
import { CreatePlaceRepository } from '@domain/place/repositories/create.place.repository';
import { PrismaClient } from '@prisma/client';

export class PrismaCreatePlaceRepository implements CreatePlaceRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(place: PlaceEntity): Promise<void> {
    await this.prisma.place.create({
      data: {
        id: place.id,
        contact_email: place.contact.mail,
        contact_phone: place.contact.phone,
        name: place.name,
        place_address: {
          create: {
            city: place.address.city,
            state: place.address.state,
            zip_code: place.address.zipCode,
            address: place.address.line,
            complement: place.address.complement,
          },
        },
        type: place.type,
        cpnj: place.cnpj,
        created_at: place.createdAt,
        nickname: place.nickname,
        entries: {
          createMany: {
            data: place.entries.map((entry) => ({
              name: entry,
            })),
          },
        },
        ticket_gates: {
          createMany: {
            data: place.ticketGates.map((ticketGate) => ({
              name: ticketGate,
            })),
          },
        },
      },
    });
  }
}
