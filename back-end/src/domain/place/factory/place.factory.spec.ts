import { PlaceEntity } from '@domain/place/entity/place.entity';
import { PlaceType } from '@domain/place/enums/place-type.enum';
import {
  PlaceEntityProps,
  PlaceFactory,
} from '@domain/place/factory/place.factory';

function mockInput(): PlaceEntityProps {
  return {
    id: 'any_id',
    name: 'any_name',
    nickname: 'any_nickname',
    type: PlaceType.Stadium,
    address: {
      city: 'any_city',
      state: 'any_state',
      zipCode: 'any_zipcode',
      line: 'any_line',
      complement: 'any_compliment',
    },
    contact: {
      mail: 'mail@mail.com',
      phone: '99999999999',
    },
    entries: [],
    ticketGates: [],
    createdAt: new Date('2023-01-29'),
    updatedAt: new Date('2024-04-04'),
  };
}
describe('Place Factory', () => {
  it('should create an PlaceEntity correctly', () => {
    const input = mockInput();
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
    const input = mockInput();
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
