"use client";

import { startTransition, useActionState, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, ShieldAlert } from "lucide-react";
import { submitLead, type SubmitLeadState } from "@/app/actions";
import { leadSchema, type LeadInput } from "@/lib/schema";
import { VipButton } from "./VipButton";

const initial: SubmitLeadState = { ok: false };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="btn-gold flex w-full items-center justify-center gap-3 rounded-xl px-6 py-4 text-sm sm:text-base"
    >
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" /> Enviando…
        </>
      ) : (
        <>Quero entrar na tropa</>
      )}
    </button>
  );
}

export function LeadForm() {
  const [state, formAction] = useActionState(submitLead, initial);
  const [clientErrors, setClientErrors] = useState<{ name?: string; email?: string }>({});
  const formRef = useRef<HTMLFormElement>(null);

  const { register, trigger, getValues } = useForm<LeadInput>({
    resolver: zodResolver(leadSchema),
    mode: "onBlur",
    defaultValues: { name: "", email: "" },
  });

  useEffect(() => {
    if (state.ok) formRef.current?.reset();
  }, [state.ok]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const valid = await trigger();
    if (!valid) {
      const { name, email } = getValues();
      setClientErrors({
        name: name.trim().length < 2 ? "Informe seu nome completo" : undefined,
        email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
          ? "Informe um e-mail válido"
          : undefined,
      });
      return;
    }
    setClientErrors({});
    const fd = new FormData(form);
    startTransition(() => formAction(fd));
  }

  if (state.ok && state.vipUrl) {
    return (
      <div className="animate-fade-up flex flex-col items-center gap-6 rounded-2xl border border-gold-600/30 bg-ink-800/50 p-8 text-center shadow-gold-glow backdrop-blur">
        <div className="flex items-center gap-3 text-gold-400">
          <CheckCircle2 className="h-6 w-6" strokeWidth={2.5} />
          <p className="font-display text-lg uppercase tracking-[0.18em]">
            Cadastro confirmado, soldado
          </p>
        </div>
        <p className="max-w-md text-sm text-bone/70">
          Sua posição está garantida. Acesse agora o grupo VIP no WhatsApp e entre em formação
          com o Sargento.
        </p>
        <VipButton href={state.vipUrl} />
      </div>
    );
  }

  const nameError = clientErrors.name ?? state.fieldErrors?.name;
  const emailError = clientErrors.email ?? state.fieldErrors?.email;

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      className="relative flex w-full flex-col gap-5 rounded-2xl border border-ink-500/40 bg-ink-800/50 p-6 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)] backdrop-blur-sm sm:p-8"
    >
      <div className="absolute inset-x-8 -top-px h-px bg-gradient-to-r from-transparent via-gold-600/70 to-transparent" />

      <div>
        <label
          htmlFor="name"
          className="mb-2 block text-[11px] font-medium uppercase tracking-[0.22em] text-bone/70"
        >
          Seu nome
        </label>
        <input
          id="name"
          type="text"
          autoComplete="name"
          placeholder="Como o Sargento deve te chamar?"
          aria-invalid={!!nameError}
          {...register("name")}
          className="input-dark w-full rounded-lg px-4 py-3.5 text-base"
        />
        {nameError && (
          <p className="mt-2 flex items-center gap-1.5 text-xs text-danger">
            <ShieldAlert className="h-3.5 w-3.5" /> {nameError}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-[11px] font-medium uppercase tracking-[0.22em] text-bone/70"
        >
          Seu melhor e-mail
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="voce@exemplo.com"
          aria-invalid={!!emailError}
          {...register("email")}
          className="input-dark w-full rounded-lg px-4 py-3.5 text-base"
        />
        {emailError && (
          <p className="mt-2 flex items-center gap-1.5 text-xs text-danger">
            <ShieldAlert className="h-3.5 w-3.5" /> {emailError}
          </p>
        )}
      </div>

      {state.error && !state.fieldErrors && (
        <p className="flex items-center gap-2 rounded-md border border-danger/30 bg-danger/10 px-3 py-2 text-sm text-danger">
          <ShieldAlert className="h-4 w-4" /> {state.error}
        </p>
      )}

      <SubmitButton />

      <p className="text-center text-[11px] leading-relaxed text-muted">
        Ao enviar, você concorda em receber comunicações do Sargento Nantes.
        Sem spam, apenas conteúdo de valor.
      </p>
    </form>
  );
}
