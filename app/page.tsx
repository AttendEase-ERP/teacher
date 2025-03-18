"use client";

import * as React from "react";
import { useRouter, usePathname } from "next/navigation";
import { retrieveUser } from "@/lib/auth/auth";

export default function Home() {
  const router = useRouter();
  const pathname = usePathname();

  React.useEffect(() => {
    async function checkUser() {
      const session = await retrieveUser();

      if (session && pathname !== "/") {
        // If user is signed in and NOT on '/', redirect to home
        router.replace("/");
      } else if (!session && pathname !== "/signin") {
        // If user is NOT signed in and NOT on '/signin', redirect to signin
        router.replace("/signin");
      }
    }

    checkUser();
  }, []);

  return (
    <main className="flex items-center justify-center h-screen">
      Hello World <br />
      !!This is a temporary logic... Needs to be checked if working fine or
      not!!
    </main>
  );
}
