import { EventFilters } from '@domain/event/filters/filters.event';

export interface CountAllEventsRepository {
  countAll(filters?: EventFilters): Promise<number>;
}
