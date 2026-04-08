import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Driver } from './entities/driver.entity';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';

@Injectable()
export class DriversService {
  constructor(
    @InjectRepository(Driver)
    private readonly driversRepository: Repository<Driver>,
  ) {}

  async create(dto: CreateDriverDto): Promise<Driver> {
    const entity = this.driversRepository.create({
      firstName: dto.firstName,
      lastName: dto.lastName,
      birthDate: dto.birthDate ?? null,
      email: dto.email ?? null,
      vehicleId: dto.vehicleId ?? null,
    });
    return await this.driversRepository.save(entity);
  }

  async findAll(): Promise<Driver[]> {
    return await this.driversRepository.find({
      order: { driverId: 'DESC' },
      relations: ['vehicle'],
    });
  }

  async findOne(driverId: number): Promise<Driver> {
    const driver = await this.driversRepository.findOne({
      where: { driverId },
      relations: ['vehicle'],
    });
    if (!driver) throw new NotFoundException('Driver not found');
    return driver;
  }

  async update(driverId: number, dto: UpdateDriverDto): Promise<Driver> {
    const driver = await this.findOne(driverId);
    const merged = this.driversRepository.merge(driver, {
      ...(dto.firstName !== undefined ? { firstName: dto.firstName } : {}),
      ...(dto.lastName !== undefined ? { lastName: dto.lastName } : {}),
      ...(dto.birthDate !== undefined ? { birthDate: dto.birthDate } : {}),
      ...(dto.email !== undefined ? { email: dto.email } : {}),
      ...(dto.vehicleId !== undefined ? { vehicleId: dto.vehicleId } : {}),
    });
    return await this.driversRepository.save(merged);
  }

  async remove(driverId: number): Promise<void> {
    const result = await this.driversRepository.delete({ driverId });
    if (!result.affected) throw new NotFoundException('Driver not found');
  }
}
