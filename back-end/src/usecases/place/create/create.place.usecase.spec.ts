import { PlaceExistsByNameRepository } from '@domain/place/repositories/exists-by-name.place.repository';
import {
  mockInputCreatePlaceDto,
  mockPlaceExistsByNameRepository,
} from '@test/utils/create-place-usecase.utils';
import { CreatePlaceUseCase } from '@usecases/place/create/create-place.usecase';

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
});
