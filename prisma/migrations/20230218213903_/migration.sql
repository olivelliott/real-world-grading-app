-- AlterTable
ALTER TABLE "Course" ALTER COLUMN "courseDetails" DROP NOT NULL,
ALTER COLUMN "courseDetails" SET DATA TYPE TEXT;
