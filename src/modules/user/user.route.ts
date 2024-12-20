import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { adminValidations, createAdminValidationSchema } from '../Admin/admin.validation';
import { createFacultyValidationSchema, facultyValidations } from '../Faculty/faculty.validation';
import { UserControllers } from './user.controller';
import { studentValidations } from '../student/student.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';

const router = express.Router();

router.post(
  '/create-student',
  // auth(USER_ROLE.admin),
  validateRequest(studentValidations.createStudentValidationSchema),
  UserControllers.createStudent,
);

router.post(
  '/create-faculty',
  // auth(USER_ROLE.admin),
  validateRequest(facultyValidations.createFacultyValidationSchema),
  UserControllers.createFaculty,
);

router.post(
  '/create-admin',
  // auth(USER_ROLE.admin),
  validateRequest(adminValidations.createAdminValidationSchema),
  UserControllers.createAdmin,
);

export const UserRoutes = router;
