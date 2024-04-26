import { EventMapper } from '@domain/event/mapper/event.mapper';
import { FindEventByIdRepository } from '@domain/event/repositories/find-by-id.event.repository';
import { mockFindEventByIdRepository } from '@test/utils/delete-event-usecase.utils';
import { mockInputDetailEventDto } from '@test/utils/detail-event-usecase.utils';
import { mockEventEntity } from '@test/utils/event.utils';
import { DetailEventUseCase } from '@usecases/event/detail/detail.event.usecase';

type SutTypes = {
  sut: DetailEventUseCase;
  findEventByIdRepositoryStub: FindEventByIdRepository;
};

export function mockDetailEventUseCase(): SutTypes {
  const findEventByIdRepositoryStub = mockFindEventByIdRepository();
  const sut = new DetailEventUseCase(findEventByIdRepositoryStub);
  return { sut, findEventByIdRepositoryStub };
}

describe('Detail Event UseCase', () => {
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
    const { sut, findEventByIdRepositoryStub } = mockDetailEventUseCase();
    const findByIdSpy = jest.spyOn(findEventByIdRepositoryStub, 'findById');
    const input = mockInputDetailEventDto();

    await sut.execute(input);

    expect(findByIdSpy).toHaveBeenCalledWith(input.id);
  });

  it('should return an error when FindEventByIdRepository return null', async () => {
    const { sut, findEventByIdRepositoryStub } = mockDetailEventUseCase();
    jest
      .spyOn(findEventByIdRepositoryStub, 'findById')
      .mockResolvedValueOnce(Promise.resolve(null));

    const response = await sut.execute(mockInputDetailEventDto());

    expect(response).toEqual(
      new Error('There is no event with the specified id.'),
    );
  });

  it('should throw if FindEventByIdRepository throws', async () => {
    const { sut, findEventByIdRepositoryStub } = mockDetailEventUseCase();
    jest
      .spyOn(findEventByIdRepositoryStub, 'findById')
      .mockReturnValueOnce(Promise.reject(new Error('Repository error')));

    const response = sut.execute(mockInputDetailEventDto());

    await expect(response).rejects.toEqual(new Error('Repository error'));
  });

  it('should call EventMapper with correct values', async () => {
    const { sut, findEventByIdRepositoryStub } = mockDetailEventUseCase();
    const mapperSpy = jest.spyOn(EventMapper, 'toDetailedDto');
    const input = mockInputDetailEventDto();
    const foundEvent = await findEventByIdRepositoryStub.findById('any_id');

    await sut.execute(input);

    expect(mapperSpy).toHaveBeenCalledWith(foundEvent);
  });

  it('should throw if EventMapper throws', async () => {
    const { sut } = mockDetailEventUseCase();
    jest.spyOn(EventMapper, 'toDetailedDto').mockImplementationOnce(() => {
      throw new Error('Mapper error');
    });

    const response = sut.execute(mockInputDetailEventDto());

    await expect(response).rejects.toEqual(new Error('Mapper error'));
  });

  it('should return a detailed Event on success', async () => {
    const expectedResponse = EventMapper.toDetailedDto(mockEventEntity());
    const { sut } = mockDetailEventUseCase();

    const response = await sut.execute(mockInputDetailEventDto());
    expect(response).toEqual(expectedResponse);
  });
});
