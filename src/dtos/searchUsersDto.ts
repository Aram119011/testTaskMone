
import { IsOptional, IsString, IsInt } from 'class-validator';

export class SearchUsersDto {
  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsInt()
  @IsOptional()
  age?: number;
}
