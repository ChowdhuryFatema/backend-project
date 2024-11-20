import { z } from 'zod';

const studentValidationSchema = z.object({
  id: z.string().min(1, 'Student ID is required'),
  name: z.object({
    firstName: z
      .string()
      .min(1, 'First Name is required')
      .max(10, 'First Name cannot be more than 10 characters')
      .refine(
        (value) => value.charAt(0).toUpperCase() + value.slice(1) === value,
        {
          message: 'First Name must start with a capital letter',
        },
      ),
    middleName: z.string(),
    lastName: z
      .string()
      .min(1, 'Last Name is required')
      .refine((value) => /^[a-zA-Z]+$/.test(value), {
        message: 'Last Name must be alphabetic',
      }),
  }),
  gender: z.enum(['male', 'female', 'other'], {
    errorMap: () => ({ message: 'Gender is required' }),
  }),
  dateOfBirth: z.string().min(1, 'Date of Birth is required'),
  email: z.string().email('Invalid email format').min(1, 'Email is required'),
  contactNo: z.string().min(1, 'Contact Number is required'),
  emergencyContactNo: z.string().min(1, 'Emergency Contact Number is required'),
  bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
    errorMap: () => ({ message: 'Blood Group is required' }),
  }),
  presentAddress: z.string().min(1, 'Present Address is required'),
  permanentAddress: z.string().min(1, 'Permanent Address is required'),
  guardian: z.object({
    fatherName: z.string().min(1, 'Father Name is required'),
    fatherOccupation: z.string().min(1, 'Father Occupation is required'),
    fatherContactNo: z.string().min(1, 'Father Contact Number is required'),
    motherName: z.string().min(1, 'Mother Name is required'),
    motherOccupation: z.string().min(1, 'Mother Occupation is required'),
    motherContactNo: z.string().min(1, 'Mother Contact Number is required'),
  }),
  localGuardian: z.object({
    name: z.string().min(1, 'Local Guardian Name is required'),
    occupation: z.string().min(1, 'Local Guardian Occupation is required'),
    contactNo: z.string().min(1, 'Local Guardian Contact Number is required'),
    address: z.string().min(1, 'Local Guardian Address is required'),
  }),
  profileImg: z.string().min(1, 'Profile Image is required'),
  isActive: z.enum(['active', 'blocked']).default('active'),
});

export default studentValidationSchema;
