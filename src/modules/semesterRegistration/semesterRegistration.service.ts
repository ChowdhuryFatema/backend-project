import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { SemesterRegistration } from './semesterRegistration.model';
import { AppError } from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import { TSemesterRegistration } from './semesterRegistration.interface';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { RegistrationStatus } from './SemesterRegistration.constant';

const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration,
) => {
  const academicSemester = payload?.academicSemester;

  //check if there any registered semester that is already 'UPCOMING' | 'ONGOING'

  const isThereAnyUpcomingOrOngoingSemester = await SemesterRegistration.findOne({
    $or: [
        {status: RegistrationStatus.UPCOMING}, {status: RegistrationStatus.ONGOING}
    ]
  })

  if(isThereAnyUpcomingOrOngoingSemester){
    throw new AppError(
        StatusCodes.BAD_REQUEST,
        `There is already an ${isThereAnyUpcomingOrOngoingSemester.status} register semester !`,
      );
  }

  const isAcademicSemesterExists =
    await AcademicSemester.findById(academicSemester);

  // check if the semester is exist
  if (!isAcademicSemesterExists) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      'This academic semester not found !',
    );
  }

  const isSemesterRegistrationExists = await SemesterRegistration.findOne({
    academicSemester,
  });

  if (isSemesterRegistrationExists) {
    throw new AppError(
      StatusCodes.CONFLICT,
      'This semester is already registered !',
    );
  }

  const result = await SemesterRegistration.create(payload);
  return result;
};

const getAllSemesterRegistrationFromDB = async (
  query: Record<string, unknown>,
) => {
  const semesterRegistrationQuery = new QueryBuilder(
    SemesterRegistration.find().populate('academicSemester'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await semesterRegistrationQuery.modelQuery;
  return result;
};
const getSingleSemesterRegistrationFromDB = async (id: string) => {
  const result = await SemesterRegistration.findById(id).populate(
    'academicSemester',
  );
  return result;
};

const updateSemesterRegistrationIntoDB = async (
  id: string,
  payload: Partial<TSemesterRegistration>,
) => {

    // check if the requested registered semester is exists
    const isSemesterRegistrationExists = await SemesterRegistration.findById(id);
    
      if (!isSemesterRegistrationExists) {
        throw new AppError(
          StatusCodes.NOT_FOUND,
          'This semester is not found !',
        );
      }



    //  if the requested semester registration is ended, we will not update anything
    const currentSemesterStatus = isSemesterRegistrationExists?.status;
    const requestedStatus = payload?.status;

    if(currentSemesterStatus === RegistrationStatus.ENDED){
        throw new AppError(StatusCodes.BAD_REQUEST, `This semester is already ${currentSemesterStatus}`)
    }

    if(currentSemesterStatus === RegistrationStatus.UPCOMING && requestedStatus === RegistrationStatus.ENDED){
        throw new AppError(StatusCodes.BAD_REQUEST, `You can not directly change status from ${currentSemesterStatus} to ${requestedStatus}`)
    }
    if(currentSemesterStatus === RegistrationStatus.ONGOING && requestedStatus === RegistrationStatus.UPCOMING){
        throw new AppError(StatusCodes.BAD_REQUEST, `You can not directly change status from ${currentSemesterStatus} to ${requestedStatus}`)
    }


};

export const SemesterRegistrationServices = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationFromDB,
  getSingleSemesterRegistrationFromDB,
  updateSemesterRegistrationIntoDB,
};
