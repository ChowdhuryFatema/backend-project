import { NextFunction, Request, Response } from "express";
import { UserServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";

const createStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { password, student: studentData } = req.body;
  
      // data validation using joi
      // const { error, value } = studentValidationSchema.validate(studentData);
  
    //   const zodParseData = studentValidationSchema.parse(studentData);
  
      const result = await UserServices.createStudentIntoDB(password, studentData);
      sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Student is created successfully',
        data: result
      })
    } catch (error) {
     next(error)
    }
  };

  export const UserController = {
    createStudent
  }