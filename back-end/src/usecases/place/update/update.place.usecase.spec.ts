import { PlaceFactory } from '@domain/place/factory/place.factory';
import { PlaceExistsByNameRepository } from '@domain/place/repositories/exists-by-name.place.repository';
import { FindPlaceByIdRepository } from '@domain/place/repositories/find-by-id.place.repository copy';
import { UpdatePlaceRepository } from '@domain/place/repositories/update.place.repository';
import { mockPlaceExistsByNameRepository } from '@test/utils/create-place-usecase.utils';
import { mockFindPlaceByIdRepository } from '@test/utils/delete-place-usecase.utils';
import { mockPlaceEntity } from '@test/utils/place.utils';
import {
  mockInputUpdatePlaceDto,
  mockUpdatePlaceRepository,
} from '@test/utils/update-place-usecase.utils';
import { UpdatePlaceUseCase } from '@usecases/place/update/update.place.usecase';

type SutTypes = {
  sut: UpdatePlaceUseCase;
  placeExistsByNameRepositoryStub: PlaceExistsByNameRepository;
  updatePlaceRepositoryStub: UpdatePlaceRepository;
  findPlaceByIdRepositoryStub: FindPlaceByIdRepository;
};

export function mockUpdatePlaceUseCase(): SutTypes {
  const placeExistsByNameRepositoryStub = mockPlaceExistsByNameRepository();
  const updatePlaceRepositoryStub = mockUpdatePlaceRepository();
  const findPlaceByIdRepositoryStub = mockFindPlaceByIdRepository();
  const sut = new UpdatePlaceUseCase(
    findPlaceByIdRepositoryStub,
    placeExistsByNameRepositoryStub,
    updatePlaceRepositoryStub,
  );
  return {
    sut,
    placeExistsByNameRepositoryStub,
    updatePlaceRepositoryStub,
    findPlaceByIdRepositoryStub,
  };
}

describe('Update Place UseCase', () => {
  beforeAll(() => {
    jest.setSystemTime(new Date('2023-04-23'));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('should call FindPlaceByIdRepository with correct values', async () => {
    const { sut, findPlaceByIdRepositoryStub } = mockUpdatePlaceUseCase();
    const findByIdSpy = jest.spyOn(findPlaceByIdRepositoryStub, 'findById');
    const input = mockInputUpdatePlaceDto();

    await sut.execute(input);

    expect(findByIdSpy).toHaveBeenCalledWith(input.id);
  });

  it('should return an error when FindPlaceByIdRepository returns null', async () => {
    const { sut, findPlaceByIdRepositoryStub } = mockUpdatePlaceUseCase();
    jest
      .spyOn(findPlaceByIdRepositoryStub, 'findById')
      .mockResolvedValueOnce(null);

    const response = await sut.execute(mockInputUpdatePlaceDto());

    expect(response).toEqual(
      new Error('There is no place with the specified id.'),
    );
  });

  it('should throw if FindPlaceByIdRepository throws', async () => {
    const { sut, findPlaceByIdRepositoryStub } = mockUpdatePlaceUseCase();
    jest
      .spyOn(findPlaceByIdRepositoryStub, 'findById')
      .mockReturnValueOnce(Promise.reject(new Error('Repository error')));

    const response = sut.execute(mockInputUpdatePlaceDto());

    await expect(response).rejects.toEqual(new Error('Repository error'));
  });

  it('should call PlaceExistsByNameRepository with correct values', async () => {
    const { sut, placeExistsByNameRepositoryStub } = mockUpdatePlaceUseCase();
    const existsByNameSpy = jest.spyOn(
      placeExistsByNameRepositoryStub,
      'existsByName',
    );
    const input = mockInputUpdatePlaceDto({ name: 'different_name' });

    await sut.execute(input);

    expect(existsByNameSpy).toHaveBeenCalledWith(input.name);
  });

  it('should throw if PlaceExistsByNameRepository throws', async () => {
    const { sut, placeExistsByNameRepositoryStub } = mockUpdatePlaceUseCase();
    jest
      .spyOn(placeExistsByNameRepositoryStub, 'existsByName')
      .mockReturnValueOnce(Promise.reject(new Error('Repository error')));

    const response = sut.execute(
      mockInputUpdatePlaceDto({ name: 'different_name' }),
    );

    await expect(response).rejects.toEqual(new Error('Repository error'));
  });

  it('should return an error when PlaceExistsByNameRepository returns true', async () => {
    const { sut, placeExistsByNameRepositoryStub } = mockUpdatePlaceUseCase();
    jest
      .spyOn(placeExistsByNameRepositoryStub, 'existsByName')
      .mockResolvedValueOnce(true);

    const response = await sut.execute(
      mockInputUpdatePlaceDto({ name: 'different_name' }),
    );

    expect(response).toEqual(
      new Error('There is already a place with the specified name.'),
    );
  });

  it('should call PlaceFactory with correct values', async () => {
    const { sut } = mockUpdatePlaceUseCase();
    const factorySpy = jest.spyOn(PlaceFactory, 'create');
    const input = mockInputUpdatePlaceDto();
    const mockedPlaceEntity = mockPlaceEntity();

    await sut.execute(input);

    expect(factorySpy).toHaveBeenCalledWith({
      ...input,
      createdAt: mockedPlaceEntity.createdAt,
      updatedAt: new Date(),
    });
  });

  it('should throw if PlaceFactory throws', async () => {
    const { sut } = mockUpdatePlaceUseCase();
    jest.spyOn(PlaceFactory, 'create').mockImplementationOnce(() => {
      throw new Error('Factory error');
    });

    const response = sut.execute(mockInputUpdatePlaceDto());

    await expect(response).rejects.toEqual(new Error('Factory error'));
  });

  it('should call UpdatePlaceRepository with correct values', async () => {
    const { sut, updatePlaceRepositoryStub } = mockUpdatePlaceUseCase();
    const updateSpy = jest.spyOn(updatePlaceRepositoryStub, 'update');
    const input = mockInputUpdatePlaceDto();
    const mockedPlaceEntity = mockPlaceEntity();

    await sut.execute(input);

    expect(updateSpy).toHaveBeenCalledWith(
      PlaceFactory.create({
        ...input,
        createdAt: mockedPlaceEntity.createdAt,
        updatedAt: new Date(),
      }),
    );
  });

  it('should throw if UpdatePlaceRepository throws', async () => {
    const { sut, updatePlaceRepositoryStub } = mockUpdatePlaceUseCase();
    jest
      .spyOn(updatePlaceRepositoryStub, 'update')
      .mockReturnValueOnce(Promise.reject(new Error('Repository error')));

    const response = sut.execute(mockInputUpdatePlaceDto());

    await expect(response).rejects.toEqual(new Error('Repository error'));
  });
});
