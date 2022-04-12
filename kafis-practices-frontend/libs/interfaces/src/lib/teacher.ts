import { Student } from './student';
import { PracticeDates } from './practice-dates';

export interface Teacher {
  id: number;
  fullName: string;
  position: string;
  userId: number;
  practiceDatesId: number;
  practiceDates: PracticeDates;
  isDeleted: boolean;
  students: Student[];
}
