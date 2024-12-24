import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { CoffeesService } from './coffees.service';

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}
  @Get()
  getAll() {
    return this.coffeesService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.coffeesService.getOne(id);
  }

  @Post()
  create(@Body() body) {
    return this.coffeesService.create(body);
  }
}
