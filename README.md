# Sargento Nantes — Abaixo-Assinado pela Mentoria

Landing page de abaixo-assinado: visitantes assinam exigindo que o **Sargento Nantes** abra uma mentoria de proteção familiar contra a criminalidade. Captura **nome + WhatsApp** e persiste no Supabase.
Stack: **Next.js 15 (App Router) + Supabase + Tailwind CSS**.

---

## Setup

### 1. Criar a tabela no Supabase

No SQL Editor do seu projeto Supabase, rode:

```sql
create table public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  state text not null,
  city text not null,
  created_at timestamptz not null default now()
);

-- Inserts são feitos via service role no servidor.
alter table public.leads enable row level security;
```

Se você já tem a tabela antiga sem `state`/`city`, faça a migração:

```sql
alter table public.leads
  add column if not exists state text not null default '',
  add column if not exists city text not null default '';
```

### 2. Variáveis de ambiente

Copie [.env.example](.env.example) para `.env.local` e preencha:

```
NEXT_PUBLIC_SUPABASE_URL=https://SEU-PROJETO.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

> A `SUPABASE_SERVICE_ROLE_KEY` é sensível — só é usada em Server Actions, nunca exposta ao cliente.

### 3. Rodar em dev

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000`.

---

## Como funciona

- [app/page.tsx](app/page.tsx) compõe Hero + Formulário.
- [components/Hero.tsx](components/Hero.tsx) — imagem + headline de pânico/urgência.
- [components/LeadForm.tsx](components/LeadForm.tsx) — pitch do abaixo-assinado, form com Zod + React Hook Form, sucesso confirma a assinatura.
- [components/PhoneNumberInput.tsx](components/PhoneNumberInput.tsx) — input internacional de telefone.
- [app/actions.ts](app/actions.ts) — Server Action: valida e grava na tabela `leads`.

## Verificação

1. Preencher telefone inválido → validação bloqueia o envio.
2. Preencher dados válidos → tela de "Assinatura registrada".
3. Conferir no Supabase → Table Editor → `leads` que a linha foi criada.
