import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

const findLastStudentId = async (): Promise<string | undefined> => {
  const lastStudent = await User.findOne(
    { role: 'student' },
    { id: 1, _id: 0 }
  )
    .sort({ createdAt: -1 })
    .lean();

  // Extract the last 4 digits or return undefined if no student is found
  return lastStudent?.id;
};

export const generateStudentId = async (payload: TAcademicSemester): Promise<string> => {
  const lastStudentId = await findLastStudentId();

  // Extract parts of the lastStudentId if it exists
  const lastStudentYear = lastStudentId?.substring(0, 4); // Extract year (YYYY)
  const lastStudentSemesterCode = lastStudentId?.substring(4, 6); // Extract semester code (SS)
  const lastStudentNumber = lastStudentId?.substring(6); // Extract numeric part (NNNN)

  // Current semester and year
  const currentYear = payload.year;
  const currentSemesterCode = payload.code;

  let newIdNumber = 1; // Default start for ID number
  if (
    lastStudentId &&
    lastStudentYear === currentYear &&
    lastStudentSemesterCode === currentSemesterCode
  ) {
    // Increment the last numeric part if the year and semester match
    newIdNumber = Number(lastStudentNumber) + 1;
  }

  // Construct the new student ID
  const incrementId = newIdNumber.toString().padStart(4, '0'); // Ensure 4-digit format
  const newStudentId = `${currentYear}${currentSemesterCode}${incrementId}`;

  return newStudentId;
};
