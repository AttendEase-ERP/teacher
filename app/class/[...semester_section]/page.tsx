import SideBar from "@/components/home/SideBar";
import DisplayStudentsListInRealtime from "@/components/Attendance/StudentsList";

import { ArrowLeft } from "lucide-react";

export default async function StudentsList({
  params,
}: {
  params: Promise<{ semester_section: string }>;
}) {
  const { semester_section } = await params;

  return (
    <main className="h-screen bg-backgroundLight flex flex-row gap-10">
      <SideBar />

      <div className="flex flex-col w-full h-screen bg-backgroundLight gap-10">
        <div className="flex flex-row gap-3">
          <ArrowLeft className="mt-6 cursor-pointer hover:text-primary duration-200" />
          <h1 className="font-bold text-[25px] mt-4">Students List</h1>
        </div>

        <DisplayStudentsListInRealtime />
        <p>Param: {semester_section}</p>
      </div>
    </main>
  );
}
