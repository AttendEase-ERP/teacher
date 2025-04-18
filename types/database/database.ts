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
          course_id: number;
          email: string;
          id: number;
          name: string;
          role: string;
        };
        Insert: {
          course_id: number;
          email: string;
          id?: number;
          name: string;
          role: string;
        };
        Update: {
          course_id?: number;
          email?: string;
          id?: number;
          name?: string;
          role?: string;
        };
        Relationships: [
          {
            foreignKeyName: "Admins_course_id_fkey";
            columns: ["course_id"];
            isOneToOne: false;
            referencedRelation: "Courses";
            referencedColumns: ["id"];
          },
        ];
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
          section_id: number;
        };
        Insert: {
          current_semester: number;
          email: string;
          enrollment_number: number;
          id?: number;
          name: string;
          section_id: number;
        };
        Update: {
          current_semester?: number;
          email?: string;
          enrollment_number?: number;
          id?: number;
          name?: string;
          section_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "Students_section_id_fkey";
            columns: ["section_id"];
            isOneToOne: false;
            referencedRelation: "Sections";
            referencedColumns: ["id"];
          },
        ];
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

type DefaultSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {
      "Student Status": ["Present", "Absent"],
    },
  },
} as const;
