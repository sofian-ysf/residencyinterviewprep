-- Add editSummary column to Review table
ALTER TABLE "Review"
ADD COLUMN IF NOT EXISTS "editSummary" TEXT;

-- Optional: Add a comment to describe the column
COMMENT ON COLUMN "Review"."editSummary" IS 'Summary of edits made by the reviewer during the review process';

-- Check if the column was added successfully
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'Review'
AND column_name = 'editSummary';