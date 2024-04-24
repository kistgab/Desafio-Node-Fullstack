import { PlaceType, Prisma } from '@prisma/client';

export function mockPlaceModelData(): Prisma.PlaceCreateInput {
  return {
    city: 'city',
    id: 'any_id',
    name: 'name',
    state: 'state',
    contact_email: 'contact_email',
    type: PlaceType.Stadium,
    cpnj: 'cpnj',
    createdAt: new Date(),
    contact_phone: 'contact_phone',
  };
}
