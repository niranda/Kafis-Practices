import { GradeLevel } from "@practice/enums"
import { StudentsGradesSummary } from "./students-grade-summary";

export interface AdminReportResponse {
  year: number;
  gradeLevel: GradeLevel;
  specialty: string;
  organizationsAmount: number;
  organizationsNames: string[];
  allStudentsAmount: number;
  successfulStudentsAmount: number;
  failedStudentsAmount: number;
  studentsGradesSummary: StudentsGradesSummary[];
}
