import { z } from "zod";

export const validationSchemaForCreateExamplePost = z.object({
  title: z.string().min(2),
  content: z.string().min(5),
});

export type ValidationSchemaForCreateExamplePost = z.TypeOf<
  typeof validationSchemaForCreateExamplePost
>;

export const validationSchemaForUpdateExamplePost =
  validationSchemaForCreateExamplePost.extend({
    id: z.string(),
  });

export type ValidationSchemaForUpdateExamplePost = z.TypeOf<
  typeof validationSchemaForUpdateExamplePost
>;

export const validationSchemaForListExamplePosts = z.object({
  limit: z.number().min(1).max(20).nullish(),
  cursor: z.string().nullish(),
});

export type ValidationSchemaForListExamplePosts = z.TypeOf<
  typeof validationSchemaForListExamplePosts
>;
