import express from 'express';
import { StudentControllers } from './student.controller';

const router = express.Router();


router.get('/', StudentControllers.getAllStudents);
router.get('/:studentId', StudentControllers.getSingleStudent);

router.post('/create-student', StudentControllers.createStudent);

router.delete('/:studentId', StudentControllers.deleteStudent);

export const StudentRoutes = router;
