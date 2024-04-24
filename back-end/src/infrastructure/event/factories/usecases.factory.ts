import { PrismaClient } from '@prisma/client';
import { CreateEventUseCase } from '@usecases/event/create/create.event.usecase';
import { DeleteEventUseCase } from '@usecases/event/delete/delete.event.usecase';
import { DetailEventUseCase } from '@usecases/event/detail/detail.event.usecase';
import { ListAllEventsUseCase } from '@usecases/event/list-all/list-all.event.usecase';
import { PrismaCountAllEventsRepository } from 'src/infrastructure/event/repositories/prisma/count-all/prisma-count-all.event.repository';
import { PrismaCreateEventRepository } from 'src/infrastructure/event/repositories/prisma/create/prisma-create.event.repository';
import { PrismaDeleteEventRepository } from 'src/infrastructure/event/repositories/prisma/delete/prisma-delete.event.repository';
import { PrismaFindAllEventsRepository } from 'src/infrastructure/event/repositories/prisma/find-all/prisma-find-all.event.repository';
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

  static async listAll(): Promise<ListAllEventsUseCase> {
    const prismaClient = new PrismaClient();
    const findAllEventsRepository = new PrismaFindAllEventsRepository(
      prismaClient,
    );
    const countAllEventsRepository = new PrismaCountAllEventsRepository(
      prismaClient,
    );
    return new ListAllEventsUseCase(
      findAllEventsRepository,
      countAllEventsRepository,
    );
  }
}
