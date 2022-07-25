import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto, EditCategoryDto } from './dtos';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @Get()
  async getMany() {
    const data = await this.categoryService.getCategories()
    return { data }
  }

  @Get(':id')
  async getOne(@Param('id') id: number) {
    return await this.categoryService.getCategory(id)
  }
  @Post()
  async createOne(@Body() dto: CreateCategoryDto) {
    const data = await this.categoryService.createCategory(dto)
    return {
      message: 'Categoria Creada con Exito!',
      data
    }
  }
  @Put(':id')
  async editOne(@Param('id') id: number, @Body() dto: EditCategoryDto) {
    const data = await this.categoryService.editCategory(id, dto)
    return {
      message: 'Categoria Editada con exito',
      data
    }
  }
  @Delete(':id')
  async removeOne(@Param('id') id: number) {

    const data = await this.categoryService.removeCategory(id)
    return {
      message: 'Categoria eliminada con exito',
      data
    }
  }
}
