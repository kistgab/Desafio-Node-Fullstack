import { EventType } from '@domain/event/enums/event-type.enum';
import { Type } from 'class-transformer';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';

class DurationDto {
  @IsDateString({ strict: true })
  startsAt: string;
  @IsDateString({ strict: true })
  endsAt: string;
}

class ContactDto {
  phone?: string;
  email: string;
}

export class CreateEventControllerDto {
  @IsNotEmpty()
  name: string;

  @IsEnum(EventType)
  type: EventType;

  @ValidateNested()
  @Type(() => DurationDto)
  duration: DurationDto;

  @IsNotEmpty()
  placeId: string;

  @ValidateNested()
  @Type(() => ContactDto)
  contact: ContactDto;
}
