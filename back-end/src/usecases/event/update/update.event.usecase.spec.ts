import {
  EventEntityProps,
  EventFactory,
} from '@domain/event/factory/event.factory';
import { FindEventByIdRepository } from '@domain/event/repositories/find-by-id.event.repository';
import { UpdateEventRepository } from '@domain/event/repositories/update.event.repository';
import { FindPlaceByIdRepository } from '@domain/place/repositories/find-by-id.place.repository copy';
import { mockFindEventByIdRepository } from '@test/utils/delete-event-usecase.utils';
import { mockFindPlaceByIdRepository } from '@test/utils/delete-place-usecase.utils';
import { mockEventEntity } from '@test/utils/event.utils';
import { mockPlaceEntity } from '@test/utils/place.utils';
import {
  mockInputUpdateEventDto,
  mockUpdateEventRepository,
} from '@test/utils/update-event-usecase.utils';

import { UpdateEventUseCase } from '@usecases/event/update/update.event.usecase';

type SutTypes = {
  sut: UpdateEventUseCase;
  updateEventRepositoryStub: UpdateEventRepository;
  findEventByIdRepositoryStub: FindEventByIdRepository;
  findPlaceByIdRepositoryStub: FindPlaceByIdRepository;
};

export function mockUpdateEventUseCase(): SutTypes {
  const updateEventRepositoryStub = mockUpdateEventRepository();
  const findEventByIdRepositoryStub = mockFindEventByIdRepository();
  const findPlaceByIdRepositoryStub = mockFindPlaceByIdRepository();
  const sut = new UpdateEventUseCase(
    findEventByIdRepositoryStub,
    findPlaceByIdRepositoryStub,
    updateEventRepositoryStub,
  );
  return {
    sut,
    updateEventRepositoryStub,
    findPlaceByIdRepositoryStub,
    findEventByIdRepositoryStub,
  };
}

describe('Update Event UseCase', () => {
  beforeAll(() => {
    const mockedDate = new Date(2023, 9, 1, 7);
    jest.spyOn(global, 'Date').mockImplementation(() => {
      return mockedDate;
    });
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should call FindEventByIdRepository with correct values', async () => {
    const { sut, findEventByIdRepositoryStub } = mockUpdateEventUseCase();
    const findByIdSpy = jest.spyOn(findEventByIdRepositoryStub, 'findById');
    const input = mockInputUpdateEventDto();

    await sut.execute(input);

    expect(findByIdSpy).toHaveBeenCalledWith(input.id);
  });

  it('should return an error when FindEventByIdRepository returns null', async () => {
    const { sut, findEventByIdRepositoryStub } = mockUpdateEventUseCase();
    jest
      .spyOn(findEventByIdRepositoryStub, 'findById')
      .mockResolvedValueOnce(null);

    const response = await sut.execute(mockInputUpdateEventDto());

    expect(response).toEqual(
      new Error('There is no event with the specified id.'),
    );
  });

  it('should throw if FindEventByIdRepository throws', async () => {
    const { sut, findEventByIdRepositoryStub } = mockUpdateEventUseCase();
    jest
      .spyOn(findEventByIdRepositoryStub, 'findById')
      .mockReturnValueOnce(Promise.reject(new Error('Repository error')));

    const response = sut.execute(mockInputUpdateEventDto());

    await expect(response).rejects.toEqual(new Error('Repository error'));
  });

  it('should call FindPlaceByIdRepository with correct values', async () => {
    const { sut, findPlaceByIdRepositoryStub } = mockUpdateEventUseCase();
    const findByIdSpy = jest.spyOn(findPlaceByIdRepositoryStub, 'findById');
    const input = mockInputUpdateEventDto();

    await sut.execute(input);

    expect(findByIdSpy).toHaveBeenCalledWith(input.id);
  });

  it('should return an error when FindPlaceByIdRepository returns null', async () => {
    const { sut, findPlaceByIdRepositoryStub } = mockUpdateEventUseCase();
    jest
      .spyOn(findPlaceByIdRepositoryStub, 'findById')
      .mockResolvedValueOnce(null);

    const response = await sut.execute(mockInputUpdateEventDto());

    expect(response).toEqual(
      new Error('There is no place with the specified id.'),
    );
  });

  it('should throw if FindPlaceByIdRepository throws', async () => {
    const { sut, findPlaceByIdRepositoryStub } = mockUpdateEventUseCase();
    jest
      .spyOn(findPlaceByIdRepositoryStub, 'findById')
      .mockReturnValueOnce(Promise.reject(new Error('Repository error')));

    const response = sut.execute(mockInputUpdateEventDto());

    await expect(response).rejects.toEqual(new Error('Repository error'));
  });

  it('should call EventFactory with correct values', async () => {
    const { sut } = mockUpdateEventUseCase();
    const factorySpy = jest.spyOn(EventFactory, 'create');
    const input = mockInputUpdateEventDto();
    const mockedEventEntity = mockEventEntity();

    await sut.execute(input);

    expect(factorySpy).toHaveBeenCalledWith({
      id: mockedEventEntity.id,
      contact: input.contact,
      duration: input.duration,
      name: input.name,
      place: mockPlaceEntity(),
      type: input.type,
      createdAt: mockedEventEntity.createdAt,
      updatedAt: new Date(),
    } as EventEntityProps);
  });

  it('should throw if EventFactory throws', async () => {
    const { sut } = mockUpdateEventUseCase();
    jest.spyOn(EventFactory, 'create').mockImplementationOnce(() => {
      throw new Error('Factory error');
    });

    const response = sut.execute(mockInputUpdateEventDto());

    await expect(response).rejects.toEqual(new Error('Factory error'));
  });

  it('should call UpdateEventRepository with correct values', async () => {
    const { sut, updateEventRepositoryStub } = mockUpdateEventUseCase();
    const updateSpy = jest.spyOn(updateEventRepositoryStub, 'update');
    const input = mockInputUpdateEventDto();
    const mockedEventEntity = mockEventEntity();

    await sut.execute(input);

    expect(updateSpy).toHaveBeenCalledWith(
      EventFactory.create({
        id: mockedEventEntity.id,
        contact: input.contact,
        duration: input.duration,
        name: input.name,
        place: mockPlaceEntity(),
        type: input.type,
        createdAt: mockedEventEntity.createdAt,
        updatedAt: new Date(),
      }),
    );
  });

  it('should throw if UpdateEventRepository throws', async () => {
    const { sut, updateEventRepositoryStub } = mockUpdateEventUseCase();
    jest
      .spyOn(updateEventRepositoryStub, 'update')
      .mockReturnValueOnce(Promise.reject(new Error('Repository error')));

    const response = sut.execute(mockInputUpdateEventDto());

    await expect(response).rejects.toEqual(new Error('Repository error'));
  });
});
