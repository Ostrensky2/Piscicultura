-- ============================================================
-- Piscicultura 2026-1 — Supabase Schema
-- Aplicar em: Dashboard > SQL Editor  (ou via MCP apply_migration)
-- ============================================================

-- ── GROUPS ──────────────────────────────────────────────────
create table if not exists groups (
  id         uuid primary key default gen_random_uuid(),
  owner_id   uuid not null default auth.uid(),
  name       text not null,
  sort_order int  not null default 0,
  icon       text,
  created_at timestamptz not null default now()
);

alter table groups enable row level security;

drop policy if exists "owner_groups" on groups;
create policy "owner_groups" on groups
  using  (owner_id = auth.uid())
  with check (owner_id = auth.uid());

-- ── STUDENTS ─────────────────────────────────────────────────
create table if not exists students (
  id           uuid primary key default gen_random_uuid(),
  owner_id     uuid not null default auth.uid(),
  full_name    text not null,
  initials     text not null,
  color        text not null default '#137fec',
  group_id     uuid references groups(id) on delete set null,
  role_context text not null default 'Membro'
                    check (role_context in ('Membro','Líder','Coordenação')),
  is_active    boolean not null default true,
  created_at   timestamptz not null default now()
);

alter table students enable row level security;

drop policy if exists "owner_students" on students;
create policy "owner_students" on students
  using  (owner_id = auth.uid())
  with check (owner_id = auth.uid());

create index if not exists idx_students_owner_name on students(owner_id, full_name);

-- ── INTERACTIONS ──────────────────────────────────────────────
create table if not exists interactions (
  id                  uuid primary key default gen_random_uuid(),
  owner_id            uuid not null default auth.uid(),
  student_id          uuid not null references students(id) on delete cascade,
  occurred_at         timestamptz not null default now(),
  score               numeric(4,1) check (score >= 0 and score <= 10),
  theme               text,
  notes               text,
  interaction_type    text,
  role_context        text,
  group_snapshot_name text,   -- nome do grupo NO MOMENTO da interação (imutável)
  created_at          timestamptz not null default now()
);

alter table interactions enable row level security;

drop policy if exists "owner_interactions" on interactions;
create policy "owner_interactions" on interactions
  using  (owner_id = auth.uid())
  with check (owner_id = auth.uid());

create index if not exists idx_interactions_owner_date on interactions(owner_id, occurred_at desc);
create index if not exists idx_interactions_student    on interactions(student_id, occurred_at desc);
