import { Module } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from './entity/coffee.entity';
import { Flavor } from './entity/flavor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavor])],
  controllers: [CoffeesController],
  providers: [CoffeesService],
  exports: [TypeOrmModule],
})
export class CoffeesModule {}
