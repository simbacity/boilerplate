import { createTRPCRouter, privateProcedure } from "@/server/api/trpc";
import {
  validationSchemaForCreateExamplePost,
  validationSchemaForUpdateExamplePost,
} from "@/server/api/validation-schemas/example-post.schema";
import ExamplePostEntity from "@/server/business-logic/example-post.entity";
import { z } from "zod";

export const examplePostRouter = createTRPCRouter({
  show: privateProcedure.input(z.string()).query(async ({ input }) => {
    return new ExamplePostEntity().find(input);
  }),
  list: privateProcedure.query(async () => {
    return new ExamplePostEntity().list();
  }),
  create: privateProcedure
    .input(validationSchemaForCreateExamplePost)
    .mutation(async ({ ctx, input }) => {
      return new ExamplePostEntity().create(ctx.userId, input);
    }),
  update: privateProcedure
    .input(validationSchemaForUpdateExamplePost)
    .mutation(async ({ ctx, input }) => {
      return new ExamplePostEntity().update(ctx.userId, input);
    }),
  delete: privateProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      return new ExamplePostEntity().delete(ctx.userId, input);
    }),
});
