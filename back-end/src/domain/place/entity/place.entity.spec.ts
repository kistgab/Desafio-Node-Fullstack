import { PlaceType } from '@domain/place/enums/place-type.enum';
import { mockPlaceEntity } from '@test/utils/place.utils';

describe('Place Entity', () => {
  it('should return the correct value in get methods', () => {
    const place = mockPlaceEntity();

    expect(place.id).toEqual('any_id');
    expect(place.name).toEqual('any_name');
    expect(place.nickname).toEqual('any_nickname');
    expect(place.type).toEqual(PlaceType.Stadium);
    expect(place.cnpj).toEqual('any_cnpj');
    expect(place.contact).toEqual({
      mail: 'mail@mail.com',
      phone: '99999999999',
    });
    expect(place.entries).toEqual(['entry']);
    expect(place.ticketGates).toEqual(['gate']);
    expect(place.createdAt).toEqual(new Date('2023-01-29'));
    expect(place.updatedAt).toEqual(new Date('2024-04-04'));
    expect(place.address).toEqual({
      city: 'any_city',
      state: 'any_state',
      zipCode: 'any_zipcode',
      line: 'any_line',
      complement: 'any_compliment',
    });
  });
});
