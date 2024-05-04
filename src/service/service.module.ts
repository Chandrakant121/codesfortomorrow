import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceController } from './service.controller';
import { ServiceService } from './service.service';
import { Module } from '@nestjs/common';
import { Service } from './entity/service.entity';
import { Category } from 'src/category/entity/category.entity';
import { CategoryService } from 'src/category/category.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Service])],
  controllers: [ServiceController],
  providers: [ServiceService, CategoryService, JwtService],
})
export class ServiceModule {}
