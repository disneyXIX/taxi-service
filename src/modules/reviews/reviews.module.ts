import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { Trip } from '../trips/entities/trip.entity';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';

@Module({
  imports: [TypeOrmModule.forFeature([Review, Trip])],
  controllers: [ReviewsController],
  providers: [ReviewsService],
})
export class ReviewsModule {}
