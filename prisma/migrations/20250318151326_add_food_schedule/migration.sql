-- CreateTable
CREATE TABLE "FoodSchedule" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "foodId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FoodSchedule_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FoodSchedule" ADD CONSTRAINT "FoodSchedule_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "Food"("id") ON DELETE CASCADE ON UPDATE CASCADE;
