export class CreateFoodScheduleDto {
  date: Date;
  foodId: string;
}

// update-food-schedule.dto.ts
export class UpdateFoodScheduleDto {
  date?: Date;
  foodId?: string;
}
