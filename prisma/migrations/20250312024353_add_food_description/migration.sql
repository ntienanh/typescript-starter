-- AlterTable
ALTER TABLE "Food" ADD COLUMN     "description" TEXT,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "maxCalories" INTEGER DEFAULT 100,
ADD COLUMN     "minCalories" INTEGER DEFAULT 0;
