import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ServiceService } from './service.service';
import { Service } from './entity/service.entity';
import { ServiceDTO } from './dto/service.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('services')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Get()
  @UseGuards(AuthGuard)
  findAll(): Promise<Service[]> {
    return this.serviceService.findAll();
  }

  @Get(':categoryId/service')
  @UseGuards(AuthGuard)
  async findAllByCategoryId(@Param('categoryId') categoryId: number) {
    return this.serviceService.findAllByCategoryId(categoryId);
  }

  @Post(':categoryId')
  @UseGuards(AuthGuard)
  async createCategory(
    @Param('categoryId') categoryId: number,
    @Body() serviceDTO: ServiceDTO,
  ) {
    return this.serviceService.createCategory(categoryId, serviceDTO);
  }

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() serviceDTO: ServiceDTO): Promise<Service> {
    return this.serviceService.create(serviceDTO);
  }

  @Patch('update/:id')
  @UseGuards(AuthGuard)
  update(@Param() { id }, @Body() serviceDTO: ServiceDTO): Promise<Service> {
    return this.serviceService.update(id, serviceDTO);
  }

  @Patch(':serviceId/:categoryId')
  @UseGuards(AuthGuard)
  async updateByServiceCatId(
    @Param('categoryId') categoryId: number,
    @Param('serviceId') serviceId: number,
    @Body() serviceDTO: ServiceDTO,
  ): Promise<Service> {
    return this.serviceService.updateByServiceCatId(
      categoryId,
      serviceId,
      serviceDTO,
    );
  }

  @Delete(':serviceId')
  @UseGuards(AuthGuard)
  async removeServicesFromCat(
    @Param('categoryId') categoryId: number,
    @Param('serviceId') serviceId: number,
  ): Promise<void> {
    return this.serviceService.removeServicesFromCat(categoryId, serviceId);
  }

  @Delete('delete/:id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: number): Promise<void> {
    return this.serviceService.remove(id);
  }
}
