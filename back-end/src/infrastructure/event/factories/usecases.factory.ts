import { PrismaClient } from '@prisma/client';
import { CreateEventUseCase } from '@usecases/event/create/create.event.usecase';
import { DeleteEventUseCase } from '@usecases/event/delete/delete.event.usecase';
import { DetailEventUseCase } from '@usecases/event/detail/detail.event.usecase';
import { PrismaCreateEventRepository } from 'src/infrastructure/event/repositories/prisma/create/prisma-create.event.repository';
import { PrismaDeleteEventRepository } from 'src/infrastructure/event/repositories/prisma/delete/prisma-delete.event.repository';
import { PrismaFindEventByIdRepository } from 'src/infrastructure/event/repositories/prisma/find-by-id/prisma-find-by-id.event.repository';
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

  static async deleteEvent(): Promise<DeleteEventUseCase> {
    const prismaClient = new PrismaClient();
    const findEventByIdRepository = new PrismaFindEventByIdRepository(
      prismaClient,
    );
    const deleteEventRepository = new PrismaDeleteEventRepository(prismaClient);
    return new DeleteEventUseCase(
      findEventByIdRepository,
      deleteEventRepository,
    );
  }

  static async detailEvent(): Promise<DetailEventUseCase> {
    const prismaClient = new PrismaClient();
    const findEventByIdRepository = new PrismaFindEventByIdRepository(
      prismaClient,
    );
    return new DetailEventUseCase(findEventByIdRepository);
  }
}
