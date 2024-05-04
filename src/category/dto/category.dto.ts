import { IsString } from 'class-validator';
import { ServiceDTO } from 'src/service/dto/service.dto';

export class CreateCategoryDto {
  @IsString()
  name: string;
  services: ServiceDTO[];
}

export class UpdateCategoryDto {
  @IsString()
  name: string;
}
