-- ============================================================
-- Profiles
-- ============================================================
create table public.profiles (
  user_id  uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  goals    text[] default '{}',
  created_at timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = user_id);

create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = user_id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = user_id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (user_id, display_name)
  values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ============================================================
-- Exercises (static library, no RLS needed — public read)
-- ============================================================
create table public.exercises (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  category    text not null check (category in ('physical', 'mental')),
  subcategory text not null,
  description text not null,
  instructions text[] not null default '{}',
  duration_min int not null,
  difficulty  text not null check (difficulty in ('beginner', 'intermediate', 'advanced'))
);

alter table public.exercises enable row level security;

create policy "Exercises are publicly readable"
  on public.exercises for select
  using (true);

-- ============================================================
-- Exercise Logs
-- ============================================================
create table public.exercise_logs (
  id             uuid primary key default gen_random_uuid(),
  user_id        uuid not null references auth.users (id) on delete cascade,
  exercise_id    uuid references public.exercises (id) on delete set null,
  exercise_title text not null,
  duration_min   int not null,
  notes          text,
  logged_at      timestamptz default now()
);

alter table public.exercise_logs enable row level security;

create policy "Users can view own exercise logs"
  on public.exercise_logs for select
  using (auth.uid() = user_id);

create policy "Users can insert own exercise logs"
  on public.exercise_logs for insert
  with check (auth.uid() = user_id);

create policy "Users can delete own exercise logs"
  on public.exercise_logs for delete
  using (auth.uid() = user_id);

create index idx_exercise_logs_user_date on public.exercise_logs (user_id, logged_at desc);

-- ============================================================
-- Mood Logs
-- ============================================================
create table public.mood_logs (
  id        uuid primary key default gen_random_uuid(),
  user_id   uuid not null references auth.users (id) on delete cascade,
  score     int not null check (score between 1 and 10),
  note      text,
  logged_at timestamptz default now()
);

alter table public.mood_logs enable row level security;

create policy "Users can view own mood logs"
  on public.mood_logs for select
  using (auth.uid() = user_id);

create policy "Users can insert own mood logs"
  on public.mood_logs for insert
  with check (auth.uid() = user_id);

create policy "Users can delete own mood logs"
  on public.mood_logs for delete
  using (auth.uid() = user_id);

create index idx_mood_logs_user_date on public.mood_logs (user_id, logged_at desc);

-- ============================================================
-- Journal Prompts (static, public read)
-- ============================================================
create table public.journal_prompts (
  id       uuid primary key default gen_random_uuid(),
  text     text not null,
  category text not null
);

alter table public.journal_prompts enable row level security;

create policy "Journal prompts are publicly readable"
  on public.journal_prompts for select
  using (true);

-- ============================================================
-- Journal Entries
-- ============================================================
create table public.journal_entries (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users (id) on delete cascade,
  prompt_id   uuid references public.journal_prompts (id) on delete set null,
  prompt_text text,
  content     text not null,
  created_at  timestamptz default now()
);

alter table public.journal_entries enable row level security;

create policy "Users can view own journal entries"
  on public.journal_entries for select
  using (auth.uid() = user_id);

create policy "Users can insert own journal entries"
  on public.journal_entries for insert
  with check (auth.uid() = user_id);

create policy "Users can update own journal entries"
  on public.journal_entries for update
  using (auth.uid() = user_id);

create policy "Users can delete own journal entries"
  on public.journal_entries for delete
  using (auth.uid() = user_id);

create index idx_journal_entries_user_date on public.journal_entries (user_id, created_at desc);

-- ============================================================
-- Facts (static, public read)
-- ============================================================
create table public.facts (
  id          uuid primary key default gen_random_uuid(),
  topic       text not null,
  statement   text not null,
  explanation text not null,
  citation    jsonb not null
);

alter table public.facts enable row level security;

create policy "Facts are publicly readable"
  on public.facts for select
  using (true);

-- ============================================================
-- Grants (needed when running raw SQL outside Supabase CLI)
-- ============================================================

-- Public read-only tables
grant select on public.exercises       to anon, authenticated;
grant select on public.journal_prompts to anon, authenticated;
grant select on public.facts           to anon, authenticated;

-- User-owned tables (authenticated only)
grant select, insert, update          on public.profiles        to authenticated;
grant select, insert, delete          on public.mood_logs       to authenticated;
grant select, insert, delete          on public.exercise_logs   to authenticated;
grant select, insert, update, delete  on public.journal_entries to authenticated;
