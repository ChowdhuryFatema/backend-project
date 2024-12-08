import mongoose from 'mongoose';
import { TErrorSources, TGenericErrorResponse } from '../interface/error';



const handleValidationError = (error: mongoose.Error.ValidationError): TGenericErrorResponse => {
  // Map validation errors into the custom error structure
  const errorSources: TErrorSources = Object.values(error.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: val?.path, // Path of the error
        message: val?.message, // Error message
      };
    },
  );



  // Define the status code
  const statusCode = 400;

  // Return the error response object
  return {
    statusCode,
    message: 'Validation Error',
    errorSources,
  };
};

export default handleValidationError;
