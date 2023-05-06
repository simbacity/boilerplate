import { Layout } from "@/components/layout/layout";
import { type NextPage } from "next";
import { NewExamplePostForm } from "@/components/example-posts/new-form";

const NewPost: NextPage = () => {
  return (
    <Layout noPadding>
      <NewExamplePostForm />
    </Layout>
  );
};

export default NewPost;
