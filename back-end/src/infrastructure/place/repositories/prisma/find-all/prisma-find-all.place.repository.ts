import { RequestPagination } from '@domain/@shared/utils/pagination.dto';
import { PlaceEntity } from '@domain/place/entity/place.entity';
import { PlaceFilters } from '@domain/place/filters/filters.place';
import { FindAllPlacesRepository } from '@domain/place/repositories/find-all.place.repository';
import { Prisma, PrismaClient } from '@prisma/client';
import { PlaceModelMapper } from 'src/infrastructure/place/models/prisma/place-model.mapper';

export class PrismaFindAllPlacesRepository implements FindAllPlacesRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findAll(
    options: RequestPagination<PlaceFilters>,
  ): Promise<PlaceEntity[]> {
    const quantityInLastPages = (options.page - 1) * options.take;
    const foundPlaces = await this.prisma.place.findMany({
      skip: quantityInLastPages,
      take: options.take,
      where: this.getQueryWhere(options.filters),
      include: {
        entries: true,
        place_address: true,
        ticket_gates: true,
      },
    });
    return foundPlaces.map(PlaceModelMapper.toEntity);
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
