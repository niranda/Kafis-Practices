import { GradeLevel } from "libs/enums/src/lib/grade-level";

export class AdminRequestParams{
startDate: number;
endDate: number;
gradeLevel: GradeLevel;
specialty: string;
}