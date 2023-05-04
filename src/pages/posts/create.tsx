import { Layout } from "@/components/layout/layout";
import { type NextPage } from "next";
import { api } from "@/lib/api";
import { CreateExamplePostForm } from "@/components/forms/example-post/create-example-post-form";

const CreatePost: NextPage = () => {
  const query = api.examplePost.list.useQuery();
  const posts = query.data;

  return (
    <Layout>
      <div className="flex flex-col gap-2 py-2">
        {posts &&
          posts.map((post) => (
            <article
              key={post.id}
              className="overflow-hidden bg-white p-4 shadow sm:rounded-lg"
            >
              <h3 className="text-xl font-bold">{post.title}</h3>
              <p className="my-2">{post.content}</p>
            </article>
          ))}
      </div>

      <div className="pt-8" />
      <div className="space-y-2 pb-5">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
          Create a new post
        </h1>
        <p className="text-lg text-muted-foreground">
          Renders an accessible label associated with controls.
        </p>
      </div>
      <CreateExamplePostForm />
    </Layout>
  );
};

export default CreatePost;
