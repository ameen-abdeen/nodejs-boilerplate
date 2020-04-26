/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import 'dotenv/config';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import ExplorerController from './explorer/explorer.controller';
import App from './app';
import * as config from './ormconfig';
import PostController from './post/post.controller';
import validateEnv from './utils/validateEnv';

validateEnv();

(async () => {
  try {
    const connection = await createConnection(config);
    await connection.runMigrations();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('Error while connecting to the database', error);
    return error;
  }
  const app = new App([new ExplorerController(), new PostController()]);
  app.listen();
})();
