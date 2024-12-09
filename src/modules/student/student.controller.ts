import { NextFunction, Request, RequestHandler, Response } from 'express';
import { StudentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';


const getAllStudents = catchAsync(async (req, res) => {

    const query = req.query;
    const result = await StudentServices.getAllStudentsFromDB(query);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Student are retrieved successfully',
      data: result,
    });
});

const getSingleStudent = catchAsync(async (req, res) => {

    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(studentId);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Student is retrieved successfully',
      data: result,
    });
})

const updateStudent = catchAsync(async (req, res) => {

    const { studentId } = req.params;
    const {student} = req.body;
    const result = await StudentServices.updateStudentFromDB(studentId, student);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Student is updated successfully',
      data: result,
    });
})


const deleteStudent = catchAsync(async (req, res) => {

    const { studentId } = req.params;
    const result = await StudentServices.deleteStudentFromDB(studentId);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Student is deleted successfully',
      data: result,
    });
})

export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
  updateStudent,
};
