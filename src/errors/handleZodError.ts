import { ZodError, ZodIssue } from 'zod';
import { TGenericErrorResponse } from '../interface/error';

const handleZodError = (error: ZodError): TGenericErrorResponse => {
  // Map the Zod issues into a custom error structure
  const errorSources = error.issues.map((issue: ZodIssue) => {
    return {
      path: issue.path[issue.path.length - 1],
      message: issue.message,
    };
  });

  // Define the status code
  const statusCode = 400;

  // Return the error response object
  return {
    statusCode,
    message: 'Validation Error',
    errorSources,
  };
};

export default handleZodError;
