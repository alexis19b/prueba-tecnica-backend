import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dtos';
import { ProductEntity } from './entities';
import { CategoryEntity } from 'src/category/entities';
import { EditProductDto } from './dtos/edit-product-dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity) private readonly productRepository: Repository<ProductEntity>,
    @InjectRepository(CategoryEntity) private readonly categoryRepository: Repository<CategoryEntity>

  ) { }

  async getProducts(): Promise<ProductEntity[]> {
    return await this.productRepository.find({ relations: ['category'] })
  }
  async getProduct(id: number): Promise<ProductEntity> {
    const product = await this.productRepository.findOne(id, { relations: ['category'] });
    if (!product) throw new NotFoundException('Producto no encontrado por ese id')
    return product;
  }
  async createProduct(dto: CreateProductDto): Promise<ProductEntity> {
    const category = await this.categoryRepository.findOne(dto.category);
    if (!category) throw new NotFoundException("Categoria del producto no exitste")
    const newProduct = new ProductEntity();
    newProduct.category = category;
    newProduct.name = dto.name;
    newProduct.photo = dto.photo;
    newProduct.price = dto.price;
    newProduct.stock = dto.stock;
    return await this.productRepository.save(newProduct);
  }
  async editProduct(id: number, dto: EditProductDto) {
    const product = await this.productRepository.findOne(id)
    if (!product) throw new NotFoundException("Producto no encontrado por id")
    const productEdited = await this.productRepository.update(id, dto)
    return productEdited;
  }
  async removeProduct(id: number) {
    const product = await this.productRepository.findOne(id);
    if (!product) throw new NotFoundException('Producto no existe por id')
    return await this.productRepository.delete(id)
  }

}
