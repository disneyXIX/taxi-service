import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Trip } from '../../trips/entities/trip.entity';

@Entity({ name: 'clients' })
export class Client {
  @PrimaryGeneratedColumn({ name: 'client_id' })
  clientId!: number;

  @Column({ name: 'first_name', type: 'varchar', length: 255 })
  firstName!: string;

  @Column({ name: 'last_name', type: 'varchar', length: 255 })
  lastName!: string;

  @Column({ name: 'birth_date', type: 'date', nullable: true })
  birthDate!: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  email!: string | null;

  @OneToMany(() => Trip, (trip) => trip.client)
  trips!: Trip[];
}
