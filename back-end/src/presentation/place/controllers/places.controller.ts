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
} from '@nestjs/common';
import { CreatePlaceControllerDto } from '@presentation/place/dtos/create-place-controller.dto';
import { OutputCreatePlaceDto } from '@usecases/place/create/dto/create.place.dto';
import { OutputDetailPlaceDto } from '@usecases/place/detail/dto/detail.place.dto';
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
}
