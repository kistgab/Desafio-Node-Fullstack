import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CreatePlaceControllerDto } from '@presentation/place/dtos/create-place-controller.dto';
import { OutputCreatePlaceDto } from '@usecases/place/create/dto/create.place.dto';
import { PlaceUseCasesFactory } from 'src/infrastructure/place/factories/usecases.factory';

@Controller('places')
export class PlacesController {
  @Post()
  @HttpCode(HttpStatus.OK)
  async create(
    @Body() input: CreatePlaceControllerDto,
  ): Promise<OutputCreatePlaceDto | Error> {
    const useCase = await PlaceUseCasesFactory.createPlace();
    const result = await useCase.execute(input);
    if (result instanceof Error) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }
    return result;
  }
}
