// import Joi from 'joi';

// const UserNameSchema = Joi.object({
//   first: Joi.string()
//     .max(20)
//     .trim()
//     .pattern(/^[A-Za-z]+$/, 'only alphabets')
//     .required()
//     .messages({
//       'string.pattern.base': 'First name must be capitalized',
//     }),
//   middle: Joi.string().optional(),
//   last: Joi.string().required(),
// });

// // Define the Joi schema for Guardian
// const GuardianSchema = Joi.object({
//   fatherName: Joi.string().required(),
//   fatherOccupation: Joi.string().required(),
//   fatherContact: Joi.string().required(),
//   motherName: Joi.string().required(),
//   motherOccupation: Joi.string().required(),
//   motherContact: Joi.string().required(),
// });

// // Define the Joi schema for LocalGuardian
// const LocalGuardianSchema = Joi.object({
//   name: Joi.string().required(),
//   Occupation: Joi.string().required(),
//   contact: Joi.string().required(),
//   address: Joi.string().required(),
// });

// // Define the Joi schema for Student
// const NewStudentSchema = Joi.object({
//   id: Joi.string().required(),
//   name: UserNameSchema.required(),
//   gender: Joi.string().valid('male', 'female', 'other').required().messages({
//     'any.only': 'Gender must be male, female, or other',
//   }),
//   dateOfBirth: Joi.string().optional(),
//   email: Joi.string().email().required().messages({
//     'string.email': 'Invalid email format',
//   }),
//   contactNo: Joi.string().required(),
//   emergencyContact: Joi.string().required(),
//   bloodGroup: Joi.string()
//     .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
//     .optional(),
//   presentAddress: Joi.string().required(),
//   parmanentAddress: Joi.string().required(),
//   guardian: GuardianSchema.required(),
//   localGuardian: LocalGuardianSchema.required(),
// });

// export default NewStudentSchema;
