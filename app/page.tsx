"use client";

import { signOut } from "@/lib/auth/auth";

import Button from "@/components/form/Button";
import SideBar from "@/components/home/SideBar";

import { useTeacherContext } from "@/contexts/teacherContext";

export default function Home() {
  const teacherDetails = useTeacherContext();

  return (
    <main className="flex items-center justify-center h-screen bg-backgroundLight">
      <SideBar />

      <h1>Welcome to Home Page</h1>
      <Button onClick={signOut}>Sign out</Button>

      <p>
        Teacher name:{" "}
        {teacherDetails ? teacherDetails.name : "No teacher found"}
      </p>
    </main>
  );
}
