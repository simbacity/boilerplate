import { createTRPCRouter } from "@/server/api/trpc";
import { exampleRouter } from "@/server/api/routers/example";
import { examplePostRouter } from "@/server/api/routers/example-post.router";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  examplePost: examplePostRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
