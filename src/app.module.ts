import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffee.module';
import { CoffeesController } from './coffees/coffees.controller';
import { CoffeesService } from './coffees/coffees.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from './coffees/entity/coffee.entity';

@Module({
  imports: [
    CoffeesModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'pass123',
      database: 'postgres',
      entities: [Coffee],
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  controllers: [AppController, CoffeesController],
  providers: [AppService, CoffeesService],
})
export class AppModule {}
