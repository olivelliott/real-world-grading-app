/*
  Warnings:

  - The primary key for the `CourseEnrollment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `firstName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `isAdmin` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `CourseFeedback` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Token` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `courseDetails` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `social` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "CourseEnrollment" DROP CONSTRAINT "CourseEnrollment_courseId_fkey";

-- DropForeignKey
ALTER TABLE "CourseEnrollment" DROP CONSTRAINT "CourseEnrollment_userId_fkey";

-- DropForeignKey
ALTER TABLE "CourseFeedback" DROP CONSTRAINT "CourseFeedback_courseId_fkey";

-- DropForeignKey
ALTER TABLE "CourseFeedback" DROP CONSTRAINT "CourseFeedback_studentId_fkey";

-- DropForeignKey
ALTER TABLE "Test" DROP CONSTRAINT "Test_courseId_fkey";

-- DropForeignKey
ALTER TABLE "TestResult" DROP CONSTRAINT "TestResult_graderId_fkey";

-- DropForeignKey
ALTER TABLE "TestResult" DROP CONSTRAINT "TestResult_studentId_fkey";

-- DropForeignKey
ALTER TABLE "TestResult" DROP CONSTRAINT "TestResult_testId_fkey";

-- DropForeignKey
ALTER TABLE "Token" DROP CONSTRAINT "Token_userId_fkey";

-- DropIndex
DROP INDEX "CourseEnrollment.userId_role_index";

-- DropIndex
DROP INDEX "User.email_unique";

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "courseDetails",
ADD COLUMN     "courseDetails" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "CourseEnrollment" DROP CONSTRAINT "CourseEnrollment_pkey",
ADD CONSTRAINT "CourseEnrollment_pkey" PRIMARY KEY ("userId", "courseId", "role");

-- AlterTable
ALTER TABLE "User" DROP COLUMN "firstName",
DROP COLUMN "isAdmin",
DROP COLUMN "lastName",
ADD COLUMN     "name" TEXT NOT NULL,
ALTER COLUMN "social" SET NOT NULL;

-- DropTable
DROP TABLE "CourseFeedback";

-- DropTable
DROP TABLE "Token";

-- DropEnum
DROP TYPE "TokenType";

-- AddForeignKey
ALTER TABLE "Test" ADD CONSTRAINT "Test_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestResult" ADD CONSTRAINT "TestResult_graderId_fkey" FOREIGN KEY ("graderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestResult" ADD CONSTRAINT "TestResult_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestResult" ADD CONSTRAINT "TestResult_testId_fkey" FOREIGN KEY ("testId") REFERENCES "Test"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseEnrollment" ADD CONSTRAINT "CourseEnrollment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseEnrollment" ADD CONSTRAINT "CourseEnrollment_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
