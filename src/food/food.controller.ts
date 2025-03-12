import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FoodService } from './food.service';
import { CreateFoodDto } from './dto/food.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.config';
import {} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import { Express } from 'express';

@Controller('food')
export class FoodController {
  constructor(
    private readonly foodService: FoodService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Post()
  create(@Body() createFoodDto: CreateFoodDto) {
    return this.foodService.create(createFoodDto);
  }

  @Get()
  findAll(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
  ) {
    return this.foodService.findAll(Number(page), Number(pageSize));
  }

  @Post(':foodId/ingredient/:ingredientId')
  addIngredient(
    @Param('foodId') foodId: string,
    @Param('ingredientId') ingredientId: string,
  ) {
    return this.foodService.addIngredient(foodId, ingredientId);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('image')) // 'image' là key trong Postman
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new Error('No file provided');
    }

    console.log('Received file:', file);
    const imageUrl = await this.cloudinaryService.uploadImage(file);

    return { url: imageUrl };
  }
}
