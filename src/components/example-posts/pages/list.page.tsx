import { Layout } from "@/components/layout/layout";
import { api } from "@/lib/api";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { LoadingPage } from "@/components/ui/loading";
import Image from "next/image";
import { MoreHorizontal, Plus } from "lucide-react";
import { useRouter } from "next/router";

import { ActionsDropdown } from "@/components/example-posts/components/actions-dropdown";
import { cn } from "@/lib/utils";

const ListExamplePostsPage = () => {
  const router = useRouter();
  const query = api.examplePost.list.useQuery();
  const posts = query.data;

  if (!posts)
    return (
      <Layout>
        <LoadingPage />
      </Layout>
    );

  return (
    <Layout>
      <div className="flex flex-col gap-2 py-2">
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
        <div className="space-y-3 pt-3">
          {posts &&
            posts.map((data) => (
              <Link
                href={`/example-posts/${data.post.id}`}
                key={data.post.id}
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
                        {data.post.title}
                      </h4>
                      <div>
                        <p className="text-sm leading-7 [&:not(:first-child)]:mt-6">
                          {data.post.content}
                        </p>
                      </div>
                    </div>
                    <div className="m-2">
                      <ActionsDropdown postId={data.post.id}>
                        <div
                          className={cn(buttonVariants({ variant: "ghost" }))}
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </div>
                      </ActionsDropdown>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 p-4 pt-2">
                    <Image
                      src={data.author.profileImageUrl}
                      alt="Author"
                      width={18}
                      height={18}
                      className="rounded-full"
                    />
                    <p className="text-xs text-muted-foreground ">
                      {data.author.firstName}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </Layout>
  );
};

export default ListExamplePostsPage;
