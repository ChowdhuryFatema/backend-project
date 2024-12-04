import express, { NextFunction, Request, Response } from 'express';
import { UserController } from './user.controller';
import { AnyZodObject } from 'zod';
import { studentValidations } from '../student/student.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();



router.post(
  '/create-user',
  validateRequest(studentValidations.createStudentValidationSchema),
  UserController.createStudent,
);

export const UserRoutes = router;
