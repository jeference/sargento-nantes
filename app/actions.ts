"use server";

import { leadSchema } from "@/lib/schema";
import { getSupabaseAdmin } from "@/lib/supabase";

export type SubmitLeadState = {
  ok: boolean;
  error?: string;
  fieldErrors?: { name?: string; phone?: string; state?: string; city?: string };
};

export async function submitLead(
  _prev: SubmitLeadState,
  formData: FormData
): Promise<SubmitLeadState> {
  const parsed = leadSchema.safeParse({
    name: formData.get("name"),
    phone: formData.get("phone"),
    state: formData.get("state"),
    city: formData.get("city"),
  });

  if (!parsed.success) {
    const fieldErrors: { name?: string; phone?: string; state?: string; city?: string } = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as "name" | "phone" | "state" | "city";
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { ok: false, error: "Corrija os campos destacados.", fieldErrors };
  }

  const { error } = await getSupabaseAdmin().from("leads").insert(parsed.data);

  if (error) {
    console.error("[submitLead] supabase error:", error);
    return {
      ok: false,
      error: "Não foi possível registrar agora. Tente novamente em instantes.",
    };
  }

  return {
    ok: true,
  };
}
