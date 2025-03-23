import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateFoodScheduleDto,
  UpdateFoodScheduleDto,
} from './dto/food-schedule.dto';
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  subMonths,
  addMonths,
} from 'date-fns';

@Injectable()
export class FoodScheduleService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateFoodScheduleDto) {
    const existingSchedule = await this.prisma.foodSchedule.findFirst({
      where: { date: new Date(data.date) },
    });

    if (existingSchedule) {
      throw new Error('FoodSchedule already exists for this date');
    }

    return this.prisma.foodSchedule.create({
      data: {
        date: new Date(data.date),
        foodId: data.foodId,
      },
    });
  }

  async findAll(date?: string) {
    // ✅ Chuyển đổi date (YYYY-MM-DD) thành đầu tháng hiện tại
    let parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      throw new Error('Invalid date format. Use YYYY-MM-DD');
    }

    // ✅ Xác định phạm vi từ tháng trước -> tháng hiện tại -> tháng sau
    const startDate = startOfMonth(subMonths(parsedDate, 1)); // Đầu tháng trước
    const endDate = endOfMonth(addMonths(parsedDate, 1)); // Cuối tháng sau

    // ✅ Lấy tất cả FoodSchedule trong khoảng 3 tháng
    const foodSchedules = await this.prisma.foodSchedule.findMany({
      where: {
        date: { gte: startDate, lte: endDate },
      },
      select: {
        id: true,
        date: true,
        foodId: true,
        food: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    // ✅ Tạo danh sách ngày từ tháng trước đến tháng sau
    const daysInRange = eachDayOfInterval({ start: startDate, end: endDate });

    // ✅ Ghép dữ liệu từ DB với danh sách ngày
    const result = daysInRange.map((day) => {
      const formattedDate = format(day, 'yyyy-MM-dd');
      const found = foodSchedules.find((fs) =>
        fs.date.toISOString().startsWith(formattedDate),
      );

      return found || { date: day, food: null }; // Nếu không có thì food = null
    });

    return result;
  }

  async findOne(id: string) {
    return this.prisma.foodSchedule.findUnique({
      where: { id },
      include: { food: true },
    });
  }

  async update(date: string, foodId: string | null) {
    const existingSchedule = await this.prisma.foodSchedule.findFirst({
      where: { date: new Date(date) },
    });

    if (!existingSchedule) {
      throw new Error('FoodSchedule not found for this date');
    }

    if (foodId) {
      const foodExists = await this.prisma.food.findUnique({
        where: { id: foodId },
      });
      if (!foodExists) {
        throw new Error('Food not found');
      }
    }

    return this.prisma.foodSchedule.update({
      where: { id: existingSchedule.id },
      data: { foodId },
    });
  }

  async removeByDate(date: string) {
    return this.prisma.foodSchedule.deleteMany({
      where: { date: new Date(date) },
    });
  }

  async resetFoodSchedule() {
    await this.prisma.foodSchedule.deleteMany({});
    return { message: 'All food schedules have been deleted' };
  }
}
