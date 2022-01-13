
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { ProductEntity } from "src/product/entities";

@Entity('category')
export class CategoryEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @OneToMany(() => ProductEntity, product => product.category)
  products: ProductEntity[];
}