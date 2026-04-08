import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Vehicle } from '../../vehicles/entities/vehicle.entity';
import { Trip } from '../../trips/entities/trip.entity';

@Entity({ name: 'drivers' })
export class Driver {
  @PrimaryGeneratedColumn({ name: 'driver_id' })
  driverId!: number;

  @Column({ name: 'first_name', type: 'varchar', length: 255 })
  firstName!: string;

  @Column({ name: 'last_name', type: 'varchar', length: 255 })
  lastName!: string;

  @Column({ name: 'birth_date', type: 'date', nullable: true })
  birthDate!: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  email!: string | null;

  @Column({ name: 'vehicle_id', type: 'int', nullable: true })
  vehicleId!: number | null;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.drivers, { nullable: true })
  @JoinColumn({ name: 'vehicle_id', referencedColumnName: 'vehicleId' })
  vehicle!: Vehicle | null;

  @OneToMany(() => Trip, (trip) => trip.driver)
  trips!: Trip[];
}
