import { PlaceEntity } from '@domain/place/entity/place.entity';
import { PlaceType } from '@domain/place/enums/place-type.enum';
import {
  PlaceEntityProps,
  PlaceFactory,
} from '@domain/place/factory/place.factory';

export function mockPlaceEntity(
  props?: Partial<PlaceEntityProps>,
): PlaceEntity {
  return PlaceFactory.create(mockPlaceEntityProps(props));
}

export function mockPlaceEntityProps(
  props?: Partial<PlaceEntityProps>,
): PlaceEntityProps {
  return {
    ...{
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
      entries: ['entry'],
      ticketGates: ['gate'],
      cnpj: 'any_cnpj',
      createdAt: new Date('2023-01-29'),
      updatedAt: new Date('2024-04-04'),
    },
    ...props,
  };
}
