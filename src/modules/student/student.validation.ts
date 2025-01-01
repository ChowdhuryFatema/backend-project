import { z } from 'zod';

const nameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1, 'First Name is required')
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
});
const guardianValidationSchema = z.object({
  fatherName: z.string().min(1, 'Father Name is required'),
  fatherOccupation: z.string().min(1, 'Father Occupation is required'),
  fatherContactNo: z.string().min(1, 'Father Contact Number is required'),
  motherName: z.string().min(1, 'Mother Name is required'),
  motherOccupation: z.string().min(1, 'Mother Occupation is required'),
  motherContactNo: z.string().min(1, 'Mother Contact Number is required'),
});

const localGuardianValidationSchema = z.object({
  name: z.string().min(1, 'Local Guardian Name is required'),
  occupation: z.string().min(1, 'Local Guardian Occupation is required'),
  contactNo: z.string().min(1, 'Local Guardian Contact Number is required'),
  address: z.string().min(1, 'Local Guardian Address is required'),
});

const createStudentValidationSchema = z.object({
  body: z.object({
    password: z
      .string()
      .max(20, 'password can not be more then 20 character').optional(),
    student: z.object({
      name: nameValidationSchema,
      gender: z.enum(['male', 'female', 'other'], {
        errorMap: () => ({ message: 'Gender is required' }),
      }),
      dateOfBirth: z.string().optional(),
      email: z
        .string()
        .email('Invalid email format')
        .min(1, 'Email is required'),
      contactNo: z.string().min(1, 'Contact Number is required'),
      emergencyContactNo: z
        .string()
        .min(1, 'Emergency Contact Number is required'),
      bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
        errorMap: () => ({ message: 'Blood Group is required' }),
      }),
      presentAddress: z.string().min(1, 'Present Address is required'),
      permanentAddress: z.string().min(1, 'Permanent Address is required'),
      guardian: guardianValidationSchema,
      localGuardian: localGuardianValidationSchema,
      admissionSemester: z.string(),
      academicDepartment: z.string(),
      // profileImg: z.string().min(1, 'Profile Image is required'),
    }),
  }),
});

const updateNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1, 'First Name is required')
    .max(10, 'First Name cannot be more than 10 characters')
    .refine(
      (value) => value.charAt(0).toUpperCase() + value.slice(1) === value,
      {
        message: 'First Name must start with a capital letter',
      },
    )
    .optional(),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .min(1, 'Last Name is required')
    .refine((value) => /^[a-zA-Z]+$/.test(value), {
      message: 'Last Name must be alphabetic',
    })
    .optional(),
});
const updateGuardianValidationSchema = z.object({
  fatherName: z.string().min(1, 'Father Name is required').optional(),
  fatherOccupation: z
    .string()
    .min(1, 'Father Occupation is required')
    .optional(),
  fatherContactNo: z
    .string()
    .min(1, 'Father Contact Number is required')
    .optional(),
  motherName: z.string().min(1, 'Mother Name is required').optional(),
  motherOccupation: z
    .string()
    .min(1, 'Mother Occupation is required')
    .optional(),
  motherContactNo: z
    .string()
    .min(1, 'Mother Contact Number is required')
    .optional(),
});

const updateLocalGuardianValidationSchema = z.object({
  name: z.string().min(1, 'Local Guardian Name is required').optional(),
  occupation: z
    .string()
    .min(1, 'Local Guardian Occupation is required')
    .optional(),
  contactNo: z
    .string()
    .min(1, 'Local Guardian Contact Number is required')
    .optional(),
  address: z.string().min(1, 'Local Guardian Address is required').optional(),
});

const updateStudentValidationSchema = z.object({
  body: z.object({
    student: z.object({
      name: updateNameValidationSchema.optional(),
      gender: z
        .enum(['male', 'female', 'other'], {
          errorMap: () => ({ message: 'Gender is required' }),
        })
        .optional(),
      dateOfBirth: z.string().optional(),
      email: z
        .string()
        .email('Invalid email format')
        .min(1, 'Email is required')
        .optional(),
      contactNo: z.string().min(1, 'Contact Number is required').optional(),
      emergencyContactNo: z
        .string()
        .min(1, 'Emergency Contact Number is required')
        .optional(),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
          errorMap: () => ({ message: 'Blood Group is required' }),
        })
        .optional(),
      presentAddress: z
        .string()
        .min(1, 'Present Address is required')
        .optional(),
      permanentAddress: z
        .string()
        .min(1, 'Permanent Address is required')
        .optional(),
      guardian: updateGuardianValidationSchema.optional(),
      localGuardian: updateLocalGuardianValidationSchema.optional(),
      admissionSemester: z.string().optional(),
      academicDepartment: z.string().optional(),
      profileImg: z.string().min(1, 'Profile Image is required').optional(),
    }),
  }),
});

export const studentValidations = {
  createStudentValidationSchema,
  updateStudentValidationSchema,
};
