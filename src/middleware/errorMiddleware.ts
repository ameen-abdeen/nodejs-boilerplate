/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Request, Response, NextFunction } from 'express';
import { HTTP_REPONSE_CODES } from '../utils/constants';
import HttpException from '../exceptions/HttpException';
import { logger } from '../utils/logger';

function errorMiddleware(
  error: HttpException,
  request: Request,
  response: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) {
  const status = error.status || HTTP_REPONSE_CODES.INTERNAL_SERVER_ERROR;
  const message = error.message || 'Something went wrong';
  logger.error({
    path: request.path,
    status,
    message,
    headers: request.headers,
    params: request.params,
    body: request.body,
  });

  response.status(status).send({
    status,
    message,
  });
}

export default errorMiddleware;
