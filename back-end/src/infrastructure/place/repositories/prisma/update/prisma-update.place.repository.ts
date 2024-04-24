import { PlaceEntity } from '@domain/place/entity/place.entity';
import { UpdatePlaceRepository } from '@domain/place/repositories/update.place.repository';
import { PrismaClient } from '@prisma/client';

export class PrismaUpdatePlaceRepository implements UpdatePlaceRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async update(place: PlaceEntity): Promise<void> {
    await this.prisma.place.update({
      data: {
        contact_email: place.contact.mail,
        contact_phone: place.contact.phone,
        name: place.name,
        place_address: {
          update: {
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
        updated_at: place.updatedAt,
      },
      where: { id: place.id },
    });
  }
}
