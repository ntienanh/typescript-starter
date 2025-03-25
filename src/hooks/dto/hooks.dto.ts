import { IsString } from 'class-validator';

export class CreateHookDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  usage: string;

  @IsString()
  behavior: string;

  @IsString()
  code: string;
}

export class UpdateHookDto extends CreateHookDto {}
