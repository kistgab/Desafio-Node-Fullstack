import { PlaceMapper } from '@domain/place/mapper/place.mapper';
import { mockPlaceEntity } from '@test/utils/place.utils';
import { OutputDetailPlaceDto } from '@usecases/place/detail/dto/detail.place.dto';

describe('Place Mapper', () => {
  it('should map all properties correctly', () => {
    const input = mockPlaceEntity();
    const expectedResult: OutputDetailPlaceDto = {
      address: input.address,
      cnpj: input.cnpj,
      contact: input.contact,
      createdAt: input.createdAt,
      entries: input.entries,
      id: input.id,
      name: input.name,
      nickname: input.nickname,
      ticketGates: input.ticketGates,
      type: input.type,
      updatedAt: input.updatedAt,
    };

    const result = PlaceMapper.toDetailedDto(input);

    expect(result).toEqual(expectedResult);
  });
});
