import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FoodService {
  constructor(private prisma: PrismaService) {}

  async create(data: {
    name: string;
    description: string;
    minCalories?: number;
    maxCalories?: number;
    imageUrl?: string;
  }) {
    return this.prisma.food.create({
      data: {
        name: data.name,
        description: data.description,
        minCalories: data.minCalories ? Number(data.minCalories) : null, // Chuyển về số
        maxCalories: data.maxCalories ? Number(data.maxCalories) : null, // Chuyển về số
        image: data.imageUrl,
      },
    });
  }

  async findAll(page: number = 1, pageSize: number = 10) {
    const skip = (page - 1) * pageSize;

    const [foods, total] = await this.prisma.$transaction([
      this.prisma.food.findMany({
        skip,
        take: pageSize,
        select: {
          id: true,
          name: true,
          description: true, // Đảm bảo có field này nếu muốn truy vấn
          image: true,
          minCalories: true,
          maxCalories: true,
          ingredients: {
            select: {
              ingredient: {
                select: { id: true, name: true },
              },
            },
          },
        },
      }),
      this.prisma.food.count(),
    ]);

    return {
      data: foods,
      meta: {
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
      },
    };
  }

  async addIngredient(foodId: string, ingredientId: string) {
    return this.prisma.foodIngredient.create({
      data: { foodId, ingredientId },
    });
  }

  async clearAll() {
    await this.prisma.foodIngredient.deleteMany(); // Xóa liên kết ingredients trước nếu có ràng buộc khóa ngoại
    await this.prisma.food.deleteMany(); // Xóa toàn bộ food

    return { message: 'All food records have been deleted' };
  }
}
