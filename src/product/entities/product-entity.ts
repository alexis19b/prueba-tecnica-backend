
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { CategoryEntity } from 'src/category/entities';

@Entity('product')
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'numeric' })
  stock: number;

  @Column({ type: 'numeric' })
  price: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  photo: string;

  @ManyToOne((type) => CategoryEntity, (category) => category.products, { cascade: true })
  @JoinColumn({ name: "category_id" })
  category: CategoryEntity;
}
