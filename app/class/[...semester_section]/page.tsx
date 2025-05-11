import SideBar from "@/components/home/SideBar";

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
        <h1 className="font-bold text-[25px] mt-4">Students List</h1>
        <p>Param: {semester_section}</p>
      </div>
    </main>
  );
}
