import { PlaceFactory } from '@domain/place/factory/place.factory';
import { CreatePlaceRepository } from '@domain/place/repositories/create.place.repository';
import { PlaceExistsByNameRepository } from '@domain/place/repositories/exists-by-name.place.repository';
import {
  InputCreatePlaceDto,
  OutputCreatePlaceDto,
} from '@usecases/place/create/dto/create.place.dto';

export class CreatePlaceUseCase {
  constructor(
    private readonly placeExistsByNameRepository: PlaceExistsByNameRepository,
    private readonly createPlaceRepository: CreatePlaceRepository,
  ) {}

  async execute(
    input: InputCreatePlaceDto,
  ): Promise<OutputCreatePlaceDto | Error> {
    if (await this.placeExistsByNameRepository.existsByName(input.name)) {
      return new Error('There is already a place with this name.');
    }
    const place = PlaceFactory.create(input);
    this.createPlaceRepository.create(place);
    return {
      id: place.id,
    };
  }
}
