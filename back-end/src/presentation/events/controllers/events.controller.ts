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
import { CreateEventControllerDto } from '@presentation/events/dtos/create-event-controller.dto';
import { OutputCreateEventDto } from '@usecases/event/create/dto/create.event.dto';
import { OutputDetailEventDto } from '@usecases/event/detail/dto/detail.event.dto';
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

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string): Promise<void> {
    const useCase = await EventUseCasesFactory.deleteEvent();
    const result = await useCase.execute({ id });
    if (result instanceof Error) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async detail(@Param('id') id: string): Promise<OutputDetailEventDto> {
    const useCase = await EventUseCasesFactory.detailEvent();
    const result = await useCase.execute({ id });
    if (result instanceof Error) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }
    return result;
  }
}
