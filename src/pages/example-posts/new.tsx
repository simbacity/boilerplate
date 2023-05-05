import { Layout } from "@/components/layout/layout";
import { type NextPage } from "next";
import { NewExamplePostForm } from "@/components/forms/new-example-post-form";

const NewPost: NextPage = () => {
  return (
    <Layout noPadding={true}>
      <div className="space-y-2 pb-5">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
          Create a new post
        </h1>
        <p className="text-lg text-muted-foreground">
          Renders an accessible label associated with controls.
        </p>
      </div>
      <NewExamplePostForm />
    </Layout>
  );
};

export default NewPost;
