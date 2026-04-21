"use server";

import { leadSchema } from "@/lib/schema";
import { getSupabaseAdmin } from "@/lib/supabase";

export type SubmitLeadState = {
  ok: boolean;
  error?: string;
  vipUrl?: string;
  fieldErrors?: { name?: string; email?: string };
};

export async function submitLead(
  _prev: SubmitLeadState,
  formData: FormData
): Promise<SubmitLeadState> {
  const parsed = leadSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
  });

  if (!parsed.success) {
    const fieldErrors: { name?: string; email?: string } = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as "name" | "email";
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
    vipUrl:
      process.env.NEXT_PUBLIC_WHATSAPP_VIP_URL ??
      "https://chat.whatsapp.com/",
  };
}
