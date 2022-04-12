import { GradeLevel } from "@practice/enums"

export interface AdminReportRequestParams {
  startDate: number;
  endDate: number;
  gradeLevel: GradeLevel;
  specialty: string;
}
