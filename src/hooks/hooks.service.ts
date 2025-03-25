import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateHookDto, UpdateHookDto } from './dto/hooks.dto';
import { Hook } from '@prisma/client';

@Injectable()
export class HooksService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateHookDto): Promise<Hook> {
    try {
      return await this.prisma.hook.create({ data });
    } catch (error) {
      throw new Error('Failed to create hook: ' + error.message);
    }
  }

  async findAll(): Promise<Hook[]> {
    try {
      return await this.prisma.hook.findMany();
    } catch (error) {
      throw new Error('Failed to retrieve hooks: ' + error.message);
    }
  }

  async findOne(id: string): Promise<Hook | null> {
    try {
      const hook = await this.prisma.hook.findUnique({ where: { id } });
      if (!hook) {
        throw new NotFoundException(`Hook with ID ${id} not found`);
      }
      return hook;
    } catch (error) {
      throw new Error('Failed to retrieve hook: ' + error.message);
    }
  }

  async update(id: string, data: UpdateHookDto): Promise<Hook> {
    try {
      return await this.prisma.hook.update({ where: { id }, data });
    } catch (error) {
      throw new Error('Failed to update hook: ' + error.message);
    }
  }

  async remove(id: string): Promise<Hook> {
    try {
      return await this.prisma.hook.delete({ where: { id } });
    } catch (error) {
      throw new Error('Failed to delete hook: ' + error.message);
    }
  }
}
