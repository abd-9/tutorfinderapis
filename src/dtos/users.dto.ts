import { IsEmail, IsString, IsNotEmpty, MinLength, MaxLength, IsOptional, IsBoolean, IsArray, IsMongoId, IsNumber } from 'class-validator';

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

export class UpdateTutorDto {
  @IsEmail()
  @IsOptional()
  public email?: string;

  @IsString()
  @IsOptional()
  public name?: string;

  @IsString()
  @IsOptional()
  @MinLength(6)
  public password?: string;

  @IsOptional()
  @IsBoolean()
  flexibility?: boolean;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  cities?: string[];

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  subjectsTaught?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  qualifications?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  teachingStyle?: string[];

  @IsMongoId()
  userId: string;
}
export class UpdateStudentDto {
  @IsEmail()
  @IsOptional()
  public email?: string;

  @IsString()
  @IsOptional()
  public name?: string;

  @IsString()
  @IsOptional()
  @MinLength(6)
  public password?: string;

  @IsString()
  @IsOptional()
  public schoolName?: string;

  @IsString()
  @IsOptional()
  public studentLevel?: string;

  @IsString()
  @IsOptional()
  public country?: string;

  @IsString()
  @IsOptional()
  public city?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsMongoId()
  userId: string;
}
export class CreateStudentDto {
  @IsEmail()
  public email?: string;

  @IsString()
  public name?: string;

  @IsString()
  @MinLength(6)
  public password?: string;

  @IsString()
  @IsOptional()
  public schoolName?: string;

  @IsString()
  @IsOptional()
  public studentLevel?: string;

  @IsString()
  @IsOptional()
  public country?: string;

  @IsString()
  @IsOptional()
  public city?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsMongoId()
  userId: string;
}

export class ReviewDto {
  @IsString()
  @IsNotEmpty()
  public comment: string;

  @IsMongoId()
  @IsNotEmpty()
  public studentId: string;

  @IsNumber()
  @IsOptional()
  public rate: string;
}
