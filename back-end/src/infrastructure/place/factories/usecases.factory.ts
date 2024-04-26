import { PrismaClient } from '@prisma/client';
import { CreatePlaceUseCase } from '@usecases/place/create/create.place.usecase';
import { DeletePlaceUseCase } from '@usecases/place/delete/delete.place.usecase';
import { DetailPlaceUseCase } from '@usecases/place/detail/detail.place.usecase';
import { ListAllPlacesUseCase } from '@usecases/place/list-all/list-all.place.usecase';
import { UpdatePlaceUseCase } from '@usecases/place/update/update.place.usecase';
import { PrismaCountAllPlacesRepository } from 'src/infrastructure/place/repositories/prisma/count-all/prisma-count-all.place.repository';
import { PrismaCreatePlaceRepository } from 'src/infrastructure/place/repositories/prisma/create/prisma-create.place.repository';
import { PrismaDeletePlaceRepository } from 'src/infrastructure/place/repositories/prisma/delete/prisma-delete.place.repository';
import { PrismaPlaceExistsByNameRepository } from 'src/infrastructure/place/repositories/prisma/exists-by-name/prisma-exists-by-name.place.repository';
import { PrismaFindAllPlacesRepository } from 'src/infrastructure/place/repositories/prisma/find-all/prisma-find-all.place.repository';
import { PrismaFindPlaceByIdRepository } from 'src/infrastructure/place/repositories/prisma/find-by-id/prisma-find-by-id.place.repository';
import { PrismaUpdatePlaceRepository } from 'src/infrastructure/place/repositories/prisma/update/prisma-update.place.repository';

export abstract class PlaceUseCasesFactory {
  static async createPlace(): Promise<CreatePlaceUseCase> {
    const prismaClient = new PrismaClient();
    const placeExistsByNameRepository = new PrismaPlaceExistsByNameRepository(
      prismaClient,
    );
    const createPlaceRepository = new PrismaCreatePlaceRepository(prismaClient);
    return new CreatePlaceUseCase(
      placeExistsByNameRepository,
      createPlaceRepository,
    );
  }

  static async deletePlace(): Promise<DeletePlaceUseCase> {
    const prismaClient = new PrismaClient();
    const findPlaceByIdRepository = new PrismaFindPlaceByIdRepository(
      prismaClient,
    );
    const deletePlaceRepository = new PrismaDeletePlaceRepository(prismaClient);
    return new DeletePlaceUseCase(
      findPlaceByIdRepository,
      deletePlaceRepository,
    );
  }

  static async detailPlace(): Promise<DetailPlaceUseCase> {
    const prismaClient = new PrismaClient();
    const findPlaceByIdRepository = new PrismaFindPlaceByIdRepository(
      prismaClient,
    );
    return new DetailPlaceUseCase(findPlaceByIdRepository);
  }

  static async listAll(): Promise<ListAllPlacesUseCase> {
    const prismaClient = new PrismaClient();
    const findAllPlacesRepository = new PrismaFindAllPlacesRepository(
      prismaClient,
    );
    const countAllPlacesRepository = new PrismaCountAllPlacesRepository(
      prismaClient,
    );
    return new ListAllPlacesUseCase(
      findAllPlacesRepository,
      countAllPlacesRepository,
    );
  }

  static async updatePlace(): Promise<UpdatePlaceUseCase> {
    const prismaClient = new PrismaClient();
    const placeExistsByNameRepository = new PrismaPlaceExistsByNameRepository(
      prismaClient,
    );
    const findPlaceByIdRepository = new PrismaFindPlaceByIdRepository(
      prismaClient,
    );
    const updatePlaceRepository = new PrismaUpdatePlaceRepository(prismaClient);
    return new UpdatePlaceUseCase(
      findPlaceByIdRepository,
      placeExistsByNameRepository,
      updatePlaceRepository,
    );
  }
}
