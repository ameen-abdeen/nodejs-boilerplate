/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import * as express from 'express';
import logger from '../utils/logger';
import { HTTP_REPONSE_CODES } from '../utils/constants';
import HttpException from '../exceptions/HttpException';

function validationMiddleware<T>(
  type: any,
  skipMissingProperties = false,
): express.RequestHandler {
  return (req, res, next) => {
    logger.info(`Request validation for ${type}`);
    validate(plainToClass(type, req.body), { skipMissingProperties }).then(
      (errors: ValidationError[]) => {
        if (errors.length > 0) {
          const message = errors
            .map((error: ValidationError) => Object.values(error.constraints))
            .join(', ');
          next(new HttpException(HTTP_REPONSE_CODES.BAD_REQUEST, message));
        } else {
          next();
        }
      },
    );
  };
}

export default validationMiddleware;
