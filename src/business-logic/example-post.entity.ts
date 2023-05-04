import ClerkUserEntity from "@/business-logic/clerk-user.entity";
import { prisma } from "@/server/db";
import { type ValidationSchemaForCreateExamplePost } from "@/validation-schemas/example-post.schema";
import { TRPCError } from "@trpc/server";

export default class ExamplePostEntity {
  async create(userId: string, input: ValidationSchemaForCreateExamplePost) {
    const post = await prisma.examplePost.create({
      data: {
        authorId: userId,
        title: input.title,
        content: input.content,
      },
    });

    return post;
  }

  async list() {
    const posts = await prisma.examplePost.findMany({
      take: 100,
    });

    const userIdsFromPosts = posts.map((post) => post.authorId);
    const users = await new ClerkUserEntity().listUsersForClient(
      userIdsFromPosts
    );

    return posts.map((post) => {
      const author = users.find((user) => user.id === post.authorId);

      if (!author) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Author not found",
        });
      }

      return {
        post,
        author,
      };
    });
  }
}
