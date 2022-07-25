import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto, EditCategoryDto } from './dtos';
import { CategoryEntity } from './entities';

@Injectable()
export class CategoryService {

  constructor(@InjectRepository(CategoryEntity) private readonly categoryRepository: Repository<CategoryEntity>) { }

  async getCategories(): Promise<CategoryEntity[]> {
    return await this.categoryRepository.find({ relations: ['products'] })
  }
  async getCategory(id: number) {
    const category = await this.categoryRepository.findOne(id, { relations: ['products'] })
    if (!category) throw new NotFoundException('Categoria no encontrada')
    return category;
  }
  async createCategory(dto: CreateCategoryDto): Promise<CategoryEntity> {
    const newCategory = await this.categoryRepository.create(dto);
    const category = await this.categoryRepository.save(newCategory);
    return category;
  }
  async editCategory(id: number, dto: EditCategoryDto) {
    const category = await this.getCategory(id);
    const categoryEdited = Object.assign(category, dto);
    return await this.categoryRepository.save(categoryEdited)
  }
  async removeCategory(id: number) {
    const category = await this.categoryRepository.findOne(id);
    if (!category) throw new NotFoundException('Categoria no existe por id')
    return await this.categoryRepository.delete(id)
  }

}
