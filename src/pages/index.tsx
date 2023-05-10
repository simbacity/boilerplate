import { type NextPage } from "next";
import Image from "next/image";

const Home: NextPage = () => {
  return (
    <>
      <Image
        src="/screenshot-app.png"
        alt="screenshot of app"
        width={2310}
        height={1118}
        className="rounded-t-3xl border border-b-0 shadow-2xl 2xl:rounded-3xl 2xl:border-b"
      />
    </>
  );
};

export default Home;
