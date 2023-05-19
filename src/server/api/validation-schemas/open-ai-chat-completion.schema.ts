import { z } from "zod";

export const validationSchemaForMessage = z.object({
  message: z.string().min(1),
});

export const validationSchemaForCreateChatCompletion = z
  .object({
    messageHistory: z.array(
      z.object({
        type: z.string(),
        text: z.string(),
      })
    ),
  })
  .merge(validationSchemaForMessage);

export type ValidationSchemaForCreateChatCompletion = z.TypeOf<
  typeof validationSchemaForCreateChatCompletion
>;

export type ValidationSchemaForMessage = z.TypeOf<
  typeof validationSchemaForMessage
>;
