import { z } from "zod";

export const validationSchema = z.object({
  title: z.string().min(2),
  content: z.string().min(5),
});
