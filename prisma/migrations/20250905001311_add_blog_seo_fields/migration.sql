-- AlterTable
ALTER TABLE "BlogPost" ADD COLUMN "author" TEXT DEFAULT 'MyERAS Reviewer Team';
ALTER TABLE "BlogPost" ADD COLUMN "faqSection" JSONB;
ALTER TABLE "BlogPost" ADD COLUMN "featuredImage" TEXT;
ALTER TABLE "BlogPost" ADD COLUMN "metaDescription" TEXT;
ALTER TABLE "BlogPost" ADD COLUMN "schemaMarkup" TEXT;
