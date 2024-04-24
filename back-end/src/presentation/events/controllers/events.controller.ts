import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CreateEventControllerDto } from '@presentation/events/dtos/create-event-controller.dto';
import { OutputCreateEventDto } from '@usecases/event/create/dto/create.event.dto';
import { EventUseCasesFactory } from 'src/infrastructure/event/factories/usecases.factory';

@Controller('events')
export class EventsController {
  @Post()
  @HttpCode(HttpStatus.OK)
  async create(
    @Body() input: CreateEventControllerDto,
  ): Promise<OutputCreateEventDto> {
    const useCase = await EventUseCasesFactory.createEvent();
    const result = await useCase.execute({
      ...input,
      duration: {
        endsAt: new Date(input.duration.endsAt),
        startsAt: new Date(input.duration.startsAt),
      },
    });
    if (result instanceof Error) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }
    return result;
  }
}
