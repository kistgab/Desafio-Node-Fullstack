import { DeletePlaceRepository } from '@domain/place/repositories/delete.place.repository';
import { PrismaClient } from '@prisma/client';

export class PrismaDeletePlaceRepository implements DeletePlaceRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async delete(id: string): Promise<void> {
    await this.prisma.place.delete({ where: { id } });
  }
}
