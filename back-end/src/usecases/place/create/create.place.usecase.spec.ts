import { PlaceFactory } from '@domain/place/factory/place.factory';
import { CreatePlaceRepository } from '@domain/place/repositories/create.place.repository';
import { PlaceExistsByNameRepository } from '@domain/place/repositories/exists-by-name.place.repository';
import {
  mockCreatePlaceRepository,
  mockInputCreatePlaceDto,
  mockPlaceExistsByNameRepository,
} from '@test/utils/create-place-usecase.utils';
import { mockPlaceEntity } from '@test/utils/place.utils';
import { CreatePlaceUseCase } from '@usecases/place/create/create.place.usecase';
import { OutputCreatePlaceDto } from '@usecases/place/create/dto/create.place.dto';

type SutTypes = {
  sut: CreatePlaceUseCase;
  placeExistsByNameRepositoryStub: PlaceExistsByNameRepository;
  createPlaceRepositoryStub: CreatePlaceRepository;
};

export function mockCreatePlaceUseCase(): SutTypes {
  const placeExistsByNameRepositoryStub = mockPlaceExistsByNameRepository();
  const createPlaceRepositoryStub = mockCreatePlaceRepository();
  const sut = new CreatePlaceUseCase(
    placeExistsByNameRepositoryStub,
    createPlaceRepositoryStub,
  );
  return { sut, placeExistsByNameRepositoryStub, createPlaceRepositoryStub };
}

describe('Create Place UseCase', () => {
  it('should call PlaceExistsByNameRepository with correct values', async () => {
    const { sut, placeExistsByNameRepositoryStub } = mockCreatePlaceUseCase();
    const existsByNameSpy = jest.spyOn(
      placeExistsByNameRepositoryStub,
      'existsByName',
    );
    const input = mockInputCreatePlaceDto();

    await sut.execute(input);

    expect(existsByNameSpy).toHaveBeenCalledWith(input.name);
  });

  it('should return an error when the name is not unique', async () => {
    const { sut, placeExistsByNameRepositoryStub } = mockCreatePlaceUseCase();
    jest
      .spyOn(placeExistsByNameRepositoryStub, 'existsByName')
      .mockResolvedValueOnce(true);

    const response = await sut.execute(mockInputCreatePlaceDto());

    expect(response).toEqual(
      new Error('There is already a place with this name.'),
    );
  });

  it('should throw if PlaceExistsByNameRepository throws', async () => {
    const { sut, placeExistsByNameRepositoryStub } = mockCreatePlaceUseCase();
    jest
      .spyOn(placeExistsByNameRepositoryStub, 'existsByName')
      .mockReturnValueOnce(Promise.reject(new Error('Repository error')));

    const response = sut.execute(mockInputCreatePlaceDto());

    await expect(response).rejects.toEqual(new Error('Repository error'));
  });

  it('should call PlaceFactory with correct values', async () => {
    const { sut } = mockCreatePlaceUseCase();
    const createSpy = jest.spyOn(PlaceFactory, 'create');
    const input = mockInputCreatePlaceDto();

    await sut.execute(input);

    expect(createSpy).toHaveBeenCalledWith(input);
  });

  it('should call CreatePlaceRepository with correct values', async () => {
    const { sut, createPlaceRepositoryStub } = mockCreatePlaceUseCase();
    const mockedPlaceEntity = mockPlaceEntity();
    jest.spyOn(PlaceFactory, 'create').mockReturnValueOnce(mockedPlaceEntity);
    const createSpy = jest.spyOn(createPlaceRepositoryStub, 'create');
    const input = mockInputCreatePlaceDto();

    await sut.execute(input);

    expect(createSpy).toHaveBeenCalledWith(mockedPlaceEntity);
  });

  it('should return the created place id', async () => {
    const { sut } = mockCreatePlaceUseCase();
    jest.spyOn(crypto, 'randomUUID').mockReturnValueOnce('any-u-u-i-d');
    const expectedResult: OutputCreatePlaceDto = {
      id: 'any-u-u-i-d',
    };

    const result = await sut.execute(mockInputCreatePlaceDto());

    expect(result).toEqual(expectedResult);
  });
});
