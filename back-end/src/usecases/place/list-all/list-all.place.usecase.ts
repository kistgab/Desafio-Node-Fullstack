import {
  RequestPagination,
  ResponsePagination,
} from '@domain/@shared/utils/pagination.dto';
import { PlaceFilters } from '@domain/place/filters/filters.place';
import { PlaceMapper } from '@domain/place/mapper/place.mapper';
import { CountAllPlacesRepository } from '@domain/place/repositories/count-all.place.repository';
import { FindAllPlacesRepository } from '@domain/place/repositories/find-all.place.repository';
import { OutputListPlaceDto } from '@usecases/place/list-all/dto/list-all.place.dto';

export class ListAllPlacesUseCase {
  constructor(
    private readonly findAllPlacesRepository: FindAllPlacesRepository,
    private readonly countAllPlacesRepository: CountAllPlacesRepository,
  ) {}

  async execute(
    input: RequestPagination<PlaceFilters>,
  ): Promise<ResponsePagination<OutputListPlaceDto> | Error> {
    const places = await this.findAllPlacesRepository.findAll(input);
    const totalPlaces = await this.countAllPlacesRepository.countAll(
      input.filters,
    );
    const mappedPlaces = places.map(PlaceMapper.toSimpleDto);
    return new ResponsePagination(
      mappedPlaces,
      input.page,
      input.take,
      totalPlaces,
    );
  }
}
