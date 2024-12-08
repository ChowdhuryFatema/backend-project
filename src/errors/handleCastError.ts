import mongoose from 'mongoose';
import { TErrorSources, TGenericErrorResponse } from '../interface/error';

const handleCastError = (
  error: mongoose.Error.CastError,
): TGenericErrorResponse => {
  const errorSources: TErrorSources = [
    {
      path: error.path,
      message: error.message,
    },
  ];
  // Define the status code
  const statusCode = 400;

  // Return the error response object
  return {
    statusCode,
    message: 'Invalid ID',
    errorSources,
  };
};

export default handleCastError;
