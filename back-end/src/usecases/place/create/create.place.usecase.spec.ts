import { PlaceExistsByNameRepository } from '@domain/place/repositories/exists-by-name.place.repository';
import {
  mockInputCreatePlaceDto,
  mockPlaceExistsByNameRepository,
} from '@test/utils/create-place-usecase.utils';
import { CreatePlaceUseCase } from '@usecases/place/create/create.place.usecase';

type SutTypes = {
  sut: CreatePlaceUseCase;
  placeExistsByNameRepositoryStub: PlaceExistsByNameRepository;
};

export function mockCreatePlaceUseCase(): SutTypes {
  const placeExistsByNameRepositoryStub = mockPlaceExistsByNameRepository();
  const sut = new CreatePlaceUseCase(placeExistsByNameRepositoryStub);
  return { sut, placeExistsByNameRepositoryStub };
}

describe('Create Place UseCase', () => {
  it('should call placeExistsByNameRepositoryStub with correct values', async () => {
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

    expect(response).rejects.toEqual(new Error('Repository error'));
  });
});
