import { Layout } from "@/components/layout/layout";
import { type NextPage } from "next";
import { NewExamplePostForm } from "@/components/forms/new-example-post-form";

const NewPost: NextPage = () => {
  return (
    <Layout noPadding>
      <NewExamplePostForm />
    </Layout>
  );
};

export default NewPost;
