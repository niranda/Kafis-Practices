import { GradeLevel } from "@practice/enums";

export interface AdminOrderResponse {
  year: number;
  gradeLevel: GradeLevel;
  specialty: string;
  specialization: string;
  startDate: string;
  endDate: string;
  studentOrders: {
    organizationName: string;
    students: {
      studentName: string;
      teacherPosition: string;
      teacherName: string;
    }[];
  }[];
}
