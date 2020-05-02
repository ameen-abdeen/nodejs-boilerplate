/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { HTTP_REPONSE_CODES } from 'utils/constants';
import HttpException from '../exceptions/HttpException';
import UnauthourizedException from '../exceptions/UnauthourizedException';
import { DecodedJwt } from '../interfaces/jwt.interface';
import { formatToken } from '../utils/helper';

export const KEYCLOAK_BASE = `${process.env.KEYCLOAK_API_URL}/realms/${process.env.KEYCLOAK_REALM}`;

async function authMiddleware(
  request: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) {
  if (request.headers.authorization) {
    try {
      const axiosRes = await axios.get(
        `${KEYCLOAK_BASE}/protocol/openid-connect/userinfo`,
        formatToken(request.headers.authorization),
      );

      const decodedJwt: DecodedJwt = jwtDecode(request.headers.authorization);

      if (axiosRes.data && axiosRes.data.sub) {
        res.locals.accessToken = request.headers.authorization;
        res.locals.decodedJwt = decodedJwt;
        next();
      } else {
        next(new UnauthourizedException());
      }
    } catch (err) {
      const statusNumber =
        (err.response && err.response.status) ||
        HTTP_REPONSE_CODES.INTERNAL_SERVER_ERROR;
      let errorMessage = err.message || 'Unauthorized';
      if (
        err.response &&
        err.response.data &&
        err.response.data.error_description
      ) {
        errorMessage = err.response.data.error_description;
      }
      next(new HttpException(statusNumber, errorMessage));
    }
  } else {
    next(new UnauthourizedException());
  }
}

export default authMiddleware;
