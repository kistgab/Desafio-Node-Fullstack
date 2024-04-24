import { Module } from '@nestjs/common';
import { EventsController } from '@presentation/events/controllers/events.controller';
import { PlacesController } from '@presentation/place/controllers/places.controller';

@Module({
  imports: [],
  controllers: [PlacesController, EventsController],
  providers: [],
})
export class AppModule {}
