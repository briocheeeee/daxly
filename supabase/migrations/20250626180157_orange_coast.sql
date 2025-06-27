/*
  # Fix RLS policies for profiles table

  1. Security Updates
    - Drop existing policies that may be using incorrect function names
    - Create new policies using correct Supabase auth functions
    - Allow authenticated users to insert their own profile
    - Allow authenticated users to select their own profile
    - Allow authenticated users to update their own profile
    - Allow public read access for usernames (for display purposes)

  2. Changes
    - Replace any `uid()` references with `auth.uid()`
    - Ensure policies work correctly with Supabase authentication
*/

-- Drop existing policies to recreate them with correct syntax
DROP POLICY IF EXISTS "profiles_insert_policy" ON profiles;
DROP POLICY IF EXISTS "profiles_select_own_policy" ON profiles;
DROP POLICY IF EXISTS "profiles_select_public_policy" ON profiles;
DROP POLICY IF EXISTS "profiles_update_own_policy" ON profiles;

-- Ensure RLS is enabled
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to insert their own profile
CREATE POLICY "profiles_insert_policy" 
ON profiles FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = id);

-- Allow authenticated users to select their own profile
CREATE POLICY "profiles_select_own_policy" 
ON profiles FOR SELECT 
TO authenticated 
USING (auth.uid() = id);

-- Allow authenticated users to view other profiles (for public display)
CREATE POLICY "profiles_select_public_policy" 
ON profiles FOR SELECT 
TO authenticated 
USING (true);

-- Allow authenticated users to update their own profile
CREATE POLICY "profiles_update_own_policy" 
ON profiles FOR UPDATE 
TO authenticated 
USING (auth.uid() = id) 
WITH CHECK (auth.uid() = id);