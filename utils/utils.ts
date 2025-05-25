import { idb, Teachers } from "@/lib/indexedDB/idb";

import { teacherType } from "@/types/teacher/teacher";

const formatTeacherData = (teacherData: teacherType): Teachers[] => {
  if (!teacherData) return [];

  return teacherData.map((item) => ({
    id: item.id,
    name: item.Teachers.name,
    email: item.Teachers.email,
    section_id: item.section_id,
    subject_id: item.subject_id,
    teacher_id: item.teacher_id,
    subject_name: item.Subjects.subject_name,
    semester: item.Subjects.semester,
    section_name: item.Sections.section_name,
    course_id: item.Sections.course_id,
    course_name: item.Sections.Courses.course_name,
    course_duration: item.Sections.Courses.course_duration,
  }));
};

const fetchDateFromIDB = async (): Promise<Date | undefined> => {
  const existing = await idb.SelectedDateForAttendance.get(1);
  if (existing?.date) {
    return new Date(existing.date);
  }
  return undefined;
};

export { formatTeacherData, fetchDateFromIDB };
