import { PlaceType } from '@domain/place/enums/place-type.enum';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsEmail,
  IsEnum,
  IsMobilePhone,
  IsNotEmpty,
  IsNotEmptyObject,
  IsOptional,
  Length,
  ValidateNested,
} from 'class-validator';

class AddressDto {
  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  state: string;

  @Length(8, 8)
  zipCode: string;

  @IsNotEmpty()
  line: string;

  @IsOptional()
  @IsNotEmpty()
  complement?: string;
}

class ContactDto {
  @IsEmail()
  mail: string;

  @IsOptional()
  @IsMobilePhone()
  phone?: string;
}

export class UpdatePlaceControllerDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsNotEmpty()
  nickname?: string;

  @IsEnum(PlaceType)
  type: PlaceType;

  @IsOptional()
  @Length(14, 14)
  cnpj?: string;

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => ContactDto)
  contact: ContactDto;

  @ArrayMinSize(1)
  @IsNotEmpty({ each: true })
  entries: string[];

  @ArrayMinSize(1)
  @IsNotEmpty({ each: true })
  ticketGates: string[];
}
