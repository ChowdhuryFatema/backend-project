import Joi from 'joi';

const userNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .max(10)
    .required()
    .regex(/^[A-Z][a-z]*$/)
    .message(
      'First Name must be capitalized and no more than 10 characters long',
    ),
  middleName: Joi.string(),
  lastName: Joi.string()
    .required()
    .regex(/^[A-Za-z]+$/)
    .message('Last Name must contain only letters'),
});

const guardianValidationSchema = Joi.object({
  fatherName: Joi.string()
    .required()
    .messages({ 'any.required': 'Father Name is required' }),
  fatherOccupation: Joi.string()
    .required()
    .messages({ 'any.required': 'Father Occupation is required' }),
  fatherContactNo: Joi.string()
    .required()
    .messages({ 'any.required': 'Father Contact Number is required' }),
  motherName: Joi.string()
    .required()
    .messages({ 'any.required': 'Mother Name is required' }),
  motherOccupation: Joi.string()
    .required()
    .messages({ 'any.required': 'Mother Occupation is required' }),
  motherContactNo: Joi.string()
    .required()
    .messages({ 'any.required': 'Mother Contact Number is required' }),
});

const localGuardianValidationSchema = Joi.object({
  name: Joi.string()
    .required()
    .messages({ 'any.required': 'Local Guardian Name is required' }),
  occupation: Joi.string()
    .required()
    .messages({ 'any.required': 'Local Guardian Occupation is required' }),
  contactNo: Joi.string().required().messages({
    'any.required': 'Local Guardian Contact Number is required',
  }),
  address: Joi.string()
    .required()
    .messages({ 'any.required': 'Local Guardian Address is required' }),
});

const studentValidationSchema = Joi.object({
  id: Joi.string()
    .required()
    .messages({ 'any.required': 'Student ID is required' }),
  name: userNameValidationSchema
    .required()
    .messages({ 'any.required': 'Name is required' }),
  gender: Joi.string().valid('male', 'female', 'other').required().messages({
    'any.required': 'Gender is required',
    'any.only': '{#value} is not a valid gender',
  }),
  dateOfBirth: Joi.string(),
  email: Joi.string().email().required().messages({
    'any.required': 'Email is required',
    'string.email': '{#value} is not a valid email type',
  }),
  contactNo: Joi.string()
    .required()
    .messages({ 'any.required': 'Contact Number is required' }),
  emergencyContactNo: Joi.string()
    .required()
    .messages({ 'any.required': 'Emergency Contact Number is required' }),
  bloodGroup: Joi.string()
    .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
    .allow(null, ''),
  presentAddress: Joi.string()
    .required()
    .messages({ 'any.required': 'Present Address is required' }),
  permanentAddress: Joi.string()
    .required()
    .messages({ 'any.required': 'Permanent Address is required' }),
  guardian: guardianValidationSchema
    .required()
    .messages({ 'any.required': 'Guardian information is required' }),
  localGuardian: localGuardianValidationSchema
    .required()
    .messages({ 'any.required': 'Local Guardian information is required' }),
  profileImg: Joi.string().uri(),
  isActive: Joi.string().valid('active', 'blocked').default('active'),
});

export default studentValidationSchema;
