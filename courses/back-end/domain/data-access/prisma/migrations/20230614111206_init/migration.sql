/*
  Warnings:

  - You are about to drop the column `courseId` on the `Schedule` table. All the data in the column will be lost.
  - You are about to drop the column `lecturerId` on the `Schedule` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Schedule" DROP CONSTRAINT "Schedule_courseId_fkey";

-- DropForeignKey
ALTER TABLE "Schedule" DROP CONSTRAINT "Schedule_lecturerId_fkey";

-- AlterTable
ALTER TABLE "Schedule" DROP COLUMN "courseId",
DROP COLUMN "lecturerId";

-- CreateTable
CREATE TABLE "_CourseToLecturer" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CourseToLecturer_AB_unique" ON "_CourseToLecturer"("A", "B");

-- CreateIndex
CREATE INDEX "_CourseToLecturer_B_index" ON "_CourseToLecturer"("B");

-- AddForeignKey
ALTER TABLE "_CourseToLecturer" ADD CONSTRAINT "_CourseToLecturer_A_fkey" FOREIGN KEY ("A") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CourseToLecturer" ADD CONSTRAINT "_CourseToLecturer_B_fkey" FOREIGN KEY ("B") REFERENCES "Lecturer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
