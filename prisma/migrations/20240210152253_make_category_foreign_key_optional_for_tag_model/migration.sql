-- DropForeignKey
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_category_id_fkey";

-- AlterTable
ALTER TABLE "Tag" ALTER COLUMN "category_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
