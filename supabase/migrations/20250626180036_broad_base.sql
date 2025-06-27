/*
  # Fix RLS policies for profiles table

  1. Security Updates
    - Drop existing policies that use incorrect `uid()` function
    - Create new policies using correct `auth.uid()` function
    - Add INSERT policy for profile creation during sign-up
    - Update SELECT policies to use proper authentication checks

  2. Policy Changes
    - `profiles_insert_policy`: Allow authenticated users to create their own profile
    - `profiles_select_own_policy`: Allow authenticated users to read their own profile
    - `profiles_select_public_policy`: Allow authenticated users to read public profile info
    - `profiles_update_own_policy`: Allow authenticated users to update their own profile
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Users can read own profile" ON profiles;
DROP POLICY IF EXISTS "Users can read public profile info" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;

-- Create INSERT policy for profile creation
CREATE POLICY "profiles_insert_policy"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Create SELECT policy for own profile
CREATE POLICY "profiles_select_own_policy"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Create SELECT policy for public profile info (username, email visible to all authenticated users)
CREATE POLICY "profiles_select_public_policy"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (true);

-- Create UPDATE policy for own profile
CREATE POLICY "profiles_update_own_policy"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);