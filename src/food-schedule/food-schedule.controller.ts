import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { FoodScheduleService } from './food-schedule.service';
import {
  CreateFoodScheduleDto,
  UpdateFoodScheduleDto,
} from './dto/food-schedule.dto';

@Controller('food-schedule')
export class FoodScheduleController {
  constructor(private readonly foodScheduleService: FoodScheduleService) {}

  @Post()
  create(@Body() createFoodScheduleDto: CreateFoodScheduleDto) {
    return this.foodScheduleService.create(createFoodScheduleDto);
  }

  @Get()
  findAll(@Query('date') date?: string) {
    return this.foodScheduleService.findAll(date);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.foodScheduleService.findOne(id);
  }

  @Put()
  async update(@Body() data: { date: string; foodId: string | null }) {
    return this.foodScheduleService.update(data.date, data.foodId);
  }

  @Delete()
  async removeByDate(@Query('date') date: string) {
    return this.foodScheduleService.removeByDate(date);
  }

  @Post('reset')
  async resetFoodSchedule() {
    return this.foodScheduleService.resetFoodSchedule();
  }
}
