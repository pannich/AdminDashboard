-- Create organizations table
create table organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Create residents table
create table residents (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  email text,
  cohort_id uuid,
  organization_id uuid references organizations(id) on delete set null,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Create call history table
create table call_history (
  id uuid primary key default gen_random_uuid(),
  resident_id uuid references residents(id) on delete cascade,
  start_at timestamp with time zone not null,
  end_at timestamp with time zone not null,
  summary text,
  recording_url text,
  duration integer,
  language text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);
