import { PlaceMapper } from '@domain/place/mapper/place.mapper';
import { FindPlaceByIdRepository } from '@domain/place/repositories/find-by-id.place.repository copy';
import {
  InputDetailPlaceDto,
  OutputDetailPlaceDto,
} from '@usecases/place/detail/dto/detail.place.dto';

export class DetailPlaceUseCase {
  constructor(
    private readonly findPlaceByIdRepository: FindPlaceByIdRepository,
  ) {}

  async execute(
    input: InputDetailPlaceDto,
  ): Promise<OutputDetailPlaceDto | Error> {
    const place = await this.findPlaceByIdRepository.findById(input.id);
    if (!place) {
      return new Error('There is no place with the specified id.');
    }
    return PlaceMapper.toDetailedDto(place);
  }
}
