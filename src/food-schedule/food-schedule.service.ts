import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateFoodScheduleDto,
  UpdateFoodScheduleDto,
} from './dto/food-schedule.dto';
import { startOfMonth, endOfMonth, eachDayOfInterval, format } from 'date-fns';

@Injectable()
export class FoodScheduleService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateFoodScheduleDto) {
    return this.prisma.foodSchedule.create({
      data: {
        date: new Date(data.date),
        foodId: data.foodId,
      },
    });
  }

  async findAll(date?: string) {
    // ✅ Chuyển đổi date (YYYY-MM-DD) thành đầu và cuối tháng
    let parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      throw new Error('Invalid date format. Use YYYY-MM-DD');
    }

    const startDate = startOfMonth(parsedDate);
    const endDate = endOfMonth(parsedDate);

    // ✅ Lấy tất cả FoodSchedule trong tháng
    const foodSchedules = await this.prisma.foodSchedule.findMany({
      where: {
        date: { gte: startDate, lte: endDate },
      },
      select: {
        id: true,
        date: true,
        foodId: true, // ✅ Đảm bảo lấy `foodId`
        food: true, // ✅ Prisma sẽ tự bỏ `food` nếu `foodId = NULL`
        createdAt: true,
        updatedAt: true,
      },
    });

    // ✅ Tạo danh sách ngày trong tháng
    const daysInMonth = eachDayOfInterval({ start: startDate, end: endDate });

    // ✅ Ghép data từ DB với danh sách ngày
    const result = daysInMonth.map((day) => {
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
      where: { date: new Date(date) }, // 🔥 Tìm theo ngày
    });

    if (!existingSchedule) {
      throw new Error('FoodSchedule not found for this date');
    }

    // Nếu foodId không null, kiểm tra xem food có tồn tại không
    if (foodId) {
      const foodExists = await this.prisma.food.findUnique({
        where: { id: foodId },
      });
      if (!foodExists) {
        throw new Error('Food not found');
      }
    }

    return this.prisma.foodSchedule.update({
      where: { id: existingSchedule.id }, // Cập nhật theo `id` tìm được
      data: { foodId }, // ✅ Giữ nguyên `foodId`, không ép null
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
