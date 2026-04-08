import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Trip } from './entities/trip.entity';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';

@Injectable()
export class TripsService {
  constructor(
    @InjectRepository(Trip)
    private readonly tripsRepository: Repository<Trip>,
  ) {}

  async create(dto: CreateTripDto): Promise<Trip> {
    const entity = this.tripsRepository.create({
      driverId: dto.driverId,
      clientId: dto.clientId,
    });
    return await this.tripsRepository.save(entity);
  }

  async findAll(): Promise<Trip[]> {
    return await this.tripsRepository.find({
      order: { tripId: 'DESC' },
      relations: ['driver', 'client', 'reviews'],
    });
  }

  async findOne(tripId: number): Promise<Trip> {
    const trip = await this.tripsRepository.findOne({
      where: { tripId },
      relations: ['driver', 'client', 'reviews'],
    });
    if (!trip) throw new NotFoundException('Trip not found');
    return trip;
  }

  async update(tripId: number, dto: UpdateTripDto): Promise<Trip> {
    const trip = await this.findOne(tripId);
    const merged = this.tripsRepository.merge(trip, {
      ...(dto.driverId !== undefined ? { driverId: dto.driverId } : {}),
      ...(dto.clientId !== undefined ? { clientId: dto.clientId } : {}),
    });
    return await this.tripsRepository.save(merged);
  }

  async remove(tripId: number): Promise<void> {
    const result = await this.tripsRepository.delete({ tripId });
    if (!result.affected) throw new NotFoundException('Trip not found');
  }
}
