import { GradeLevel } from "@practice/enums"

export interface AdminReportRequestParams {
  year: number;
  gradeLevel: GradeLevel;
  specialty: string;
}
