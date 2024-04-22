import { PlaceEntity } from '@domain/place/entity/place.entity';
import { PlaceFactory } from '@domain/place/factory/place.factory';
import { mockPlaceEntityProps } from '@test/utils/place.utils';

describe('Place Factory', () => {
  it('should create an PlaceEntity correctly', () => {
    const input = mockPlaceEntityProps();
    const expectedResult = new PlaceEntity(
      input.id!,
      input.name,
      input.type,
      input.address,
      input.contact,
      input.entries,
      input.ticketGates,
      input.nickname,
      input.createdAt,
      input.updatedAt,
      input.cnpj,
    );

    const result = PlaceFactory.create(input);

    expect(result).toEqual(expectedResult);
  });

  it('should call uuid generator correctly when id is not provided', () => {
    const input = mockPlaceEntityProps();
    input.id = undefined;
    const uuidSpy = jest.spyOn(crypto, 'randomUUID');
    uuidSpy.mockReturnValueOnce('any-u-u-i-d');
    const expectedResult = new PlaceEntity(
      'any-u-u-i-d',
      input.name,
      input.type,
      input.address,
      input.contact,
      input.entries,
      input.ticketGates,
      input.nickname,
      input.createdAt,
      input.updatedAt,
      input.cnpj,
    );

    const result = PlaceFactory.create(input);

    expect(uuidSpy).toHaveBeenCalled();
    expect(result).toEqual(expectedResult);
  });
});
