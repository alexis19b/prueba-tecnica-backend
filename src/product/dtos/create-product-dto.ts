import { IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

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



  @IsString()
  @MinLength(8)
  @MaxLength(128)
  password: string;

}