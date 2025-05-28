"use client";

import { redirect, useParams } from "next/navigation";

import SideBar from "@/components/home/SideBar";
import Calendar from "@/components/Attendance/DatePicker";
import DisplayStudentsList from "@/components/Attendance/DisplayStudentsList";

import { ArrowLeft } from "lucide-react";

export default function StudentsList() {
  const path = useParams();
  const semester = Number(path.semester_section![0]);
  const section = path.semester_section![1];

  return (
    <main className="h-screen bg-background-light flex flex-row gap-10">
      <SideBar />

      <div className="flex flex-col w-full h-screen bg-background-light gap-10">
        <div className="flex flex-row gap-3">
          <ArrowLeft
            className="mt-6 cursor-pointer hover:text-primary duration-200"
            onClick={() => redirect("/")}
          />
          <h1 className="font-bold text-[25px] mt-4">Students List</h1>
        </div>

        <Calendar />

        <DisplayStudentsList semester={semester} section={section} />
      </div>
    </main>
  );
}
