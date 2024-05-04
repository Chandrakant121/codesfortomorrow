import { CategoryService } from './category.service';
import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @UseGuards(AuthGuard)
  @UsePipes(ValidationPipe)
  async findAll() {
    return this.categoryService.findAll();
  }

  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(ValidationPipe)
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Patch('update/:categoryId')
  @UseGuards(AuthGuard)
  @UsePipes(ValidationPipe)
  async update(
    @Param('categoryId') categoryId: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(categoryId, updateCategoryDto);
  }

  @Delete('delete/:categoryId')
  @UseGuards(AuthGuard)
  @UsePipes(ValidationPipe)
  async remove(@Param('categoryId') categoryId: number) {
    return this.categoryService.remove(categoryId);
  }
}
