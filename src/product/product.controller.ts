import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateProductDto } from './dtos';
import { EditProductDto } from './dtos/edit-product-dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Get()
  async getProducts() {
    const products = await this.productService.getProducts()
    return { products }
  }
  @Get(':id')
  async getProduct(@Param('id') id: number) {
    const product = await this.productService.getProduct(id)
    return { product }
  }
  @Post()
  async createProduct(@Body() dto: CreateProductDto) {
    const product = await this.productService.createProduct(dto)
    return {
      message: 'Producto creado con exito',
      product
    }
  }
  @Put(':id')
  async editProduct(@Param('id') id: number, @Body() dto: EditProductDto) {
    const data = await this.productService.editProduct(id, dto)
    return {
      message: 'Producto Editado con exito',
      data
    }
  }
  @Delete(':id')
  async removeProduct(@Param('id') id: number) {
    const data = await this.productService.removeProduct(id)
    return {
      message: 'Producto Eliminado',
      data
    }
  }

}
