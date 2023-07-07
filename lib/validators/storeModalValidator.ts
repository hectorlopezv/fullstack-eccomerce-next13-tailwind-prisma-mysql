import { z } from "zod";
export const formSchema = z.object({
  name: z.string().nonempty().min(1),
});
export type formValues = z.infer<typeof formSchema>;
