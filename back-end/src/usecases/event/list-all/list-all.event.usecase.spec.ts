import { ResponsePagination } from '@domain/@shared/utils/pagination.dto';
import { EventMapper } from '@domain/event/mapper/event.mapper';
import { CountAllEventsRepository } from '@domain/event/repositories/count-all.event.repository';
import { FindAllEventsRepository } from '@domain/event/repositories/find-all.event.repository';
import {
  mockCountAllEventsRepository,
  mockFindAllEventsRepository,
  mockInputListAllEventsDto,
} from '@test/utils/list-all-event-usecase.utils';
import { OutputListEventDto } from '@usecases/event/list-all/dto/list-all.event.dto';
import { ListAllEventsUseCase } from '@usecases/event/list-all/list-all.event.usecase';

type SutTypes = {
  sut: ListAllEventsUseCase;
  findAllEventsRepositoryStub: FindAllEventsRepository;
  countAllEventsRepositoryStub: CountAllEventsRepository;
};

export function mockListAllEventUseCase(): SutTypes {
  const findAllEventsRepositoryStub = mockFindAllEventsRepository();
  const countAllEventsRepositoryStub = mockCountAllEventsRepository();
  const sut = new ListAllEventsUseCase(
    findAllEventsRepositoryStub,
    countAllEventsRepositoryStub,
  );
  return { sut, findAllEventsRepositoryStub, countAllEventsRepositoryStub };
}

describe('ListAllEvents UseCase', () => {
  it('should call FindAllEventsRepository with correct values', async () => {
    const { sut, findAllEventsRepositoryStub } = mockListAllEventUseCase();
    const findAllSpy = jest.spyOn(findAllEventsRepositoryStub, 'findAll');
    const input = mockInputListAllEventsDto();

    await sut.execute(input);

    expect(findAllSpy).toHaveBeenCalledWith(input);
  });

  it('should throw if FindAllEventsRepository throws', async () => {
    const { sut, findAllEventsRepositoryStub } = mockListAllEventUseCase();
    jest
      .spyOn(findAllEventsRepositoryStub, 'findAll')
      .mockReturnValueOnce(Promise.reject(new Error('Repository error')));

    const response = sut.execute(mockInputListAllEventsDto());

    await expect(response).rejects.toEqual(new Error('Repository error'));
  });

  it('should call EventMapper with correct values', async () => {
    const { sut, findAllEventsRepositoryStub } = mockListAllEventUseCase();
    const mapperSpy = jest.spyOn(EventMapper, 'toSimpleDto');
    const input = mockInputListAllEventsDto();
    const items = await findAllEventsRepositoryStub.findAll(input);

    await sut.execute(input);

    expect(mapperSpy).toHaveBeenCalledTimes(items.length);
  });

  it('should throw if EventMapper throws', async () => {
    const { sut } = mockListAllEventUseCase();
    jest.spyOn(EventMapper, 'toSimpleDto').mockImplementationOnce(() => {
      throw new Error('Mapper error');
    });

    const response = sut.execute(mockInputListAllEventsDto());

    await expect(response).rejects.toEqual(new Error('Mapper error'));
  });

  it('should return a list of all Events on success', async () => {
    const input = mockInputListAllEventsDto();
    const { sut, findAllEventsRepositoryStub, countAllEventsRepositoryStub } =
      mockListAllEventUseCase();
    const expectedData = (await findAllEventsRepositoryStub.findAll(input)).map(
      EventMapper.toSimpleDto,
    );
    const expectedResult: ResponsePagination<OutputListEventDto> = {
      data: expectedData,
      itemCount: await countAllEventsRepositoryStub.countAll(input.filters),
      hasNextPage: false,
      hasPreviousPage: false,
      page: input.page,
      pageCount: 1,
      take: input.take,
    };

    const response = await sut.execute(input);

    expect(response).toEqual(expectedResult);
  });
});
