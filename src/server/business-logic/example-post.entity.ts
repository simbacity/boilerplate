import ClerkUserEntity from "@/server/business-logic/clerk-user.entity";
import { prisma } from "@/server/db";
import {
  type ValidationSchemaForUpdateExamplePost,
  type ValidationSchemaForCreateExamplePost,
  type ValidationSchemaForListExamplePosts,
} from "@/server/api/validation-schemas/example-post.schema";
import { type ExamplePost } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { type AsyncReturnType } from "type-fest";

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

  async update(userId: string, input: ValidationSchemaForUpdateExamplePost) {
    const post = await prisma.examplePost.findUnique({
      where: {
        id: input.id,
      },
    });

    this.validateAccess(post, userId);

    const updatedPost = await prisma.examplePost.update({
      where: {
        id: input.id,
      },
      data: {
        title: input.title,
        content: input.content,
      },
    });

    return updatedPost;
  }

  async delete(userId: string, postId: string) {
    const post = await prisma.examplePost.findUnique({
      where: {
        id: postId,
      },
    });

    this.validateAccess(post, userId);

    await prisma.examplePost.delete({
      where: {
        id: postId,
      },
    });

    return true;
  }

  async find(postId: string) {
    const post = await prisma.examplePost.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Post not found",
      });
    }

    const author = await new ClerkUserEntity().findUserForClient(post.authorId);

    return {
      post,
      author,
    };
  }

  async list(params: ValidationSchemaForListExamplePosts) {
    const limit = params.limit ?? 10;
    const cursor = params.cursor;

    const posts = await prisma.examplePost.findMany({
      take: limit + 1,
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: {
        createdAt: "desc",
      },
    });

    let nextCursor: typeof cursor;
    if (posts.length > limit) {
      const nextItem = posts.pop();
      nextCursor = nextItem?.id;
    }

    const userIdsFromPosts = posts.map((post) => post.authorId);
    const users = await new ClerkUserEntity().listUsersForClient(
      userIdsFromPosts
    );

    const items = posts.map((post) => this.mapAuthorToPost(post, users));

    return {
      items,
      nextCursor,
    };
  }

  private mapAuthorToPost(
    post: ExamplePost,
    users: AsyncReturnType<typeof ClerkUserEntity.prototype.listUsersForClient>
  ) {
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
  }

  private validateAccess(post: ExamplePost | null, userId: string) {
    if (!post) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Post not found",
      });
    }

    if (post.authorId !== userId) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "You are not the author of this post",
      });
    }
  }
}
