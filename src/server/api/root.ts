import { createTRPCRouter } from "@/server/api/trpc";
import { examplePostRouter } from "@/server/api/routers/example-post.router";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  examplePost: examplePostRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
