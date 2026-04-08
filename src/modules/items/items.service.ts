import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entities/item.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemsRepository: Repository<Item>,
  ) {}

  async create(createItemDto: CreateItemDto): Promise<Item> {
    const entity = this.itemsRepository.create({
      name: createItemDto.name,
      description: createItemDto.description ?? null,
      price: createItemDto.price,
    });
    return await this.itemsRepository.save(entity);
  }

  async findAll(): Promise<Item[]> {
    return await this.itemsRepository.find({
      order: { id: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Item> {
    const item = await this.itemsRepository.findOne({ where: { id } });
    if (!item) throw new NotFoundException('Item not found');
    return item;
  }

  async update(id: number, updateItemDto: UpdateItemDto): Promise<Item> {
    const item = await this.findOne(id);
    const merged = this.itemsRepository.merge(item, {
      name: updateItemDto.name ?? item.name,
      description:
        updateItemDto.description === undefined
          ? item.description
          : updateItemDto.description,
      price: updateItemDto.price ?? item.price,
    });
    return await this.itemsRepository.save(merged);
  }

  async remove(id: number): Promise<void> {
    const result = await this.itemsRepository.delete({ id });
    if (!result.affected) throw new NotFoundException('Item not found');
  }
}