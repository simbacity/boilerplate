import { Layout } from "@/components/layout/layout";
import { type RouterOutputs, api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LoadingPage } from "@/components/ui/loading";
import Image from "next/image";
import { Loader2, MoreHorizontal, Plus } from "lucide-react";

import { ActionsDropdown } from "@/components/example-posts/components/actions-dropdown";
import { useUser } from "@clerk/clerk-react";
import { type UserResource } from "@clerk/types";
import { useRouter } from "next/router";

const ListExamplePostsPage = () => {
  const query = api.examplePost.list.useInfiniteQuery(
    {
      limit: 10,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );

  const posts = query.data?.pages.flatMap((page) => page.items);
  const { user } = useUser();

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
          {(!posts || !user) && <LoadingPage />}
          {posts &&
            user &&
            posts.map((item) => (
              <PostItem item={item} user={user} key={item.post.id} />
            ))}
          <div className="w-full text-center">
            {query.hasNextPage && (
              <Button
                onClick={() => void query.fetchNextPage().catch(console.error)}
                variant="ghost"
                disabled={query.isFetchingNextPage}
              >
                {query.isFetchingNextPage && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Load more
              </Button>
            )}
          </div>
          <div className="pt-8"></div>
        </div>
      </div>
    </Layout>
  );
};

type ExamplePost = RouterOutputs["examplePost"]["list"]["items"][number];

const PostItem = ({
  item,
  user,
}: {
  item: ExamplePost;
  user: UserResource;
}) => {
  const router = useRouter();
  const canEdit = item.author.id === user.id;

  return (
    <div
      id={item.post.id}
      className="cursor-pointer rounded-lg border border-muted hover:bg-slate-50"
      onClick={() =>
        void router.push(`/example-posts/${item.post.id}`).catch(console.error)
      }
      key={item.post.id}
    >
      <div
        className="flex items-start justify-between
    "
      >
        <div className="p-4">
          <h4 className="text-md scroll-m-20 font-semibold tracking-tight">
            {item.post.title}
          </h4>
          <div>
            <p className="text-sm leading-7 [&:not(:first-child)]:mt-6">
              {item.post.content}
            </p>
          </div>
        </div>
        <div className="m-2">
          {canEdit && (
            <ActionsDropdown postId={item.post.id}>
              <Button variant="ghost" asChild>
                <div>
                  <MoreHorizontal className="h-4 w-4" />
                </div>
              </Button>
            </ActionsDropdown>
          )}
        </div>
      </div>
      <div className="flex items-center gap-1 p-4 pt-2">
        <Image
          src={item.author.profileImageUrl}
          alt="Author"
          width={18}
          height={18}
          className="rounded-full"
        />
        <p className="text-xs text-muted-foreground ">
          {item.author.firstName}
        </p>
      </div>
    </div>
  );
};

export default ListExamplePostsPage;
