-- Check if Payment table exists and has the correct structure
SELECT 
    column_name, 
    data_type, 
    is_nullable
FROM 
    information_schema.columns
WHERE 
    table_schema = 'public' 
    AND table_name = 'Payment'
ORDER BY 
    ordinal_position;

-- Check if the Payment table has any records
SELECT COUNT(*) as payment_count FROM "public"."Payment";

-- List all tables in the public schema
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_type = 'BASE TABLE'
ORDER BY table_name;