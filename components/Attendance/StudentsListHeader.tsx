export default function StudentListHeader() {
  return (
    <div className="grid grid-cols-6 gap-4 px-4 py-2 font-semibold text-sm text-gray-600 bg-muted rounded-md">
      <div>Enrollment No.</div>
      <div>Name</div>
      <div>Email</div>
      <div>Date</div>
      <div>Status</div>
    </div>
  );
}
