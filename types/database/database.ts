export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      Admins: {
        Row: {
          email: string;
          id: number;
          name: string;
          role: string;
        };
        Insert: {
          email: string;
          id?: number;
          name: string;
          role: string;
        };
        Update: {
          email?: string;
          id?: number;
          name?: string;
          role?: string;
        };
        Relationships: [];
      };
      Attendance: {
        Row: {
          date: string;
          id: number;
          status: Database["public"]["Enums"]["Student Status"];
          student_id: number;
          subject_id: number;
          teacher_id: number;
        };
        Insert: {
          date: string;
          id?: number;
          status: Database["public"]["Enums"]["Student Status"];
          student_id: number;
          subject_id: number;
          teacher_id: number;
        };
        Update: {
          date?: string;
          id?: number;
          status?: Database["public"]["Enums"]["Student Status"];
          student_id?: number;
          subject_id?: number;
          teacher_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "Attendance_student_id_fkey";
            columns: ["student_id"];
            isOneToOne: false;
            referencedRelation: "Students";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Attendance_subject_id_fkey";
            columns: ["subject_id"];
            isOneToOne: false;
            referencedRelation: "Subjects";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Attendance_teacher_id_fkey";
            columns: ["teacher_id"];
            isOneToOne: false;
            referencedRelation: "Teachers";
            referencedColumns: ["id"];
          },
        ];
      };
      Courses: {
        Row: {
          course_duration: number;
          course_name: string;
          id: number;
        };
        Insert: {
          course_duration: number;
          course_name: string;
          id?: number;
        };
        Update: {
          course_duration?: number;
          course_name?: string;
          id?: number;
        };
        Relationships: [];
      };
      Sections: {
        Row: {
          course_id: number;
          id: number;
          section_name: string;
        };
        Insert: {
          course_id: number;
          id?: number;
          section_name: string;
        };
        Update: {
          course_id?: number;
          id?: number;
          section_name?: string;
        };
        Relationships: [
          {
            foreignKeyName: "Sections_course_id_fkey";
            columns: ["course_id"];
            isOneToOne: false;
            referencedRelation: "Courses";
            referencedColumns: ["id"];
          },
        ];
      };
      Students: {
        Row: {
          current_semester: number;
          email: string;
          enrollment_number: number;
          id: number;
          name: string;
        };
        Insert: {
          current_semester: number;
          email: string;
          enrollment_number: number;
          id?: number;
          name: string;
        };
        Update: {
          current_semester?: number;
          email?: string;
          enrollment_number?: number;
          id?: number;
          name?: string;
        };
        Relationships: [];
      };
      Subjects: {
        Row: {
          id: number;
          semester: number;
          subject_name: string;
        };
        Insert: {
          id?: number;
          semester: number;
          subject_name: string;
        };
        Update: {
          id?: number;
          semester?: number;
          subject_name?: string;
        };
        Relationships: [];
      };
      Teacher_Section_Assignment: {
        Row: {
          id: number;
          section_id: number;
          subject_id: number;
          teacher_id: number;
        };
        Insert: {
          id?: number;
          section_id: number;
          subject_id: number;
          teacher_id: number;
        };
        Update: {
          id?: number;
          section_id?: number;
          subject_id?: number;
          teacher_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "Teacher_Section_Assignment_section_id_fkey";
            columns: ["section_id"];
            isOneToOne: false;
            referencedRelation: "Sections";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Teacher_Section_Assignment_subject_id_fkey";
            columns: ["subject_id"];
            isOneToOne: false;
            referencedRelation: "Subjects";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Teacher_Section_Assignment_teacher_id_fkey";
            columns: ["teacher_id"];
            isOneToOne: false;
            referencedRelation: "Teachers";
            referencedColumns: ["id"];
          },
        ];
      };
      Teachers: {
        Row: {
          email: string;
          id: number;
          name: string;
        };
        Insert: {
          email: string;
          id?: number;
          name: string;
        };
        Update: {
          email?: string;
          id?: number;
          name?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      "Student Status": "Present" | "Absent";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;
