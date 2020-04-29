/** api prefix for all endpoints */
export const API = 'api';

/** version prefix for all endpoints */
export const V1 = 'v1';

/** http response codes */
export const enum HTTP_REPONSE_CODES {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  PAYLOAD_TOO_LARGE = 413,
  INTERNAL_SERVER_ERROR = 500,
}

/** General messages used throughout the app. */
export const enum MESSAGES {
  POST_DELETE_SUCCESS = 'Successfully deleted post',
}
