import { Layout } from "@/components/layout/layout";
import { type NextPage } from "next";

const Dashboard: NextPage = () => {
  return (
    <Layout>
      <div className="pb-3">
        <h1 className="scroll-m-20 text-2xl font-bold tracking-tight">
          Welcome to luno!
        </h1>
        <p className="text-sm text-muted-foreground">
          The fast and easy way to create new products.
        </p>
      </div>
    </Layout>
  );
};

export default Dashboard;
