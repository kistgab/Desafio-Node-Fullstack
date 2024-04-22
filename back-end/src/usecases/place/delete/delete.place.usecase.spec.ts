import { DeletePlaceRepository } from '@domain/place/repositories/delete.place.repository';
import { FindPlaceByIdRepository } from '@domain/place/repositories/find-by-id.place.repository copy';
import {
  mockDeletePlaceRepository,
  mockFindPlaceByIdRepository,
  mockInputDeletePlaceDto,
} from '@test/utils/delete-place-usecase.utils';
import { DeletePlaceUseCase } from '@usecases/place/delete/delete.place.usecase';

type SutTypes = {
  sut: DeletePlaceUseCase;
  deletePlaceRepositoryStub: DeletePlaceRepository;
  findPlaceByIdRepositoryStub: FindPlaceByIdRepository;
};

export function mockDeletePlaceUseCase(): SutTypes {
  const findPlaceByIdRepositoryStub = mockFindPlaceByIdRepository();
  const deletePlaceRepositoryStub = mockDeletePlaceRepository();
  const sut = new DeletePlaceUseCase(
    findPlaceByIdRepositoryStub,
    deletePlaceRepositoryStub,
  );
  return { sut, findPlaceByIdRepositoryStub, deletePlaceRepositoryStub };
}

describe('Delete Place UseCase', () => {
  it('should call FindPlaceByIdRepository with correct values', async () => {
    const { sut, findPlaceByIdRepositoryStub } = mockDeletePlaceUseCase();
    const findByIdSpy = jest.spyOn(findPlaceByIdRepositoryStub, 'findById');
    const input = mockInputDeletePlaceDto();

    await sut.execute(input);

    expect(findByIdSpy).toHaveBeenCalledWith(input.id);
  });

  it('should return an error when FindPlaceByIdRepository return null', async () => {
    const { sut, findPlaceByIdRepositoryStub } = mockDeletePlaceUseCase();
    jest
      .spyOn(findPlaceByIdRepositoryStub, 'findById')
      .mockResolvedValueOnce(Promise.resolve(null));

    const response = await sut.execute(mockInputDeletePlaceDto());

    expect(response).toEqual(
      new Error('There is no place with the specified id.'),
    );
  });

  it('should throw if FindPlaceByIdRepository throws', async () => {
    const { sut, findPlaceByIdRepositoryStub } = mockDeletePlaceUseCase();
    jest
      .spyOn(findPlaceByIdRepositoryStub, 'findById')
      .mockReturnValueOnce(Promise.reject(new Error('Repository error')));

    const response = sut.execute(mockInputDeletePlaceDto());

    expect(response).rejects.toEqual(new Error('Repository error'));
  });

  it('should call DeletePlaceRepository with correct values', async () => {
    const { sut, deletePlaceRepositoryStub } = mockDeletePlaceUseCase();
    const deleteSpy = jest.spyOn(deletePlaceRepositoryStub, 'delete');
    const input = mockInputDeletePlaceDto();

    await sut.execute(input);

    expect(deleteSpy).toHaveBeenCalledWith(input.id);
  });
});
