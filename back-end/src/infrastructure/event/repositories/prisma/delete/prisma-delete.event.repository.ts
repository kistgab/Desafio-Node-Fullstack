import { DeleteEventRepository } from '@domain/event/repositories/delete.event.repository';
import { PrismaClient } from '@prisma/client';

export class PrismaDeleteEventRepository implements DeleteEventRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async delete(id: string): Promise<void> {
    await this.prisma.event.delete({ where: { id } });
  }
}
