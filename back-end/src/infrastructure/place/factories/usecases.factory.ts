import { PrismaClient } from '@prisma/client';
import { CreatePlaceUseCase } from '@usecases/place/create/create.place.usecase';
import { PrismaCreatePlaceRepository } from 'src/infrastructure/place/repositories/prisma/create/prisma-create.place.repository';
import { PrismaPlaceExistsByNameRepository } from 'src/infrastructure/place/repositories/prisma/exists-by-name/prisma-exists-by-name.place.repository';

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
}
