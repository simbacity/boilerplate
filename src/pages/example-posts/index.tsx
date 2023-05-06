import { Layout } from "@/components/layout/layout";
import { type NextPage } from "next";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LoadingPage } from "@/components/ui/loading";
import Image from "next/image";
import { MoreHorizontal, Plus } from "lucide-react";
import { useRouter } from "next/router";

import { ActionsDropdown } from "@/components/example-posts/actions-dropdown";

const ListPosts: NextPage = () => {
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
              <div
                key={data.post.id}
                className="cursor-pointer rounded-lg border border-muted hover:bg-slate-50"
                onClick={(e) => {
                  e.stopPropagation();
                  void router.push(`/example-posts/${data.post.id}`);
                }}
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
                      <Button variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
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
            ))}
        </div>
      </div>
    </Layout>
  );
};

export default ListPosts;
