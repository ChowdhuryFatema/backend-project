import mongoose from 'mongoose';
import config from '../../config';
import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';
import { AppError } from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // Find academic semester info
    const admissionSemester = await AcademicSemester.findById(payload.admissionSemester).session(session);
    if (!admissionSemester) {
      throw new AppError(StatusCodes.NOT_FOUND, 'Admission semester not found');
    }

    // Generate student ID
    const generatedId = await generateStudentId(admissionSemester);
    if (!generatedId) {
      throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to generate student ID');
    }

    // Create user object
    const userData: Partial<TUser> = {
      id: generatedId,
      password: password || (config.default_password as string),
      role: 'student',
    };

    // Create user (transaction-1)
    const newUser = await User.create([{ ...userData }], { session });
    if (!newUser.length) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to create user');
    }

    // Link user ID to student payload
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    // Create student (transaction-2)
    const newStudent = await Student.create([payload], { session });
    if (!newStudent.length) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to create student');
    }

    // Commit transaction
    await session.commitTransaction();
    return newStudent;

  } catch (error) {
    await session.abortTransaction();
    console.error('Transaction error:', error);
    throw new Error('Failed to create User'); 
  } finally {
    await session.endSession();
  }
};


export const UserServices = {
  createStudentIntoDB,
};
