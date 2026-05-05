"use client";

import { startTransition, useActionState, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, PenLine, ShieldAlert } from "lucide-react";
import { submitLead, type SubmitLeadState } from "@/app/actions";
import { leadSchema, type LeadInput } from "@/lib/schema";
import { PhoneNumberInputField } from "./PhoneNumberInput";

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
          <Loader2 className="h-4 w-4 animate-spin" /> Registrando assinatura…
        </>
      ) : (
        <>
          <PenLine className="h-4 w-4" strokeWidth={2.5} />
          Assinar agora
        </>
      )}
    </button>
  );
}

export function LeadForm() {
  const [state, formAction] = useActionState(submitLead, initial);
  const formRef = useRef<HTMLFormElement>(null);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LeadInput>({
    resolver: zodResolver(leadSchema),
    mode: "onBlur",
    defaultValues: { name: "", phone: "" },
  });

  useEffect(() => {
    if (state.ok) formRef.current?.reset();
  }, [state.ok]);

  async function onSubmit(data: LeadInput) {
    const fd = new FormData();
    fd.append("name", data.name);
    fd.append("phone", data.phone);
    startTransition(() => formAction(fd));
  }

  if (state.ok) {
    return (
      <div className="animate-fade-up flex flex-col items-center gap-6 rounded-2xl border border-gold-600/30 bg-ink-800/50 p-8 text-center shadow-gold-glow backdrop-blur">
        <div className="flex items-center gap-3 text-gold-400">
          <CheckCircle2 className="h-6 w-6" strokeWidth={2.5} />
          <p className="font-display text-lg uppercase tracking-[0.18em]">
            Assinatura registrada
          </p>
        </div>
        <p className="max-w-md text-sm text-bone/70">
          Sua assinatura foi computada. Quanto mais gente assinar, mais cedo o
          Sargento abre a mentoria. <strong className="text-bone">Compartilhe com quem você quer proteger.</strong>
        </p>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="relative w-full rounded-xl border-l-2 border-gold-500 bg-ink-800/40 px-4 py-3 text-left text-sm leading-snug text-bone/85 sm:px-5 sm:text-base">
        <p>
          <strong className="text-bone">
            Você quer que o Sargento Nantes te ensine a proteger sua família?
          </strong>{" "}
          Assine o abaixo-assinado e exija que o Nantes abra o treinamento que pode salvar quem você ama.{" "}
          <span className="text-gold-400">Quanto mais assinaturas, mais cedo ele libera.</span>
        </p>
      </div>

      <form
        ref={formRef}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="relative flex w-full flex-col gap-4 rounded-2xl border border-ink-500/40 bg-ink-800/50 p-5 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)] backdrop-blur-sm sm:gap-5 sm:p-7"
      >
      <div className="absolute inset-x-8 -top-px h-px bg-gradient-to-r from-transparent via-gold-600/70 to-transparent" />

      <div>
        <input
          id="name"
          type="text"
          autoComplete="name"
          placeholder="Seu nome"
          aria-invalid={!!errors.name}
          aria-label="Seu nome"
          {...register("name")}
          className="input-dark w-full rounded-lg px-4 py-3.5 text-base"
        />
        {errors.name && (
          <p className="mt-1.5 flex items-center gap-1.5 text-xs text-danger">
            <ShieldAlert className="h-3.5 w-3.5" /> {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <PhoneNumberInputField
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={errors.phone?.message}
              disabled={false}
            />
          )}
        />
      </div>

      {state.error && !state.fieldErrors && (
        <p className="flex items-center gap-2 rounded-md border border-danger/30 bg-danger/10 px-3 py-2 text-xs text-danger">
          <ShieldAlert className="h-4 w-4" /> {state.error}
        </p>
      )}

      <SubmitButton />
      </form>

      <div className="flex items-center justify-center gap-2 text-center text-[11px] leading-snug text-bone/70 sm:text-xs">
        <span className="relative flex h-2 w-2 shrink-0">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/70" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
        <span>
          <strong className="text-bone">+1.247 brasileiros</strong> assinaram nas últimas 24h ·
          <span className="text-gold-400"> não fique de fora</span>
        </span>
      </div>
    </div>
  );
}
