import { Expose } from 'class-transformer';
import { IsString, IsBoolean, IsOptional, IsNumber } from 'class-validator';

export class CreatePaymentDTO {
  @IsBoolean()
  active: boolean;

  @IsOptional()
  @Expose({ name: 'subscriberId' })
  @IsString()
  subscriber: string;

  // @IsDate()
  // createdDate: Date;

  @IsNumber()
  amount: number;

  @IsString()
  transactionId: string;
}

export class UpdatePaymentDTO {
  @IsOptional()
  @IsBoolean()
  active?: boolean;

  // @IsOptional()
  // @IsDate()
  // createdDate?: Date;

  @IsOptional()
  @IsNumber()
  amount?: number;

  @IsOptional()
  @IsString()
  transactionId?: string;
}
