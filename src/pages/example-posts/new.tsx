import { Layout } from "@/components/layout/layout";
import { type NextPage } from "next";
import { NewExamplePostForm } from "@/components/example-posts/pages/new.page";

const NewPost: NextPage = () => {
  return (
    <Layout noPadding fullScreenOnMobile>
      <NewExamplePostForm />
    </Layout>
  );
};

export default NewPost;
