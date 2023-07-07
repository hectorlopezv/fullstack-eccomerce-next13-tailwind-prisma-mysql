import { z } from "zod";
export const SettingsFormSchema = z.object({
  name: z.string().nonempty().min(1),
});
export type SettingsFormSchemaTypes = z.infer<typeof SettingsFormSchema>;
