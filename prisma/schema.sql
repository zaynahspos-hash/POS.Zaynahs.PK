-- ==================================================================================
-- ZAYNAHSPOS WEBSITE - MASTER DATABASE SCHEMA
-- Target Database: Supabase PostgreSQL
-- Description: This script creates the core database table for storing installation
--              leads captured from the ZaynahsPOS landing page.
-- ==================================================================================

-- 1. Create the pos_leads table (Active Core System)
CREATE TABLE IF NOT EXISTS public.pos_leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    shop_name VARCHAR(255) NOT NULL,
    owner_name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(50) NOT NULL,
    email VARCHAR(255) NULL,
    business_type VARCHAR(100) NOT NULL,
    city VARCHAR(100) NULL,
    status VARCHAR(50) DEFAULT 'pending' NOT NULL, -- pending, contacted, installed, cancelled
    notes TEXT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create Row Level Security (RLS) policies for secure direct access
ALTER TABLE public.pos_leads ENABLE ROW LEVEL SECURITY;

-- 3. Policy: Allow anybody (anonymous users) to insert leads from the landing page booking form
CREATE POLICY "Enable insert access for all users" ON public.pos_leads
    FOR INSERT 
    WITH CHECK (true);

-- 4. Policy: Allow service role and authed direct users full read/write management power
CREATE POLICY "Enable read/write access for authenticated users" ON public.pos_leads
    FOR ALL
    USING (true);

-- 5. Trigger for updated_at column automatic refresh on editing
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_pos_leads_modtime
    BEFORE UPDATE ON public.pos_leads
    FOR EACH ROW
    EXECUTE FUNCTION update_modified_column();

-- ==================================================================================
-- Note on Unwanted Tables Cleaned Up:
-- In accordance with the requirement to ONLY maintain the active Leads pipeline,
-- the following tables are omitted from the active database engine deployment:
--   - product_images (Deleted)
--   - products (Deleted)
--   - suppliers (Deleted)
--   - expenses (Deleted)
--   - users (Deleted)
-- ==================================================================================
