import { PlaceEntity } from '@domain/place/entity/place.entity';
import { FindPlaceByIdRepository } from '@domain/place/repositories/find-by-id.place.repository';
import { PrismaClient } from '@prisma/client';
import { PlaceModelMapper } from 'src/infrastructure/place/models/prisma/place-model.mapper';

export class PrismaFindPlaceByIdRepository implements FindPlaceByIdRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findById(id: string): Promise<PlaceEntity | null> {
    const place = await this.prisma.place.findUnique({
      where: { id },
      include: {
        entries: true,
        place_address: true,
        ticket_gates: true,
      },
    });
    if (!place) return null;
    return PlaceModelMapper.toEntity(place);
  }
}
