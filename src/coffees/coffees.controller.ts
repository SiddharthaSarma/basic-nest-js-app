import { Body, Controller, Get, Post, Param, Query } from '@nestjs/common';
import { CoffeesService } from './coffees.service';

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}
  @Get()
  getAll(@Query() paginationQuery) {
    return this.coffeesService.getAll(paginationQuery);
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
