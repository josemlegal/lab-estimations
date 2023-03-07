/*
  Warnings:

  - You are about to drop the column `commentId` on the `CommentType` table. All the data in the column will be lost.
  - Added the required column `commentTypeId` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CommentType" DROP CONSTRAINT "CommentType_commentId_fkey";

-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "commentTypeId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "CommentType" DROP COLUMN "commentId";

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_commentTypeId_fkey" FOREIGN KEY ("commentTypeId") REFERENCES "CommentType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
