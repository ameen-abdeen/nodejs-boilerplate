import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import _ from 'lodash';

const { combine, printf } = winston.format;

const logFormat = printf(
  ({ level, timestamp, message, ...rest }) =>
    `${timestamp} ${level}: [${JSON.stringify(message)}] ${
      _.isEmpty(rest) ? '' : ` => ${JSON.stringify(rest)}`
    } `,
);

const transport = new DailyRotateFile({
  filename: '%DATE%.log',
  dirname: 'logs',
  maxSize: '20m',
  maxFiles: '14d',
  level: process.env.LOG_LEVEL,
});

export default winston.createLogger({
  format: combine(winston.format.timestamp(), logFormat),
  transports: [
    transport,
    new winston.transports.Console({ level: process.env.LOG_LEVEL }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});
