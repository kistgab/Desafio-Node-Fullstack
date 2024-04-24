import { PrismaClient } from '@prisma/client';
import { CreateEventUseCase } from '@usecases/event/create/create.event.usecase';
import { PrismaCreateEventRepository } from 'src/infrastructure/event/repositories/prisma/create/prisma-create.event.repository';
import { PrismaFindPlaceByIdRepository } from 'src/infrastructure/place/repositories/prisma/find-by-id/prisma-find-by-id.place.repository';
import { PrismaIsPlaceAvailableAtRepository } from 'src/infrastructure/place/repositories/prisma/is-place-available-at/prisma-is-place-available-at.place.repository';

export abstract class EventUseCasesFactory {
  static async createEvent(): Promise<CreateEventUseCase> {
    const prismaClient = new PrismaClient();
    const findPlaceByIdRepository = new PrismaFindPlaceByIdRepository(
      prismaClient,
    );
    const createEventRepository = new PrismaCreateEventRepository(prismaClient);
    const isPlaceAvailableAtRepository = new PrismaIsPlaceAvailableAtRepository(
      prismaClient,
    );
    return new CreateEventUseCase(
      findPlaceByIdRepository,
      createEventRepository,
      isPlaceAvailableAtRepository,
    );
  }
}
