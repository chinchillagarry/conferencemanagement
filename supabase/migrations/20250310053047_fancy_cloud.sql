/*
  # Conference Management Initial Schema

  1. New Tables
    - profiles
      - id (uuid, references auth.users)
      - role (text)
      - created_at (timestamp)
    - presentations
      - id (uuid)
      - speaker_id (uuid, references profiles)
      - title (text)
      - description (text)
      - file_url (text)
      - created_at (timestamp)
    - volunteers
      - id (uuid)
      - profile_id (uuid, references profiles)
      - area (text)
      - status (text)
      - created_at (timestamp)
    - tasks
      - id (uuid)
      - volunteer_id (uuid, references volunteers)
      - title (text)
      - description (text)
      - status (text)
      - created_at (timestamp)
    - vendors
      - id (uuid)
      - name (text)
      - contact_person (text)
      - email (text)
      - booth_number (text)
      - status (text)
      - created_at (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users based on their role
*/

-- Create profiles table
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users,
  role text NOT NULL CHECK (role IN ('admin', 'speaker', 'volunteer')),
  created_at timestamptz DEFAULT now()
);

-- Create presentations table
CREATE TABLE presentations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  speaker_id uuid REFERENCES profiles NOT NULL,
  title text NOT NULL,
  description text,
  file_url text,
  created_at timestamptz DEFAULT now()
);

-- Create volunteers table
CREATE TABLE volunteers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid REFERENCES profiles NOT NULL,
  area text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create tasks table
CREATE TABLE tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  volunteer_id uuid REFERENCES volunteers NOT NULL,
  title text NOT NULL,
  description text,
  created_at timestamptz DEFAULT now()
);

-- Create vendors table
CREATE TABLE vendors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  contact_person text NOT NULL,
  email text NOT NULL,
  booth_number text,
  status text NOT NULL CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE presentations ENABLE ROW LEVEL SECURITY;
ALTER TABLE volunteers ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendors ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can read their own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Presentations policies
CREATE POLICY "Speakers can manage their presentations"
  ON presentations
  FOR ALL
  TO authenticated
  USING (speaker_id = auth.uid());

CREATE POLICY "Admins can view all presentations"
  ON presentations
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  ));

-- Volunteers policies
CREATE POLICY "Admins can manage volunteers"
  ON volunteers
  FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  ));

CREATE POLICY "Volunteers can view their own record"
  ON volunteers
  FOR SELECT
  TO authenticated
  USING (profile_id = auth.uid());

-- Tasks policies
CREATE POLICY "Admins can manage tasks"
  ON tasks
  FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  ));

CREATE POLICY "Volunteers can view and update their tasks"
  ON tasks
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM volunteers
      WHERE volunteers.id = tasks.volunteer_id
      AND volunteers.profile_id = auth.uid()
    )
  );

-- Vendors policies
CREATE POLICY "Admins can manage vendors"
  ON vendors
  FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  ));

CREATE POLICY "All authenticated users can view approved vendors"
  ON vendors
  FOR SELECT
  TO authenticated
  USING (status = 'approved');