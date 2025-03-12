import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class CreateFoodDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsInt()
  @Min(0, { message: 'minCalories must be at least 0' })
  minCalories: number;

  @IsInt()
  @Min(0, { message: 'maxCalories must be at least 0' })
  maxCalories: number;
}

export class AddIngredientDto {
  ingredientId: string;
}
