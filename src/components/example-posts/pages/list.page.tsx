import { Layout } from "@/components/layout/layout";
import { type RouterOutputs, api } from "@/lib/api";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { LoadingPage } from "@/components/ui/loading";
import Image from "next/image";
import { MoreHorizontal, Plus } from "lucide-react";

import { ActionsDropdown } from "@/components/example-posts/components/actions-dropdown";
import { cn } from "@/lib/utils";

const ListExamplePostsPage = () => {
  const query = api.examplePost.list.useQuery();
  const posts = query.data;

  return (
    <Layout>
      <div className="flex h-full flex-col gap-2 py-2">
        <div className="flex w-full items-start justify-between">
          <div className="pb-3">
            <h1 className="scroll-m-20 text-2xl font-bold tracking-tight">
              Example Posts
            </h1>
            <p className="text-sm text-muted-foreground">
              The fast and easy way to create new posts.
            </p>
          </div>
          <Link href="example-posts/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New
            </Button>
          </Link>
        </div>
        <div className="relative h-full space-y-3 pt-3">
          {!posts && <LoadingPage />}
          {posts &&
            posts.map((data) => <PostItem post={data} key={data.post.id} />)}
        </div>
      </div>
    </Layout>
  );
};

type ExamplePost = RouterOutputs["examplePost"]["list"][number];

const PostItem = ({ post }: { post: ExamplePost }) => {
  return (
    <Link
      href={`/example-posts/${post.post.id}`}
      key={post.post.id}
      className="block"
    >
      <div
        className="cursor-pointer rounded-lg border border-muted hover:bg-slate-50"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="flex items-start justify-between
    "
        >
          <div className="p-4">
            <h4 className="text-md scroll-m-20 font-semibold tracking-tight">
              {post.post.title}
            </h4>
            <div>
              <p className="text-sm leading-7 [&:not(:first-child)]:mt-6">
                {post.post.content}
              </p>
            </div>
          </div>
          <div className="m-2">
            <ActionsDropdown postId={post.post.id}>
              <div className={cn(buttonVariants({ variant: "ghost" }))}>
                <MoreHorizontal className="h-4 w-4" />
              </div>
            </ActionsDropdown>
          </div>
        </div>
        <div className="flex items-center gap-1 p-4 pt-2">
          <Image
            src={post.author.profileImageUrl}
            alt="Author"
            width={18}
            height={18}
            className="rounded-full"
          />
          <p className="text-xs text-muted-foreground ">
            {post.author.firstName}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ListExamplePostsPage;
