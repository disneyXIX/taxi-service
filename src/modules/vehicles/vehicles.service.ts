import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(Vehicle)
    private readonly vehiclesRepository: Repository<Vehicle>,
  ) {}

  async create(dto: CreateVehicleDto): Promise<Vehicle> {
    const entity = this.vehiclesRepository.create({
      model: dto.model,
      type: dto.type,
    });
    return await this.vehiclesRepository.save(entity);
  }

  async findAll(): Promise<Vehicle[]> {
    return await this.vehiclesRepository.find({ order: { vehicleId: 'DESC' } });
  }

  async findOne(vehicleId: number): Promise<Vehicle> {
    const vehicle = await this.vehiclesRepository.findOne({ where: { vehicleId } });
    if (!vehicle) throw new NotFoundException('Vehicle not found');
    return vehicle;
  }

  async update(vehicleId: number, dto: UpdateVehicleDto): Promise<Vehicle> {
    const vehicle = await this.findOne(vehicleId);
    const merged = this.vehiclesRepository.merge(vehicle, dto);
    return await this.vehiclesRepository.save(merged);
  }

  async remove(vehicleId: number): Promise<void> {
    const result = await this.vehiclesRepository.delete({ vehicleId });
    if (!result.affected) throw new NotFoundException('Vehicle not found');
  }
}
