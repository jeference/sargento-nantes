import { z } from "zod";

export const leadSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Informe seu nome completo")
    .max(120, "Nome muito longo"),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Informe um e-mail válido"),
});

export type LeadInput = z.infer<typeof leadSchema>;
