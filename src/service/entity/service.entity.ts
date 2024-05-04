import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Category } from './../../category/entity/category.entity';

@Entity()
export class Service {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: 'Normal' | 'VIP';

  @ManyToOne(() => Category, (category) => category.services)
  category: Category;

  @OneToMany(() => ServicePriceOption, (priceOption) => priceOption.service)
  priceOptions: ServicePriceOption[];
}

@Entity()
export class ServicePriceOption {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    duration: string;

    @Column()
    price: number;

    @Column()
    type: 'Hourly' | 'Weekly' | 'Monthly';

    @ManyToOne(() => Service, service => service.priceOptions)
    service: Service;
}

