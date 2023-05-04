import { validationSchema } from "@/components/forms/example-post/validation-schema";
import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "@/server/api/trpc";

const items = [
  {
    id: "1",
    title: "Hello tRPC",
    content: "Hello world",
  },
];

export const examplePostRouter = createTRPCRouter({
  list: publicProcedure.query(() => {
    return items;
  }),
  add: privateProcedure.input(validationSchema).mutation(({ input }) => {
    const id = Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, "")
      .slice(0, 6);
    const item = {
      id,
      ...input,
    };
    items.push(item);

    return item;
  }),
});
