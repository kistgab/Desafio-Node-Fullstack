import { PlaceFilters } from '@domain/place/filters/filters.place';
import { CountAllPlacesRepository } from '@domain/place/repositories/count-all.place.repository';
import { Prisma, PrismaClient } from '@prisma/client';

export class PrismaCountAllPlacesRepository
  implements CountAllPlacesRepository
{
  constructor(private readonly prisma: PrismaClient) {}

  async countAll(filters?: PlaceFilters | undefined): Promise<number> {
    return await this.prisma.place.count({
      where: this.getQueryWhere(filters),
    });
  }

  private getQueryWhere(
    filters?: PlaceFilters,
  ): Prisma.PlaceWhereInput | undefined {
    if (!filters) return undefined;
    return {
      OR: [
        {
          name: {
            contains: filters.name,
          },
        },
        {
          nickname: {
            contains: filters.nickname,
          },
        },
      ],
    };
  }
}
