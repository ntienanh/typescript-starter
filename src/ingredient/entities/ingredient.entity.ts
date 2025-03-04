import { Column, Entity, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Food } from '../../food/entities/food.entity';

@Entity()
export class Ingredient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ default: true })
  is_active: boolean; // Kiểm tra nguyên liệu có sẵn không
}
