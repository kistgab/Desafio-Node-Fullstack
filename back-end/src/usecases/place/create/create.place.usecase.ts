import { PlaceExistsByNameRepository } from '@domain/place/repositories/exists-by-name.place.repository';
import {
  InputCreatePlaceDto,
  OutputCreatePlaceDto,
} from '@usecases/place/create/dto/create.place.dto';

export class CreatePlaceUseCase {
  constructor(
    private readonly placeExistsByNameRepository: PlaceExistsByNameRepository,
  ) {}

  async execute(
    input: InputCreatePlaceDto,
  ): Promise<OutputCreatePlaceDto | Error> {
    if (await this.placeExistsByNameRepository.existsByName(input.name)) {
      return new Error('There is already a place with this name.');
    }
    return {
      id: 'any_value',
    };
  }
}
