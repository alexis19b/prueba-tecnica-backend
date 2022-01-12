
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { ProductEntity } from "src/product/entities";

@Entity('category')
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @OneToMany(type => ProductEntity, product => product.category)
  products: ProductEntity[];
}