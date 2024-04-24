import { PlaceExistsByNameRepository } from '@domain/place/repositories/exists-by-name.place.repository';

import { PrismaClient } from '@prisma/client';

export class PrismaPlaceExistsByNameRepository
  implements PlaceExistsByNameRepository
{
  constructor(private readonly prisma: PrismaClient) {}

  async existsByName(name: string): Promise<boolean> {
    return (await this.prisma.place.count({ where: { name } })) > 0;
  }
}
