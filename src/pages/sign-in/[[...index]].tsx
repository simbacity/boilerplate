import { SignIn } from "@clerk/nextjs";
import { type NextPage } from "next";

const SignInPage: NextPage = () => (
  <main className="flex h-screen flex-col items-center text-white">
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-8">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Sign In
        </h1>
        <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
      </div>
    </div>
  </main>
);

export default SignInPage;
