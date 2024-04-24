import { Module } from '@nestjs/common';
import { PlacesController } from '@presentation/place/controllers/places.controller';

@Module({
  imports: [],
  controllers: [PlacesController],
  providers: [],
})
export class AppModule {}
