import { type NextPage } from "next";
import Image from "next/image";

const Home: NextPage = () => {
  return (
    <Image
      src="/screenshot-app.png"
      alt="screenshot of app"
      width={2310}
      height={1118}
    />
  );
};

export default Home;
