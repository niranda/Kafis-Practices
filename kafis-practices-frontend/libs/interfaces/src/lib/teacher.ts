import { Student } from "./student";

export interface Teacher {
  id: number;
  fullName: string;
  position: string;
  userId: number;
  isDeleted: boolean;
  students: Student[];
}
