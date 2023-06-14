/*
  Warnings:

  - You are about to drop the column `scheduleId` on the `Student` table. All the data in the column will be lost.
  - Added the required column `courseId` to the `Schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lecturerId` to the `Schedule` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_scheduleId_fkey";

-- AlterTable
ALTER TABLE "Schedule" ADD COLUMN     "courseId" INTEGER NOT NULL,
ADD COLUMN     "lecturerId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "scheduleId";

-- CreateTable
CREATE TABLE "_ScheduleToStudent" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ScheduleToStudent_AB_unique" ON "_ScheduleToStudent"("A", "B");

-- CreateIndex
CREATE INDEX "_ScheduleToStudent_B_index" ON "_ScheduleToStudent"("B");

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_lecturerId_fkey" FOREIGN KEY ("lecturerId") REFERENCES "Lecturer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ScheduleToStudent" ADD CONSTRAINT "_ScheduleToStudent_A_fkey" FOREIGN KEY ("A") REFERENCES "Schedule"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ScheduleToStudent" ADD CONSTRAINT "_ScheduleToStudent_B_fkey" FOREIGN KEY ("B") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;
