"use server";

import { createClient } from "@/utils/supabase/server";

// Function to fetch teacher data from the database
export async function fetchTeacherDetailsFromDatabase(
  email: string | undefined,
) {
  if (email == undefined) {
    return undefined;
  }

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("Teachers")
    /* .select(
      `
      *,
      Teacher_Section_Assignment (*),
      Subjects (*),
      Sections (*),
      Courses (*)`,
    ) */
    .select("*")
    .eq("email", email)
    .single();

  if (!error) {
    return data;
  } else {
    return error;
  }
}
