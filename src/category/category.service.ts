import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto, EditCategoryDto } from './dtos';
import { CategoryEntity } from './entities';

@Injectable()
export class CategoryService {

  constructor(@InjectRepository(CategoryEntity) private readonly categoryRepository: Repository<CategoryEntity>) { }

  async getMany(): Promise<CategoryEntity[]> {
    return await this.categoryRepository.find({ relations: ['products'] })
  }
  async getOne(id: number) {
    const category = await this.categoryRepository.findOne(id, { relations: ['products'] })
    if (!category) throw new NotFoundException('Categoria no encontrada')
    return category;
  }
  async createOne(dto: CreateCategoryDto): Promise<CategoryEntity> {
    const newCategory = await this.categoryRepository.create(dto);
    const category = await this.categoryRepository.save(newCategory);
    return category;
  }
  async editOne(id: number, dto: EditCategoryDto) {
    const category = await this.categoryRepository.findOne(id);
    if (!category) throw new NotFoundException('Categoria no existe por id')
    const categoryEdited = await this.categoryRepository.update(id, dto);
    return categoryEdited;
  }
  async removeOne(id: number) {
    const category = await this.categoryRepository.findOne(id);
    if (!category) throw new NotFoundException('Categoria no existe por id')
    return await this.categoryRepository.delete(id)
  }

}
