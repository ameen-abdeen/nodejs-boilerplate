import * as bodyParser from 'body-parser';
import express from 'express';
import logger from './utils/logger';
import Controller from './interfaces/controller.interface';
import errorMiddleware from './middleware/error.middleware';

class App {
  private app: express.Application;

  constructor(controllers: Controller[]) {
    this.app = express();

    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();
  }

  public listen(): void {
    this.app.listen(process.env.SERVER_PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`App listening on the port ${process.env.SERVER_PORT}`);
    });
  }

  public getServer(): express.Application {
    return this.app;
  }

  private initializeMiddlewares(): void {
    this.app.use(bodyParser.json());

    this.app.use((req, res, next) => {
      logger.info(`${res.statusCode} ${req.method} ${req.path}`);
      next();
    });
  }

  private initializeErrorHandling(): void {
    this.app.use(errorMiddleware);
  }

  private initializeControllers(controllers: Controller[]): void {
    controllers.forEach((controller) => {
      this.app.use('/', controller.router);
    });
  }
}

export default App;
