import { HTTP_REPONSE_CODES } from '../utils/constants';
import HttpException from './HttpException';

class PostNotFoundException extends HttpException {
  constructor(id: number) {
    super(HTTP_REPONSE_CODES.NOT_FOUND, `Post with id ${id} not found`);
  }
}

export default PostNotFoundException;
