"use client";

import React from "react";

import { createClient } from "@/utils/supabase/client";

export default function DisplayStudentsListInRealtime() {
  const supabase = createClient();

  React.useEffect(() => {
    const channel = supabase
      .channel("get_students_list_in_realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "Students" },
        (payload) => {
          console.log(payload);
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  return (
    <h1>
      Students list (check console)
    </h1>
  )
}
