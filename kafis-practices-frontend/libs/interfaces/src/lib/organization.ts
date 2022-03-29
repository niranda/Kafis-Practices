import { Student } from "./student";

export interface Organization {
  id: number;
  name: string;
  city: string;
  isDeleted: boolean;
  students: Student[];
}
