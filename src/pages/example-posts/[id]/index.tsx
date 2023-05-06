import { Layout } from "@/components/layout/layout";
import { type NextPage } from "next";
import { api } from "@/lib/api";
import { LoadingPage } from "@/components/ui/loading";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MoreHorizontal } from "lucide-react";
import { ActionsTopbar } from "@/components/layout/actions-topbar";
import Link from "next/link";

import { ActionsDropdown } from "@/components/example-posts/actions-dropdown";

type Props = {
  id: string;
};

const ShowPost: NextPage<Props> = ({ id }: Props) => {
  const query = api.examplePost.show.useQuery(id);
  const post = query.data;

  const Post = () => {
    if (!post) return null;

    return (
      <div>
        <ActionsTopbar>
          <Link href="/example-posts">
            <Button variant="ghost">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </Link>
          <ActionsDropdown postId={id}>
            <Button variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </ActionsDropdown>
        </ActionsTopbar>
        <div className="max-w-2xl px-8 py-6">
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
    );
  };

  return <Layout noPadding>{post ? <Post /> : <LoadingPage />}</Layout>;
};

export function getServerSideProps(context: { params: Props }) {
  return {
    props: { id: context.params.id },
  };
}

export default ShowPost;
