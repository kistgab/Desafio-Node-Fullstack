import { Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  Max,
} from 'class-validator';

export class ListAllControllerDto {
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  page: number;

  @IsInt()
  @IsPositive()
  @Max(100)
  @Type(() => Number)
  take: number;

  @IsOptional()
  @IsNotEmpty()
  filter?: string;
}
