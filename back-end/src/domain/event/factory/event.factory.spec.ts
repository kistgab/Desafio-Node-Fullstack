import { EventEntity } from '@domain/event/entity/event.entity';
import { EventFactory } from '@domain/event/factory/event.factory';
import { mockEventEntityProps } from '@test/utils/event.utils';
import { mockPlaceEntity } from '@test/utils/place.utils';

describe('Event Factory', () => {
  it('should create an EventEntity correctly', () => {
    const input = mockEventEntityProps();
    const expectedResult = new EventEntity(
      input.id!,
      input.name,
      input.type,
      input.duration,
      mockPlaceEntity(),
      input.contact,
    );

    const result = EventFactory.create(input);

    expect(result).toEqual(expectedResult);
  });

  it('should call uuid generator correctly when id is not provided', () => {
    const input = mockEventEntityProps();
    input.id = undefined;
    const uuidSpy = jest.spyOn(crypto, 'randomUUID');
    uuidSpy.mockReturnValueOnce('any-u-u-i-d');
    const expectedResult = new EventEntity(
      'any-u-u-i-d',
      input.name,
      input.type,
      input.duration,
      mockPlaceEntity(),
      input.contact,
    );

    const result = EventFactory.create(input);

    expect(uuidSpy).toHaveBeenCalled();
    expect(result).toEqual(expectedResult);
  });
});
