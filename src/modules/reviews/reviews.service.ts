import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Trip } from '../trips/entities/trip.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewsRepository: Repository<Review>,
    @InjectRepository(Trip)
    private readonly tripsRepository: Repository<Trip>,
  ) {}

  async create(dto: CreateReviewDto): Promise<Review> {
    const tripExists = await this.tripsRepository.exist({ where: { tripId: dto.tripId } });
    if (!tripExists) {
      throw new BadRequestException(`Trip with id=${dto.tripId} does not exist`);
    }

    const entity = this.reviewsRepository.create({
      tripId: dto.tripId,
      rating: dto.rating,
      comment: dto.comment ?? null,
    });
    return await this.reviewsRepository.save(entity);
  }

  async findAll(): Promise<Review[]> {
    return await this.reviewsRepository.find({
      order: { reviewId: 'DESC' },
      relations: ['trip'],
    });
  }

  async findOne(reviewId: number): Promise<Review> {
    const review = await this.reviewsRepository.findOne({
      where: { reviewId },
      relations: ['trip'],
    });
    if (!review) throw new NotFoundException('Review not found');
    return review;
  }

  async update(reviewId: number, dto: UpdateReviewDto): Promise<Review> {
    const review = await this.findOne(reviewId);

    if (dto.tripId !== undefined) {
      const tripExists = await this.tripsRepository.exist({ where: { tripId: dto.tripId } });
      if (!tripExists) {
        throw new BadRequestException(`Trip with id=${dto.tripId} does not exist`);
      }
    }

    const merged = this.reviewsRepository.merge(review, {
      ...(dto.tripId !== undefined ? { tripId: dto.tripId } : {}),
      ...(dto.rating !== undefined ? { rating: dto.rating } : {}),
      ...(dto.comment !== undefined ? { comment: dto.comment } : {}),
    });
    return await this.reviewsRepository.save(merged);
  }

  async remove(reviewId: number): Promise<void> {
    const result = await this.reviewsRepository.delete({ reviewId });
    if (!result.affected) throw new NotFoundException('Review not found');
  }
}
