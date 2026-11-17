-- Run in Supabase SQL Editor
alter table public.organizations add column if not exists rhythm text default 'Weekly';
alter table public.organizations add column if not exists reset_at date default (current_date + 30);
create table if not exists public.accounts (id uuid primary key default gen_random_uuid(), org_id uuid references public.organizations on delete cascade, name text not null, created_at timestamptz default now());
alter table public.accounts enable row level security;
drop policy if exists "accounts all" on public.accounts;
create policy "accounts all" on public.accounts for all using (public.is_member(org_id)) with check (public.is_member(org_id));
grant select, insert, update, delete on public.accounts to authenticated;
