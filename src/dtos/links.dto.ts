import { LINK_TYPES } from '@/interfaces/link.interface';
import { ICustomer } from '@/interfaces/users.interface';
import { Expose } from 'class-transformer';
import { IsString, IsOptional, IsNumber, IsEnum, IsArray, IsEmail, Length } from 'class-validator';

export class CreateLinkDTO {
  @IsString()
  name: string;

  @IsString()
  url: string;

  @IsString()
  imageUrl: string;

  // @IsBoolean()
  // active: boolean;

  @IsOptional()
  @IsNumber()
  visitsCount: number;

  @IsOptional()
  @IsArray()
  tags: string[];

  @IsOptional()
  @IsNumber()
  higet?: number;

  @IsOptional()
  @IsNumber()
  width?: number;

  @IsOptional()
  @IsNumber()
  pixels?: number;

  @IsOptional()
  @Expose({ name: 'userId' })
  @IsString()
  user: string;

  owner: CreateCustomerDto;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  paymentId: string;

  @IsEnum(LINK_TYPES)
  type: LINK_TYPES;
}
export class LinkFilterDTO {
  @IsString()
  @IsOptional()
  name: string;

  @IsOptional()
  @IsArray()
  tags: string[];

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(LINK_TYPES)
  type: LINK_TYPES;
}

export class CreateCustomerDto {
  @IsEmail()
  email: string;

  @IsString()
  @Length(1, 50)
  firstName: string;

  @IsOptional()
  @IsString()
  @Length(1, 50)
  lastName?: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsString()
  streetAddress?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  state?: string;

  @IsOptional()
  @IsString()
  postalCode?: string;
}
