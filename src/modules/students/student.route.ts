import express from 'express';
import { StudentControllers } from './student.controllar';

const router = express.Router();

// will call controllar function
router.post('/create-student', StudentControllers.createStudent);
router.get('/', StudentControllers.getAllStudents);
router.get('/:studentid', StudentControllers.getSingleStudent);

export const studentRoutes = router;
