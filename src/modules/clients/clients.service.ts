import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './entities/client.entity';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private readonly clientsRepository: Repository<Client>,
  ) {}

  async create(dto: CreateClientDto): Promise<Client> {
    const entity = this.clientsRepository.create({
      firstName: dto.firstName,
      lastName: dto.lastName,
      birthDate: dto.birthDate ?? null,
      email: dto.email ?? null,
      lastday: dto.lastday ?? null
    });
    return await this.clientsRepository.save(entity);
  }

  async findAll(): Promise<Client[]> {
    return await this.clientsRepository.find({ order: { clientId: 'DESC' } });
  }

  async findOne(clientId: number): Promise<Client> {
    const client = await this.clientsRepository.findOne({ where: { clientId } });
    if (!client) throw new NotFoundException('Client not found');
    return client;
  }

  async update(clientId: number, dto: UpdateClientDto): Promise<Client> {
    const client = await this.findOne(clientId);
    const merged = this.clientsRepository.merge(client, {
      ...(dto.firstName !== undefined ? { firstName: dto.firstName } : {}),
      ...(dto.lastName !== undefined ? { lastName: dto.lastName } : {}),
      ...(dto.birthDate !== undefined ? { birthDate: dto.birthDate } : {}),
      ...(dto.email !== undefined ? { email: dto.email } : {}),
    });
    return await this.clientsRepository.save(merged);
  }

  async remove(clientId: number): Promise<void> {
    const result = await this.clientsRepository.delete({ clientId });
    if (!result.affected) throw new NotFoundException('Client not found');
  }
}
