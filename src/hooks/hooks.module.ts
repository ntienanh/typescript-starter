import { Module } from '@nestjs/common';
import { HooksService } from './hooks.service';
import { HooksController } from './hooks.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [HooksController],
  providers: [HooksService, PrismaService],
})
export class HooksModule {}
