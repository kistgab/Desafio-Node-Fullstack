import {
  RequestPagination,
  ResponsePagination,
} from '@domain/@shared/utils/pagination.dto';
import { PlaceFilters } from '@domain/place/filters/filters.place';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreatePlaceControllerDto } from '@presentation/place/dtos/create-place-controller.dto';
import { ListAllControllerDto } from '@presentation/place/dtos/list-all-controller.dto';
import { UpdatePlaceControllerDto } from '@presentation/place/dtos/update-event-controller.dto';
import { OutputCreatePlaceDto } from '@usecases/place/create/dto/create.place.dto';
import { OutputDetailPlaceDto } from '@usecases/place/detail/dto/detail.place.dto';
import { OutputListPlaceDto } from '@usecases/place/list-all/dto/list-all.place.dto';
import { PlaceUseCasesFactory } from 'src/infrastructure/place/factories/usecases.factory';

@Controller('places')
export class PlacesController {
  @Post()
  @HttpCode(HttpStatus.OK)
  async create(
    @Body() input: CreatePlaceControllerDto,
  ): Promise<OutputCreatePlaceDto> {
    const useCase = await PlaceUseCasesFactory.createPlace();
    const result = await useCase.execute(input);
    if (result instanceof Error) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }
    return result;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string): Promise<void> {
    const useCase = await PlaceUseCasesFactory.deletePlace();
    const result = await useCase.execute({ id });
    if (result instanceof Error) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async detail(@Param('id') id: string): Promise<OutputDetailPlaceDto> {
    const useCase = await PlaceUseCasesFactory.detailPlace();
    const result = await useCase.execute({ id });
    if (result instanceof Error) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }
    return result;
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async listAll(
    @Query() params: ListAllControllerDto,
  ): Promise<ResponsePagination<OutputListPlaceDto>> {
    const useCase = await PlaceUseCasesFactory.listAll();
    const input: RequestPagination<PlaceFilters> = {
      page: params.page,
      take: params.take,
    };
    if (params.filter) {
      input.filters = {
        name: params.filter,
        nickname: params.filter,
      };
    }
    const result = await useCase.execute(input);
    if (result instanceof Error) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }
    return result;
  }

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(
    @Body() input: UpdatePlaceControllerDto,
    @Param('id') id: string,
  ): Promise<void> {
    const useCase = await PlaceUseCasesFactory.updatePlace();
    const result = await useCase.execute({
      id,
      ...input,
    });
    if (result instanceof Error) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }
    return result;
  }
}
