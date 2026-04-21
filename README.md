# Sargento Nantes — Landing VIP

Landing page de captura de leads (nome + e-mail) para o grupo VIP do **Sargento Nantes**.
Stack: **Next.js 15 (App Router) + Supabase + Tailwind CSS**.

---

## Setup

### 1. Criar a tabela no Supabase

No SQL Editor do seu projeto Supabase, rode:

```sql
create table public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  created_at timestamptz not null default now()
);

-- Inserts serão feitos via service role no servidor.
alter table public.leads enable row level security;
```

### 2. Variáveis de ambiente

Copie [.env.example](.env.example) para `.env.local` e preencha:

```
NEXT_PUBLIC_SUPABASE_URL=https://SEU-PROJETO.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJ...
NEXT_PUBLIC_WHATSAPP_VIP_URL=https://chat.whatsapp.com/SEU-CONVITE
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

- [app/page.tsx](app/page.tsx) compõe o Hero + Formulário.
- [components/LeadForm.tsx](components/LeadForm.tsx) valida com Zod + React Hook Form e chama a Server Action.
- [app/actions.ts](app/actions.ts) valida no servidor, salva no Supabase e retorna o link do grupo VIP.
- Com sucesso, o formulário é substituído por [components/VipButton.tsx](components/VipButton.tsx) que leva ao WhatsApp.

## Verificação

1. Preencher um e-mail inválido → validação no cliente bloqueia o envio.
2. Preencher dados válidos → aparece o botão do grupo VIP.
3. Conferir no Supabase → Table Editor → `leads` que a linha foi criada.
