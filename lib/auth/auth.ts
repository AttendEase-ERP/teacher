"use server";

import { createClient } from "@/utils/supabase/server";

import { redirect } from "next/navigation";

export async function signUp(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
  });

  if (error) {
    console.log("Error: ", error.message);
    return;
  }

  redirect("/signin");
}
