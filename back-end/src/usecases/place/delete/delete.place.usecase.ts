import { DeletePlaceRepository } from '@domain/place/repositories/delete.place.repository';
import { FindPlaceByIdRepository } from '@domain/place/repositories/find-by-id.place.repository';
import { InputDeletePlaceDto } from '@usecases/place/delete/dto/delete.place.dto';

export class DeletePlaceUseCase {
  constructor(
    private readonly findPlaceByIdRepository: FindPlaceByIdRepository,
    private readonly deletePlaceRepository: DeletePlaceRepository,
  ) {}

  async execute(input: InputDeletePlaceDto): Promise<void | Error> {
    const place = await this.findPlaceByIdRepository.findById(input.id);
    if (!place) {
      return new Error('There is no place with the specified id.');
    }
    await this.deletePlaceRepository.delete(place.id);
  }
}
