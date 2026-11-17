-- Fixes "Database error saving new user". Run in Supabase SQL Editor.
create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
declare o uuid;
begin
  insert into public.organizations(name) values (coalesce(new.raw_user_meta_data->>'company','My workspace')) returning id into o;
  insert into public.members(org_id,user_id) values (o,new.id);
  return new;
end $$;

create or replace function public.is_member(o uuid) returns boolean
language sql security definer set search_path = public as $$
  select exists(select 1 from public.members where org_id=o and user_id=auth.uid())
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
for each row execute function public.handle_new_user();

grant usage on schema public to postgres, anon, authenticated, service_role;
grant all on all tables in schema public to postgres, service_role;
grant select, insert, update, delete on all tables in schema public to authenticated;
