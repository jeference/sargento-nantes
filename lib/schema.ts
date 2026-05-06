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
  state: z
    .string()
    .trim()
    .length(2, "Selecione seu estado"),
  city: z
    .string()
    .trim()
    .min(2, "Informe sua cidade")
    .max(120, "Cidade muito longa"),
});

export type LeadInput = z.infer<typeof leadSchema>;
