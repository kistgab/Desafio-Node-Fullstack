import {
  EventEntityProps,
  EventFactory,
} from '@domain/event/factory/event.factory';
import { CreateEventRepository } from '@domain/event/repositories/create.event.repository';
import { FindPlaceByIdRepository } from '@domain/place/repositories/find-by-id.place.repository';
import { IsPlaceAvailableAtRepository } from '@domain/place/repositories/is-place-available-at.place.repository';
import {
  mockCreateEventRepository,
  mockInputCreateEventDto,
  mockIsPlaceAvailableAtRepository,
} from '@test/utils/create-event-usecase.utils';
import { mockFindPlaceByIdRepository } from '@test/utils/delete-place-usecase.utils';
import { mockEventEntity } from '@test/utils/event.utils';
import { mockPlaceEntity } from '@test/utils/place.utils';
import { CreateEventUseCase } from '@usecases/event/create/create.event.usecase';
import { OutputCreateEventDto } from '@usecases/event/create/dto/create.event.dto';

type SutTypes = {
  sut: CreateEventUseCase;
  createEventRepositoryStub: CreateEventRepository;
  findPlaceByIdRepositoryStub: FindPlaceByIdRepository;
  isPlaceAvailableAtRepositoryStub: IsPlaceAvailableAtRepository;
};

export function mockCreateEventUseCase(): SutTypes {
  const findPlaceByIdRepositoryStub = mockFindPlaceByIdRepository();
  const createEventRepositoryStub = mockCreateEventRepository();
  const isPlaceAvailableAtRepositoryStub = mockIsPlaceAvailableAtRepository();
  const sut = new CreateEventUseCase(
    findPlaceByIdRepositoryStub,
    createEventRepositoryStub,
    isPlaceAvailableAtRepositoryStub,
  );
  return {
    sut,
    isPlaceAvailableAtRepositoryStub,
    createEventRepositoryStub,
    findPlaceByIdRepositoryStub,
  };
}

describe('Create Event UseCase', () => {
  it('should call FindPlaceByIdRepository with correct values', async () => {
    const { sut, findPlaceByIdRepositoryStub } = mockCreateEventUseCase();
    const findByIdSpy = jest.spyOn(findPlaceByIdRepositoryStub, 'findById');
    const input = mockInputCreateEventDto();

    await sut.execute(input);

    expect(findByIdSpy).toHaveBeenCalledWith(input.placeId);
  });

  it('should return an error when FindPlaceByIdRepository returns null', async () => {
    const { sut, findPlaceByIdRepositoryStub } = mockCreateEventUseCase();
    jest
      .spyOn(findPlaceByIdRepositoryStub, 'findById')
      .mockResolvedValueOnce(Promise.resolve(null));

    const response = await sut.execute(mockInputCreateEventDto());

    expect(response).toEqual(new Error('There is no place with specified id.'));
  });

  it('should throw if FindPlaceByIdRepository throws', async () => {
    const { sut, findPlaceByIdRepositoryStub } = mockCreateEventUseCase();
    jest
      .spyOn(findPlaceByIdRepositoryStub, 'findById')
      .mockReturnValueOnce(Promise.reject(new Error('Repository error')));

    const response = sut.execute(mockInputCreateEventDto());

    await expect(response).rejects.toEqual(new Error('Repository error'));
  });

  it('should call IsPlaceAvailableAtRepository with correct values', async () => {
    const { sut, isPlaceAvailableAtRepositoryStub } = mockCreateEventUseCase();
    const isAvailableAtSpy = jest.spyOn(
      isPlaceAvailableAtRepositoryStub,
      'isAvailableAt',
    );
    const input = mockInputCreateEventDto();

    await sut.execute(input);

    expect(isAvailableAtSpy).toHaveBeenCalledWith(
      input.placeId,
      input.duration.startsAt,
      input.duration.endsAt,
    );
  });

  it('should return an error when IsPlaceAvailableAtRepository returns false', async () => {
    const { sut, isPlaceAvailableAtRepositoryStub } = mockCreateEventUseCase();
    jest
      .spyOn(isPlaceAvailableAtRepositoryStub, 'isAvailableAt')
      .mockResolvedValueOnce(Promise.resolve(false));

    const response = await sut.execute(mockInputCreateEventDto());

    expect(response).toEqual(
      new Error('The place is not available at the specified date.'),
    );
  });

  it('should throw if IsPlaceAvailableAtRepository throws', async () => {
    const { sut, isPlaceAvailableAtRepositoryStub } = mockCreateEventUseCase();
    jest
      .spyOn(isPlaceAvailableAtRepositoryStub, 'isAvailableAt')
      .mockReturnValueOnce(Promise.reject(new Error('Repository error')));

    const response = sut.execute(mockInputCreateEventDto());

    await expect(response).rejects.toEqual(new Error('Repository error'));
  });

  it('should call EventFactory with correct values', async () => {
    const { sut } = mockCreateEventUseCase();
    const createSpy = jest.spyOn(EventFactory, 'create');
    const input = mockInputCreateEventDto();

    await sut.execute(input);

    expect(createSpy).toHaveBeenCalledWith({
      contact: input.contact,
      duration: input.duration,
      name: input.name,
      place: mockPlaceEntity(),
      type: input.type,
    } as EventEntityProps);
  });

  it('should throw if EventFactory throws', async () => {
    const { sut } = mockCreateEventUseCase();
    jest.spyOn(EventFactory, 'create').mockImplementationOnce(() => {
      throw new Error('Factory error');
    });

    const response = sut.execute(mockInputCreateEventDto());

    await expect(response).rejects.toEqual(new Error('Factory error'));
  });

  it('should call CreateEventRepository with correct values', async () => {
    const { sut, createEventRepositoryStub } = mockCreateEventUseCase();
    const createSpy = jest.spyOn(createEventRepositoryStub, 'create');
    const mockedEvent = mockEventEntity();
    jest.spyOn(EventFactory, 'create').mockReturnValueOnce(mockedEvent);
    const input = mockInputCreateEventDto();

    await sut.execute(input);

    expect(createSpy).toHaveBeenCalledWith(mockedEvent);
  });

  it('should throw if CreateEventRepository throws', async () => {
    const { sut, createEventRepositoryStub } = mockCreateEventUseCase();
    jest
      .spyOn(createEventRepositoryStub, 'create')
      .mockReturnValueOnce(Promise.reject(new Error('Repository error')));

    const response = sut.execute(mockInputCreateEventDto());

    await expect(response).rejects.toEqual(new Error('Repository error'));
  });

  it('should return the created event id', async () => {
    const { sut } = mockCreateEventUseCase();
    jest.spyOn(crypto, 'randomUUID').mockReturnValueOnce('any-u-u-i-d');
    const expectedResult: OutputCreateEventDto = {
      id: 'any-u-u-i-d',
    };

    const result = await sut.execute(mockInputCreateEventDto());

    expect(result).toEqual(expectedResult);
  });
});
