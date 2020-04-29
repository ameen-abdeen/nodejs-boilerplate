import { HTTP_REPONSE_CODES } from '../utils/constants';
import HttpException from './HttpException';

class UnauthourizedException extends HttpException {
  constructor() {
    super(HTTP_REPONSE_CODES.UNAUTHORIZED, `Unauthorized`);
  }
}

export default UnauthourizedException;
