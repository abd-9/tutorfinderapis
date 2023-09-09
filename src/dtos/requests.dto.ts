import { REQUEST_STATUS } from '@/models/request.model';
import {
  IsEmail,
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsOptional,
  IsBoolean,
  IsArray,
  IsMongoId,
  IsNumber,
  IsDate,
  IsEnum,
  IsISO8601,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  public email: string;
  @IsString()
  public name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  // @MaxLength(32)
  public password: string;
}

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(32)
  public password: string;
}

export class SendSessionRequestDTO {
  @IsISO8601()
  startDateTime: String;
  @IsISO8601()
  endDateTime: String;

  @IsOptional()
  @IsString()
  note?: string;

  @IsNumber()
  @IsOptional()
  rate: number;
}

export class UpdateSessionRequestDTO {
  @IsOptional()
  @IsISO8601()
  startDateTime: String;

  @IsOptional()
  @IsISO8601()
  endDateTime: String;

  @IsOptional()
  @IsString()
  note?: string;

  @IsNumber()
  @IsOptional()
  rate: number;

  @IsOptional()
  @IsNumber()
  @IsEnum(REQUEST_STATUS)
  status: REQUEST_STATUS;
}
