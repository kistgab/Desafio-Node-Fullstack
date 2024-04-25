import { EventType } from '@domain/event/enums/event-type.enum';
import { Type } from 'class-transformer';
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsMobilePhone,
  IsNotEmpty,
  IsNotEmptyObject,
  ValidateNested,
} from 'class-validator';

class DurationDto {
  @IsDateString({ strict: true })
  startsAt: string;
  @IsDateString({ strict: true })
  endsAt: string;
}

class ContactDto {
  @IsMobilePhone()
  phone?: string;

  @IsEmail()
  email: string;
}

export class CreateEventControllerDto {
  @IsNotEmpty()
  name: string;

  @IsEnum(EventType)
  type: EventType;

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => DurationDto)
  duration: DurationDto;

  @IsNotEmpty()
  placeId: string;

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => ContactDto)
  contact: ContactDto;
}
