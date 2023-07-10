import { z } from "zod";
export const ColorFormValidator = z.object({
  name: z.string().min(1),
  value: z.string().min(1),
});
export type ColorFormValidatorType = z.infer<typeof ColorFormValidator>;
