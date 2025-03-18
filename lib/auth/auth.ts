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

export async function signIn(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });

  if (error) {
    console.log("Error: ", error.message);
    return;
  }

  redirect("/");
}

export async function signOut() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.log("Error: ", error.message);
    return;
  }

  redirect("/signin");
}

// check if user is already signed in or not(using local session, on the client side/local storage)
export async function retrieveUser() {
  const supabase = await createClient();

  const { data } = await supabase.auth.getSession();

  return !!data.session;
}
