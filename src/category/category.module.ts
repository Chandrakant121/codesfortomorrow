import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryService } from './category.service';
import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { Category } from './entity/category.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [CategoryController],
  providers: [CategoryService, JwtService],
})
export class CategoryModule {}
