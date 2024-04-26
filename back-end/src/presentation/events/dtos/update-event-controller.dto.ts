import { EventType } from '@domain/event/enums/event-type.enum';
import { Type } from 'class-transformer';
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsMobilePhone,
  IsNotEmpty,
  IsNotEmptyObject,
  IsOptional,
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
  @IsOptional()
  phone?: string;
  @IsEmail()
  email: string;
}

export class UpdateEventControllerDto {
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
