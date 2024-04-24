import { PlaceMapper } from '@domain/place/mapper/place.mapper';
import { FindPlaceByIdRepository } from '@domain/place/repositories/find-by-id.place.repository';
import { mockFindPlaceByIdRepository } from '@test/utils/delete-place-usecase.utils';
import { mockInputDetailPlaceDto } from '@test/utils/detail-place-usecase.utils';
import { mockPlaceEntity } from '@test/utils/place.utils';
import { DetailPlaceUseCase } from '@usecases/place/detail/detail.place.usecase';

type SutTypes = {
  sut: DetailPlaceUseCase;
  findPlaceByIdRepositoryStub: FindPlaceByIdRepository;
};

export function mockDetailPlaceUseCase(): SutTypes {
  const findPlaceByIdRepositoryStub = mockFindPlaceByIdRepository();
  const sut = new DetailPlaceUseCase(findPlaceByIdRepositoryStub);
  return { sut, findPlaceByIdRepositoryStub };
}

describe('Detail Place UseCase', () => {
  it('should call FindPlaceByIdRepository with correct values', async () => {
    const { sut, findPlaceByIdRepositoryStub } = mockDetailPlaceUseCase();
    const findByIdSpy = jest.spyOn(findPlaceByIdRepositoryStub, 'findById');
    const input = mockInputDetailPlaceDto();

    await sut.execute(input);

    expect(findByIdSpy).toHaveBeenCalledWith(input.id);
  });

  it('should return an error when FindPlaceByIdRepository return null', async () => {
    const { sut, findPlaceByIdRepositoryStub } = mockDetailPlaceUseCase();
    jest
      .spyOn(findPlaceByIdRepositoryStub, 'findById')
      .mockResolvedValueOnce(Promise.resolve(null));

    const response = await sut.execute(mockInputDetailPlaceDto());

    expect(response).toEqual(
      new Error('There is no place with the specified id.'),
    );
  });

  it('should throw if FindPlaceByIdRepository throws', async () => {
    const { sut, findPlaceByIdRepositoryStub } = mockDetailPlaceUseCase();
    jest
      .spyOn(findPlaceByIdRepositoryStub, 'findById')
      .mockReturnValueOnce(Promise.reject(new Error('Repository error')));

    const response = sut.execute(mockInputDetailPlaceDto());

    await expect(response).rejects.toEqual(new Error('Repository error'));
  });

  it('should call PlaceMapper with correct values', async () => {
    const { sut, findPlaceByIdRepositoryStub } = mockDetailPlaceUseCase();
    const mapperSpy = jest.spyOn(PlaceMapper, 'toDetailedDto');
    const input = mockInputDetailPlaceDto();
    const foundPlace = await findPlaceByIdRepositoryStub.findById('any_id');

    await sut.execute(input);

    expect(mapperSpy).toHaveBeenCalledWith(foundPlace);
  });

  it('should throw if PlaceMapper throws', async () => {
    const { sut } = mockDetailPlaceUseCase();
    jest.spyOn(PlaceMapper, 'toDetailedDto').mockImplementationOnce(() => {
      throw new Error('Mapper error');
    });

    const response = sut.execute(mockInputDetailPlaceDto());

    await expect(response).rejects.toEqual(new Error('Mapper error'));
  });

  it('should return a detailed Place on success', async () => {
    const expectedResponse = PlaceMapper.toDetailedDto(mockPlaceEntity());
    const { sut } = mockDetailPlaceUseCase();

    const response = await sut.execute(mockInputDetailPlaceDto());
    expect(response).toEqual(expectedResponse);
  });
});
