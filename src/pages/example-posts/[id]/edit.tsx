import { Layout } from "@/components/layout/layout";
import { type NextPage } from "next";
import { EditExamplePostForm } from "@/components/forms/edit-example-post-form";

type Props = {
  id: string;
};

const EditPost: NextPage<Props> = ({ id }: Props) => {
  return (
    <Layout>
      <EditExamplePostForm id={id} />
    </Layout>
  );
};

export function getServerSideProps(context: { params: Props }) {
  return {
    props: { id: context.params.id },
  };
}

export default EditPost;
