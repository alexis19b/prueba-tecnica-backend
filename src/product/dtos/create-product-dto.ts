import { IsNumber, IsObject, IsOptional, IsString, MaxLength } from "class-validator";
import { CategoryEntity } from "src/category/entities";

export class CreateProductDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  name: string;

  @IsOptional()
  @IsNumber()
  stock: number;

  @IsOptional()
  @IsNumber()
  price: number;


  @IsOptional()
  @IsString()
  @MaxLength(255)
  photo: string;

  @IsNumber()
  readonly category: Partial<CategoryEntity>

}