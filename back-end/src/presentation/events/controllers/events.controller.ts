import {
  RequestPagination,
  ResponsePagination,
} from '@domain/@shared/utils/pagination.dto';
import { EventFilters } from '@domain/event/filters/filters.event';
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
import { CreateEventControllerDto } from '@presentation/events/dtos/create-event-controller.dto';
import { UpdateEventControllerDto } from '@presentation/events/dtos/update-event-controller.dto';
import { ListAllControllerDto } from '@presentation/place/dtos/list-all-controller.dto';
import { OutputCreateEventDto } from '@usecases/event/create/dto/create.event.dto';
import { OutputDetailEventDto } from '@usecases/event/detail/dto/detail.event.dto';
import { OutputListEventDto } from '@usecases/event/list-all/dto/list-all.event.dto';
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

  @Get()
  @HttpCode(HttpStatus.OK)
  async listAll(
    @Query() params: ListAllControllerDto,
  ): Promise<ResponsePagination<OutputListEventDto>> {
    const useCase = await EventUseCasesFactory.listAll();
    const input: RequestPagination<EventFilters> = {
      page: params.page,
      take: params.take,
    };
    if (params.filter) {
      input.filters = {
        name: params.filter,
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
    @Body() input: UpdateEventControllerDto,
    @Param('id') id: string,
  ): Promise<void> {
    const useCase = await EventUseCasesFactory.updateEvent();
    const result = await useCase.execute({
      id,
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
