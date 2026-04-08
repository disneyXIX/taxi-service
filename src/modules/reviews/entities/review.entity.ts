import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Trip } from '../../trips/entities/trip.entity';

@Entity({ name: 'reviews' })
export class Review {
  @PrimaryGeneratedColumn({ name: 'review_id' })
  reviewId!: number;

  @Column({ name: 'trip_id', type: 'int' })
  tripId!: number;

  @Column({ type: 'int' })
  rating!: number;

  @Column({ type: 'text', nullable: true })
  comment!: string | null;

  @ManyToOne(() => Trip, (trip) => trip.reviews, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'trip_id', referencedColumnName: 'tripId' })
  trip!: Trip;
}
