import { Layout } from "@/components/layout/layout";
import { type NextPage } from "next";
import { api } from "@/lib/api";
import { LoadingPage } from "@/components/ui/loading";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/router";
import { Loader2 } from "lucide-react";

type Props = {
  id: string;
};

const ShowPost: NextPage<Props> = ({ id }: Props) => {
  const router = useRouter();
  const ctx = api.useContext();
  const query = api.examplePost.show.useQuery(id);
  const post = query.data;
  const deleteMutation = api.examplePost.delete.useMutation({
    onSuccess: async () => {
      toast({
        description: "Your post has been deleted.",
      });

      await ctx.examplePost.list.invalidate();
      await router.push("/example-posts");
    },
  });

  const Post = () => {
    if (!post) return null;

    return (
      <div className="flex flex-col gap-2 py-2">
        <div>
          <Button
            onClick={() => deleteMutation.mutate(id)}
            variant="destructive"
          >
            {deleteMutation.isLoading && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Delete Post
          </Button>
        </div>
        <article className="overflow-hidden bg-white p-4 shadow sm:rounded-lg">
          <Image
            src={post.author.profileImageUrl}
            alt="Author"
            width={30}
            height={30}
            className="rounded-full"
          />
          <div>{post.author.firstName}</div>
          <h3 className="text-xl font-bold">{post.post.title}</h3>
          <p className="my-2">{post.post.content}</p>
        </article>
      </div>
    );
  };

  return <Layout>{post ? <Post /> : <LoadingPage />}</Layout>;
};

export function getServerSideProps(context: { params: Props }) {
  return {
    props: { id: context.params.id },
  };
}

export default ShowPost;
