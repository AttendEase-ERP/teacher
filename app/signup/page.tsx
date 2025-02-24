import Button from "@/components/form/Button";
import Input from "@/components/form/Input";
import NextImage from "@/components/Image";
import NextLink from "@/components/Link";
import * as React from "react";

const SignUpForm: React.FC = () => {
  return (
    <main className="bg-[#F1F4FA] flex flex-row h-screen w-screen">
      <div className="bg-white w-[448px] flex flex-col p-8 gap-6">
        <div className="mb-8 self-center">
          <NextImage
            src="/logo.svg"
            alt="logo"
            width={65}
            height={65}
            className="pb-4"
          />
          <h1 className="font-medium text-TitleLarge">Sign Up</h1>
        </div>

        <div className="relative text-center my-4 mb-6">
          <div className="absolute left-1/2 top-1/2 w-[40%] border-b border-gray-300 ml-5"></div>
          <span className="bg-white px-2 text-gray-500 font-medium">Or</span>
          <div className="absolute top-1/2 w-[40%] border-b border-gray-300 ml-5"></div>
        </div>

        <div className="">
          <div className="mb-4">
            <label className="block text-sm font-medium">Email</label>
            <Input
              type="email"
              className="w-full border mt-[.75rem]"
              placeholder="you@example.com"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Password</label>
            <Input
              type="password"
              className="w-full border mt-[.75rem]"
              placeholder="************"
            />
          </div>
        </div>

        <Button className="w-full">Create account</Button>

        <div className="mt-4 text-center text-sm flex justify-center gap-[.25rem]">
          <p className="text-[#788B9A]">Already have an account?</p>
          <NextLink className="" href="">
            Log in
          </NextLink>
        </div>
      </div>

      <div className="flex justify-center items-center h-screen w-[calc(100%-448px)]">
        <NextImage
          src="/sign_in_img_light.svg"
          alt="Sign Up Illustration"
          width={500}
          height={500}
        />
      </div>
    </main>
  );
};

export default SignUpForm;
