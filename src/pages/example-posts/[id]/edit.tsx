import { Layout } from "@/components/layout/layout";
import { type NextPage } from "next";
import { EditExamplePostForm } from "@/components/example-posts/edit-form";

type Props = {
  id: string;
};

const EditPost: NextPage<Props> = ({ id }: Props) => {
  return (
    <Layout noPadding fullScreenOnMobile>
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
