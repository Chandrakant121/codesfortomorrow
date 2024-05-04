import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from './entity/service.entity';
import { ServiceDTO, ServicePriceOptionDTO } from './dto/service.dto';
import { Category } from 'src/category/entity/category.entity';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async findAll(): Promise<Service[]> {
    return this.serviceRepository.find({
      order: {
        id: 'ASC',
      },
    });
  }

  async findAllByCategoryId(id: number): Promise<Service[]> {
    return this.serviceRepository.find({ where: { id } });
  }

  async createCategory(id, serviceDTO: ServiceDTO) {
    const category = await this.categoryRepository.findOne({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    // Created a new service entity
    const newService = new Service();
    newService.name = serviceDTO.name;
    newService.type = serviceDTO.type;
    newService.category = category;

    // Save the new service entity in the database
    return this.serviceRepository.save(newService);
  }

  async create(serviceDTO: ServiceDTO): Promise<Service> {
    const service = this.serviceRepository.create(serviceDTO);
    return this.serviceRepository.save(service);
  }

  async update(id, serviceDTO: ServiceDTO) {
    const service = await this.serviceRepository.findOne({ where: { id } });
    if (!service) {
      throw new NotFoundException('Service not found');
    }
    if (serviceDTO.name) {
      service.name = serviceDTO.name;
    }
    if (serviceDTO.type) {
      service.type = serviceDTO.type;
    }
    if (serviceDTO.priceOptions) {
      serviceDTO.priceOptions = serviceDTO.priceOptions.map(
        (dto) =>
          ({
            duration: dto.duration,
            price: dto.price,
            type: dto.type,
          } as ServicePriceOptionDTO),
      );
    }
    return this.serviceRepository.save(service);
  }

  async removeServicesFromCat(categoryId: number, serviceId: number) {
    const result = await this.serviceRepository.delete({
      id: serviceId,
    });
    if (result.affected === 0) {
      throw new NotFoundException(
        `Service with ID ${serviceId} not found in category with ID ${categoryId}`,
      );
    }
  }

  async updateByServiceCatId(
    categoryId: number,
    serviceId: number,
    serviceDTO: ServiceDTO,
  ): Promise<Service> {
    let service = await this.serviceRepository.findOne({
      where: { id: serviceId },
    });

    let category = await this.serviceRepository.findOne({
      where: { id: categoryId },
    });
    if (!service && !category) {
      throw new NotFoundException(
        `Service with ID ${serviceId} not found in category with ID ${categoryId}`,
      );
    }
    if (serviceDTO.priceOptions) {
      serviceDTO.priceOptions = serviceDTO.priceOptions.map(
        (dto) =>
          ({
            duration: dto.duration,
            price: dto.price,
            type: dto.type,
          } as ServicePriceOptionDTO),
      );
    }
    let data = { ...service, ...serviceDTO };
    return this.serviceRepository.save(data);
  }

  async remove(id: number): Promise<void> {
    await this.serviceRepository.delete(id);
  }
}
