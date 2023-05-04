import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { validationSchemaForCreateExamplePost } from "@/validation-schemas/example-post.schema";
import ExamplePostEntity from "@/business-logic/example-post.entity";

export const examplePostRouter = createTRPCRouter({
  list: publicProcedure.query(async () => {
    return new ExamplePostEntity().list();
  }),
  create: privateProcedure
    .input(validationSchemaForCreateExamplePost)
    .mutation(async ({ ctx, input }) => {
      return new ExamplePostEntity().create(ctx.userId, input);
    }),
});
