-- Run in Supabase SQL editor
create table if not exists organizations (id uuid primary key default gen_random_uuid(), name text not null, plan text default 'free', credits int default 200, created_at timestamptz default now());
create table if not exists members (org_id uuid references organizations on delete cascade, user_id uuid references auth.users on delete cascade, role text default 'owner', primary key (org_id, user_id));
create table if not exists records (id uuid primary key default gen_random_uuid(), org_id uuid references organizations on delete cascade, kind text not null, title text, input text, output jsonb, status text default 'open', created_at timestamptz default now());
alter table organizations enable row level security; alter table members enable row level security; alter table records enable row level security;
create or replace function is_member(o uuid) returns boolean language sql security definer as $$ select exists(select 1 from members where org_id=o and user_id=auth.uid()) $$;
create policy "org read" on organizations for select using (is_member(id));
create policy "org update" on organizations for update using (is_member(id));
create policy "own membership" on members for select using (user_id=auth.uid());
create policy "records all" on records for all using (is_member(org_id)) with check (is_member(org_id));
-- auto-create workspace on signup
create or replace function handle_new_user() returns trigger language plpgsql security definer as $$
declare o uuid; begin insert into organizations(name) values (coalesce(new.raw_user_meta_data->>'company','My workspace')) returning id into o; insert into members(org_id,user_id) values (o,new.id); return new; end $$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute function handle_new_user();
