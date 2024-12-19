import mongoose from 'mongoose';
import { Student } from './student.model';
import { AppError } from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import { User } from '../user/user.model';
import { TStudent } from './student.interface';
import { studentSearchAbleFields } from './student.constant';
import QueryBuilder from '../../builder/QueryBuilder';

const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  // console.log('query', query);
  // const queryObj = { ...query };

  // const studentSearchAbleFields = ['email', 'name.firstName', 'presentAddress'];
  // let searchTerm = '';

  // if (query?.searchTerm) {
  //   searchTerm = query.searchTerm as string;
  // }

  // const searchQuery = Student.find({
  //   $or: studentSearchAbleFields.map((field) => ({
  //     [field]: { $regex: searchTerm, $options: 'i' },
  //   })),
  // });

  // // Filtering

  // const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];

  // excludeFields.forEach((el) => delete queryObj[el]);

  // const filterQuery = searchQuery
  //   .find(queryObj)
  //   .populate('admissionSemester')
  //   .populate({
  //     path: 'academicDepartment',
  //     populate: {
  //       path: 'academicFaculty',
  //     },
  //   });

  // let sort = '-createdAt';
  // if (query.sort) {
  //   sort = query.sort as string;
  // }

  // const sortQuery = filterQuery.sort(sort);

  // let page = 1;
  // let limit = 1;
  // let skip = 0;

  // if (query.page) {
  //   page = Number(query.page);
  //   skip = (page - 1) * limit;
  // }

  // const paginateQuery = sortQuery.skip(skip);

  // if (query.limit) {
  //   limit = Number(query.limit);
  // }

  // const limitQuery = paginateQuery.limit(limit);


  // let fields = '-__v';

  // if(query.fields){
  //   fields = (query.fields as string).split(',').join(' ');
  //   console.log({fields})
  // }

  // const fieldQuery = await limitQuery.select(fields)

  // return fieldQuery;


  const studentQuery = new QueryBuilder(Student.find()
  .populate('user')
  .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    }), query)
  .search(studentSearchAbleFields)
  .filter()
  .sort()
  .paginate()
  .fields()

  const result = await studentQuery.modelQuery;
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  // const result = await Student.findOne({ id });

  const result = await Student.findById( id )
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });

  return result;
};

const updateStudentFromDB = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payload;

  // Initialize modified data
  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  // Process 'name'
  if (name) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value; // Use dot notation for nested updates
    }
  }

  // Process 'guardian'
  if (guardian) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value; // Use dot notation
    }
  }

  // Process 'localGuardian'
  if (localGuardian) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value; // Use dot notation
    }
  }

  // Log for debugging
  console.log('Modified Update Data:', modifiedUpdatedData);

  // Perform the update
  const result = await Student.findByIdAndUpdate(id,
    { $set: modifiedUpdatedData }, // Use $set for updates
    { new: true, runValidators: true }, // Return updated document and run validators
  );

  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    // Start the transaction
    session.startTransaction();

    const deletedStudent = await Student.findByIdAndUpdate(id,
      { isDeleted: true },
      { new: true, session }, // Pass session explicitly
    );

    if (!deletedStudent) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to delete student');
    }

    const userId = deletedStudent.user;

    const deletedUser = await User.findByIdAndUpdate(userId,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUser) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to delete user');
    }

    // Commit the transaction
    await session.commitTransaction();
    return deletedStudent;
  } catch (error) {
    // Abort the transaction in case of an error
    await session.abortTransaction();
    throw new Error('Failed to delete Student');
  } finally {
    // End the session to clean up resources
    session.endSession();
  }
};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
  updateStudentFromDB,
};
