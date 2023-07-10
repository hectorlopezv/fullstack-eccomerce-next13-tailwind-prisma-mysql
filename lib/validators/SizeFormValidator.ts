import { z } from "zod";
export const SizeFormValidator = z.object({
  name: z.string().min(1),
  value: z.string().min(1),
});
export type SizeFormValidatorType = z.infer<typeof SizeFormValidator>;
