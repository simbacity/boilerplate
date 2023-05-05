import { Layout } from "@/components/layout/layout";
import { type NextPage } from "next";
import { api } from "@/lib/api";
import { LoadingPage } from "@/components/ui/loading";
import Image from "next/image";
import { Button } from "@/components/ui/button";

type Props = {
  id: string;
};

const ShowPost: NextPage<Props> = ({ id }: Props) => {
  const query = api.examplePost.show.useQuery(id);
  const post = query.data;
  const deleteMutation = api.examplePost.delete.useMutation();

  if (query.isLoading || !post) return <LoadingPage />;

  const onDelete = () => {
    deleteMutation
      .mutateAsync(id)
      .then(() => {
        window.location.href = "/example-posts";
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // todo: this should be a public route
  return (
    <Layout>
      <div className="flex flex-col gap-2 py-2">
        <Button onClick={onDelete}>Delete Post</Button>
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
    </Layout>
  );
};

export function getServerSideProps(context: { params: Props }) {
  return {
    props: { id: context.params.id },
  };
}

export default ShowPost;
