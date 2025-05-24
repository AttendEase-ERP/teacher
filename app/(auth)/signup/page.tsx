import * as React from "react";

import Button from "@/components/form/Button";
import Input from "@/components/form/Input";
import NextImage from "@/components/Image";
import NextLink from "@/components/Link";

import { signUp } from "@/lib/auth/auth";

export default function SignUpForm() {
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

        <form action={signUp}>
          <div>
            <div className="mb-4">
              <label className="block text-sm font-medium" htmlFor="email">
                Email
              </label>
              <Input
                type="email"
                name="email"
                className="w-full border mt-[.75rem]"
                placeholder="you@example.com"
                id="email"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium" htmlFor="password">
                Password
              </label>
              <Input
                type="password"
                name="password"
                className="w-full border mt-[.75rem]"
                placeholder="************"
                id="password"
                required
              />
            </div>
          </div>

          <Button type="submit">Create account</Button>
        </form>

        <div className="mt-4 text-center text-sm flex justify-center gap-[.25rem]">
          <p className="text-[#788B9A]">Already have an account?</p>
          <NextLink href="/signin" underline={true}>
            Log in
          </NextLink>
        </div>
      </div>

      <div className="flex justify-center items-center h-screen w-[calc(100%-448px)]">
        <NextImage
          src="/sign_up_img_light.svg"
          alt="Sign Up Illustration"
          width={500}
          height={500}
          className="h-auto w-auto"
        />
      </div>
    </main>
  );
}
