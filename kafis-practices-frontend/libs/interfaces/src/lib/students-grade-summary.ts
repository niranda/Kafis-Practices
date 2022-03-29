import { GradeLetter } from "@practice/enums";

export interface StudentsGradesSummary {
  gradeLetter: GradeLetter;
  amount: number;
  percent: number;
}
