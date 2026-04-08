import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Driver } from '../../drivers/entities/driver.entity';

@Entity({ name: 'vehicles' })
export class Vehicle {
  @PrimaryGeneratedColumn({ name: 'vehicle_id' })
  vehicleId!: number;

  @Column({ type: 'varchar', length: 255 })
  model!: string;

  @Column({ type: 'varchar', length: 255 })
  type!: string;

  @OneToMany(() => Driver, (driver) => driver.vehicle)
  drivers!: Driver[];
}
