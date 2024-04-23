import { ResponsePagination } from '@domain/@shared/utils/pagination.dto';
import { PlaceMapper } from '@domain/place/mapper/place.mapper';
import { CountAllPlacesRepository } from '@domain/place/repositories/count-all.place.repository';
import { FindAllPlacesRepository } from '@domain/place/repositories/find-all.place.repository';
import {
  mockCountAllPlacesRepository,
  mockFindAllPlacesRepository,
  mockInputListAllPlacesDto,
} from '@test/utils/list-all-place-usecase.utils';
import { OutputListPlaceDto } from '@usecases/place/list-all/dto/list-all.place.dto';
import { ListAllPlacesUseCase } from '@usecases/place/list-all/list-all.place.usecase';

type SutTypes = {
  sut: ListAllPlacesUseCase;
  findAllPlacesRepositoryStub: FindAllPlacesRepository;
  countAllPlacesRepositoryStub: CountAllPlacesRepository;
};

export function mockListAllPlaceUseCase(): SutTypes {
  const findAllPlacesRepositoryStub = mockFindAllPlacesRepository();
  const countAllPlacesRepositoryStub = mockCountAllPlacesRepository();
  const sut = new ListAllPlacesUseCase(
    findAllPlacesRepositoryStub,
    countAllPlacesRepositoryStub,
  );
  return { sut, findAllPlacesRepositoryStub, countAllPlacesRepositoryStub };
}

describe('ListAll Place UseCase', () => {
  it('should call FindAllPlacesRepository with correct values', async () => {
    const { sut, findAllPlacesRepositoryStub } = mockListAllPlaceUseCase();
    const findAllSpy = jest.spyOn(findAllPlacesRepositoryStub, 'findAll');
    const input = mockInputListAllPlacesDto();

    await sut.execute(input);

    expect(findAllSpy).toHaveBeenCalledWith(input);
  });

  it('should throw if FindAllPlacesRepository throws', async () => {
    const { sut, findAllPlacesRepositoryStub } = mockListAllPlaceUseCase();
    jest
      .spyOn(findAllPlacesRepositoryStub, 'findAll')
      .mockReturnValueOnce(Promise.reject(new Error('Repository error')));

    const response = sut.execute(mockInputListAllPlacesDto());

    await expect(response).rejects.toEqual(new Error('Repository error'));
  });

  it('should call PlaceMapper with correct values', async () => {
    const { sut, findAllPlacesRepositoryStub } = mockListAllPlaceUseCase();
    const mapperSpy = jest.spyOn(PlaceMapper, 'toSimpleDto');
    const input = mockInputListAllPlacesDto();
    const items = await findAllPlacesRepositoryStub.findAll(input);

    await sut.execute(input);

    expect(mapperSpy).toHaveBeenCalledTimes(items.length);
  });

  it('should throw if PlaceMapper throws', async () => {
    const { sut } = mockListAllPlaceUseCase();
    jest.spyOn(PlaceMapper, 'toSimpleDto').mockImplementationOnce(() => {
      throw new Error('Mapper error');
    });

    const response = sut.execute(mockInputListAllPlacesDto());

    await expect(response).rejects.toEqual(new Error('Mapper error'));
  });

  it('should return a list of all Places on success', async () => {
    const input = mockInputListAllPlacesDto();
    const { sut, findAllPlacesRepositoryStub, countAllPlacesRepositoryStub } =
      mockListAllPlaceUseCase();
    const expectedData = (await findAllPlacesRepositoryStub.findAll(input)).map(
      PlaceMapper.toSimpleDto,
    );
    const expectedResult: ResponsePagination<OutputListPlaceDto> = {
      data: expectedData,
      itemCount: await countAllPlacesRepositoryStub.countAll(input.filters),
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
