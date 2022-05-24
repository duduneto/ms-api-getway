import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProductInputDTO {
  @IsString()
  @IsNotEmpty()
  title: string;
}
