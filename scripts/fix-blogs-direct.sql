-- SQL script to fix blog posts with JSON content
-- This extracts the actual HTML content from the JSON structure

-- First, let's check which posts need fixing
SELECT id, title, LENGTH(content) as content_length, 
       SUBSTRING(content, 1, 50) as content_preview
FROM "BlogPost"
WHERE content LIKE '{%"content"%';

-- Create a backup of current content (optional)
-- CREATE TABLE "BlogPost_backup" AS SELECT * FROM "BlogPost";

-- Update posts to extract HTML from JSON
-- This handles posts where content is stored as JSON
UPDATE "BlogPost"
SET content = 
  CASE 
    WHEN content LIKE '{%"content"%' THEN
      -- Extract the content field from JSON
      SUBSTRING(
        content,
        POSITION('"content"' IN content) + 11,
        POSITION('","metaDescription"' IN content) - POSITION('"content"' IN content) - 11
      )
    ELSE content
  END
WHERE content LIKE '{%"content"%';

-- Clean up any escaped characters
UPDATE "BlogPost"
SET content = REPLACE(REPLACE(REPLACE(content, '\n', E'\n'), '\"', '"'), '\\', '\')
WHERE content LIKE '%\\n%' OR content LIKE '%\"%';

-- Verify the fix
SELECT id, title, SUBSTRING(content, 1, 100) as content_preview
FROM "BlogPost"
ORDER BY "createdAt" DESC;