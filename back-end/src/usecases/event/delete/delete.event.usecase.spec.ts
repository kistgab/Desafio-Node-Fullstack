import { DeleteEventRepository } from '@domain/event/repositories/delete.event.repository';
import { FindEventByIdRepository } from '@domain/event/repositories/find-by-id.event.repository';
import {
  mockDeleteEventRepository,
  mockFindEventByIdRepository,
  mockInputDeleteEventDto,
} from '@test/utils/delete-event-usecase.utils';
import { DeleteEventUseCase } from '@usecases/event/delete/delete.event.usecase';

type SutTypes = {
  sut: DeleteEventUseCase;
  deleteEventRepositoryStub: DeleteEventRepository;
  findEventByIdRepositoryStub: FindEventByIdRepository;
};

export function mockDeleteEventUseCase(): SutTypes {
  const findEventByIdRepositoryStub = mockFindEventByIdRepository();
  const deleteEventRepositoryStub = mockDeleteEventRepository();
  const sut = new DeleteEventUseCase(
    findEventByIdRepositoryStub,
    deleteEventRepositoryStub,
  );
  return { sut, findEventByIdRepositoryStub, deleteEventRepositoryStub };
}

describe('Delete Event UseCase', () => {
  it('should call FindEventByIdRepository with correct values', async () => {
    const { sut, findEventByIdRepositoryStub } = mockDeleteEventUseCase();
    const findByIdSpy = jest.spyOn(findEventByIdRepositoryStub, 'findById');
    const input = mockInputDeleteEventDto();

    await sut.execute(input);

    expect(findByIdSpy).toHaveBeenCalledWith(input.id);
  });

  it('should return an error when FindEventByIdRepository return null', async () => {
    const { sut, findEventByIdRepositoryStub } = mockDeleteEventUseCase();
    jest
      .spyOn(findEventByIdRepositoryStub, 'findById')
      .mockResolvedValueOnce(Promise.resolve(null));

    const response = await sut.execute(mockInputDeleteEventDto());

    expect(response).toEqual(
      new Error('There is no event with the specified id.'),
    );
  });

  it('should throw if FindEventByIdRepository throws', async () => {
    const { sut, findEventByIdRepositoryStub } = mockDeleteEventUseCase();
    jest
      .spyOn(findEventByIdRepositoryStub, 'findById')
      .mockReturnValueOnce(Promise.reject(new Error('Repository error')));

    const response = sut.execute(mockInputDeleteEventDto());

    await expect(response).rejects.toEqual(new Error('Repository error'));
  });

  it('should call DeleteEventRepository with correct values', async () => {
    const { sut, deleteEventRepositoryStub } = mockDeleteEventUseCase();
    const deleteSpy = jest.spyOn(deleteEventRepositoryStub, 'delete');
    const input = mockInputDeleteEventDto();

    await sut.execute(input);

    expect(deleteSpy).toHaveBeenCalledWith(input.id);
  });

  it('should throw if DeleteEventRepository throws', async () => {
    const { sut, deleteEventRepositoryStub } = mockDeleteEventUseCase();
    jest
      .spyOn(deleteEventRepositoryStub, 'delete')
      .mockReturnValueOnce(Promise.reject(new Error('Repository error')));

    const response = sut.execute(mockInputDeleteEventDto());

    await expect(response).rejects.toEqual(new Error('Repository error'));
  });
});
