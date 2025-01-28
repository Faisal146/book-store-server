import { Request, Response } from 'express';
import { StudentServices } from './student.service';
import StudentValidationSchema from './student.validation';

const createStudent = async (req: Request, res: Response) => {
  //data validation with zod

  try {
    const { student } = req.body;
    const zodParsedData = StudentValidationSchema.parse(student);

    // const { error, value } = NewStudentSchema.validate(student);
    // console.log(error, value);

    // if (error) {
    //   res.status(200).json({
    //     message: 'Student is not created successfully',
    //     error,
    //   });
    // }

    const result = await StudentServices.createStudentIntoDB(zodParsedData);

    res.status(200).json({
      message: 'Student is created successfully',
      result,
    });

    // will col service func to send this data
  } catch (error: any) {
    // send response

    // send error response
    res.status(500).json({
      message: error.message || 'Student is not created successfully',
      error,
    });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();
    res.status(200).json({
      message: 'Students are retrived successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentid } = req.params;

    const result = await StudentServices.getSingleStudentFromDB(studentid);
    res.status(200).json({
      message: 'Student is retrived successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

export const StudentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
};
