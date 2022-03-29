import { GradeLevel } from "@practice/enums"

export interface PracticeDates {
  id: number;
  startDate?: string;
  endDate?: string;
  gradeLevel: GradeLevel;
}
