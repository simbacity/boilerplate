import { Layout } from "@/components/layout/layout";
import { type NextPage } from "next";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LoadingPage } from "@/components/ui/loading";
import Image from "next/image";

const ListPosts: NextPage = () => {
  const query = api.examplePost.list.useQuery();
  const posts = query.data;

  if (query.isLoading || !posts) return <LoadingPage />;

  return (
    <Layout>
      <div className="flex flex-col gap-2 py-2">
        <Link href="example-posts/create">
          <Button>Create post</Button>
        </Link>
        {posts &&
          posts.map((post) => (
            <article
              key={post.post.id}
              className="overflow-hidden bg-white p-4 shadow sm:rounded-lg"
            >
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
          ))}
      </div>
    </Layout>
  );
};

export default ListPosts;
