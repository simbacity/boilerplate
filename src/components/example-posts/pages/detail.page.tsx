import { Layout } from "@/components/layout/layout";
import { api } from "@/lib/api";
import { LoadingPage } from "@/components/ui/loading";
import Image from "next/image";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowLeft, MoreHorizontal } from "lucide-react";
import { ActionsTopbar } from "@/components/layout/actions-topbar";
import Link from "next/link";

import { ActionsDropdown } from "@/components/example-posts/components/actions-dropdown";
import { cn } from "@/lib/utils";

const ExamplePostDetailPage = ({ id }: { id: string }) => {
  const query = api.examplePost.show.useQuery(id);
  const post = query.data;

  if (!post)
    return (
      <Layout noPadding fullScreenOnMobile>
        <LoadingPage />
      </Layout>
    );

  return (
    <Layout noPadding fullScreenOnMobile>
      <div>
        <ActionsTopbar>
          <Link href="/example-posts">
            <Button variant="ghost">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </Link>
          <ActionsDropdown postId={id}>
            <div className={cn(buttonVariants({ variant: "ghost" }))}>
              <MoreHorizontal className="h-4 w-4" />
            </div>
          </ActionsDropdown>
        </ActionsTopbar>
        <div className="max-w-2xl p-3 md:px-8 md:py-6">
          <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
            {post.post.title}
          </h2>
          <div>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              {post.post.content}
            </p>
          </div>
          <div className="pt-16"></div>
          <div className="flex items-center gap-2">
            <Image
              src={post.author.profileImageUrl}
              alt="Author"
              width={24}
              height={24}
              className="rounded-full"
            />
            <p className="text-sm text-muted-foreground ">
              {post.author.firstName}
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ExamplePostDetailPage;
