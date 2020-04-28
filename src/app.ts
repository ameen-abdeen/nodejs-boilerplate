import * as bodyParser from 'body-parser';
import express from 'express';
import morgan from 'morgan';
import path from 'path';
import rfs from 'rotating-file-stream';
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

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    morgan.token('body', (req, res) => {
      return JSON.stringify(req.body);
    });

    // create a rotating write stream
    const accessLogStream = rfs('access.log', {
      interval: '1d', // rotate daily
      path: path.join(__dirname, 'logs'),
    });
    this.app.use(
      morgan(
        ':date[web] :method :url :status :response-time [request - :body]',
        {
          stream: accessLogStream,
        },
      ),
    );
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
