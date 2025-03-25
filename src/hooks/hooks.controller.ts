import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HooksService } from './hooks.service';
import { CreateHookDto, UpdateHookDto } from './dto/hooks.dto';

@Controller('hooks')
export class HooksController {
  constructor(private readonly hooksService: HooksService) {}

  @Post()
  create(@Body() createHookDto: CreateHookDto) {
    return this.hooksService.create(createHookDto);
  }

  @Get()
  findAll() {
    return this.hooksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hooksService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHookDto: UpdateHookDto) {
    return this.hooksService.update(id, updateHookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hooksService.remove(id);
  }
}
