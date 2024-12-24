import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Coffee } from './entity/coffee.entity';
import { Repository } from 'typeorm';
import { Flavor } from './entity/flavor.entity';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private coffeeRepository: Repository<Coffee>,
    @InjectRepository(Flavor)
    private flavorRepository: Repository<Flavor>,
  ) {}
  getAll() {
    return this.coffeeRepository.find({
      relations: ['flavors'],
    });
  }

  async getOne(id: string) {
    const coffee = await this.coffeeRepository.findOne({
      where: { id: Number(id) },
    });
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return coffee;
  }

  async create(body) {
    const flavors = await Promise.all(
      body.flavors.map((name) => this.preloadFlavorByName(name)),
    );
    const newCoffee = this.coffeeRepository.create({
      ...body,
      flavors,
    });
    return this.coffeeRepository.save(newCoffee);
  }

  async update(id: string, body) {
    const flavors =
      body.flavors &&
      body.flavors.map((name) => this.preloadFlavorByName(name));
    const coffee = await this.coffeeRepository.preload({
      id: +id,
      ...body,
      flavors,
    });
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return this.coffeeRepository.save(coffee);
  }

  async remove(id: string) {
    const coffee = await this.getOne(id);
    return this.coffeeRepository.remove(coffee);
  }

  private async preloadFlavorByName(name: string) {
    const existingFlavor = await this.flavorRepository.findOne({
      where: { name },
    });
    if (existingFlavor) {
      return existingFlavor;
    }
    return this.flavorRepository.create({ name });
  }
}
