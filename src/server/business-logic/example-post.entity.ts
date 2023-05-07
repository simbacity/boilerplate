import ClerkUserEntity from "@/server/business-logic/clerk-user.entity";
import { prisma } from "@/server/db";
import {
  type ValidationSchemaForUpdateExamplePost,
  type ValidationSchemaForCreateExamplePost,
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

  async list() {
    const posts = await prisma.examplePost.findMany({
      take: 100,
    });

    const userIdsFromPosts = posts.map((post) => post.authorId);
    const users = await new ClerkUserEntity().listUsersForClient(
      userIdsFromPosts
    );

    return posts.map((post) => this.mapAuthorToPost(post, users));
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
