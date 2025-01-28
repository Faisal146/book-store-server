import { z } from 'zod';

// Define the Zod schema for UserName
const UserNameSchema = z.object({
  first: z
    .string()
    .max(20, 'First name must be at most 20 characters')
    .regex(/^[A-Za-z]+$/, 'First name must be capitalized')
    .trim(),
  middle: z.string().optional(),
  last: z.string(),
});

// Define the Zod schema for Guardian
const GuardianSchema = z.object({
  fatherName: z.string(),
  fatherOccupation: z.string(),
  fatherContact: z.string(),
  motherName: z.string(),
  motherOccupation: z.string(),
  motherContact: z.string(),
});

// Define the Zod schema for LocalGuardian
const LocalGuardianSchema = z.object({
  name: z.string(),
  Occupation: z.string(),
  contact: z.string(),
  address: z.string(),
});

// Define the Zod schema for Student
const StudentValidationSchema = z.object({
  id: z.string(),
  name: UserNameSchema,
  gender: z.enum(['male', 'female', 'other'], {
    errorMap: () => ({ message: 'Gender must be male, female, or other' }),
  }),
  dateOfBirth: z.string().optional(),
  email: z.string().email('Invalid email format'),
  contactNo: z.string(),
  emergencyContact: z.string(),
  bloodGroup: z
    .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
    .optional(),
  presentAddress: z.string(),
  parmanentAddress: z.string(),
  guardian: GuardianSchema,
  localGuardian: LocalGuardianSchema,
  isActive: z.enum(['active', 'inactive']),
});

export default StudentValidationSchema;
