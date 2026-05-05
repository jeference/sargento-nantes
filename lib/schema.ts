import { z } from "zod";

export const leadSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Informe seu nome completo")
    .max(120, "Nome muito longo"),
  phone: z
    .string()
    .trim()
    .min(10, "Telefone inválido")
    .max(20, "Telefone muito longo"),
});

export type LeadInput = z.infer<typeof leadSchema>;
