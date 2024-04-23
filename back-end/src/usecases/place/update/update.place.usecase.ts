import { PlaceFactory } from '@domain/place/factory/place.factory';
import { PlaceExistsByNameRepository } from '@domain/place/repositories/exists-by-name.place.repository';
import { FindPlaceByIdRepository } from '@domain/place/repositories/find-by-id.place.repository copy';
import { UpdatePlaceRepository } from '@domain/place/repositories/update.place.repository';
import { InputUpdatePlaceDto } from '@usecases/place/update/dto/update.place.dto';

export class UpdatePlaceUseCase {
  constructor(
    private readonly findPlaceByIdRepository: FindPlaceByIdRepository,
    private readonly placeExistsByNameRepository: PlaceExistsByNameRepository,
    private readonly updatePlaceRepository: UpdatePlaceRepository,
  ) {}

  async execute(input: InputUpdatePlaceDto): Promise<void | Error> {
    const placeToEdit = await this.findPlaceByIdRepository.findById(input.id);
    if (!placeToEdit) {
      return new Error('There is no place with the specified id.');
    }
    const isChangingName = placeToEdit.name !== input.name;
    if (isChangingName) {
      const newNameAlreadyUsed =
        await this.placeExistsByNameRepository.existsByName(input.name);
      if (newNameAlreadyUsed) {
        return new Error('There is already a place with the specified name.');
      }
    }
    const place = PlaceFactory.create(input);
    await this.updatePlaceRepository.update(place);
  }
}
