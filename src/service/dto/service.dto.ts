import {
  IsString,
  IsNumber,
  IsEnum,
  ArrayMinSize,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class ServiceDTO {
  @IsString()
  name: string;

  @IsEnum(['Normal', 'VIP'])
  type: 'Normal' | 'VIP';

  @IsNumber()
  categoryId: number;

  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ServicePriceOptionDTO)
  priceOptions: ServicePriceOptionDTO[];
}

export class ServicePriceOptionDTO {
  @IsString()
  duration: string;

  @IsNumber()
  price: number;

  @IsEnum(['Hourly', 'Weekly', 'Monthly'])
  type: 'Hourly' | 'Weekly' | 'Monthly';
}
