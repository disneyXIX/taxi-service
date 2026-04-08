import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Driver } from '../../drivers/entities/driver.entity';
import { Client } from '../../clients/entities/client.entity';
import { Review } from '../../reviews/entities/review.entity';

@Entity({ name: 'trips' })
export class Trip {
  @PrimaryGeneratedColumn({ name: 'trip_id' })
  tripId!: number;

  @Column({ name: 'driver_id', type: 'int' })
  driverId!: number;

  @Column({ name: 'client_id', type: 'int' })
  clientId!: number;

  @ManyToOne(() => Driver, (driver) => driver.trips, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'driver_id', referencedColumnName: 'driverId' })
  driver!: Driver;

  @ManyToOne(() => Client, (client) => client.trips, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'client_id', referencedColumnName: 'clientId' })
  client!: Client;

  @OneToMany(() => Review, (review) => review.trip)
  reviews!: Review[];
}

