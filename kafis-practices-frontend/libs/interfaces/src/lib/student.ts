import { PracticeDates } from './practice-dates';
import { GradeLevel } from "@practice/enums"
import { Organization } from './organization';
import { Teacher } from "./teacher";

export interface Student {
  id: number;
  fullName: string;
  year: number;
  gradeLevel: GradeLevel;
  specialty: string;
  specialization: string;
  groupCode: string;
  grade: number;
  reportFileName: string | null;
  isDeleted: boolean;
  teacherId: number;
  organizationId: number;
  practiceDatesId: number;
  teacher: Teacher;
  organization: Organization;
  practiceDates: PracticeDates;
}
