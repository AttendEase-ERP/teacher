"use client";

import { redirect, useParams } from "next/navigation";

import SideBar from "@/components/home/SideBar";
import DisplayStudentsListInRealtime from "@/components/Attendance/StudentsList";

import { ArrowLeft } from "lucide-react";

export default function StudentsList() {
  const params = useParams();
  const semester_section = params.semester_section as string;

  return (
    <main className="h-screen bg-backgroundLight flex flex-row gap-10">
      <SideBar />

      <div className="flex flex-col w-full h-screen bg-backgroundLight gap-10">
        <div className="flex flex-row gap-3">
          <ArrowLeft
            className="mt-6 cursor-pointer hover:text-primary duration-200"
            onClick={() => redirect("/")}
          />
          <h1 className="font-bold text-[25px] mt-4">Students List</h1>
        </div>

        <DisplayStudentsListInRealtime />
        <p>Param: {semester_section}</p>
      </div>
    </main>
  );
}
