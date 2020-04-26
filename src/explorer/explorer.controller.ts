import Controller from 'interfaces/controller.interface';
import * as express from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { API, V1 } from '../utils/constants';

class ExplorerController implements Controller {
  public path = `/${API}/${V1}/explorer`;

  public router = express.Router();

  options = {
    swaggerDefinition: {
      basePath: `/${API}/${V1}/`,
      info: {
        title: 'Post APIs',
        version: '1.0.0',
        description: `Swagger Definitions`,
      },
      securityDefinitions: {
        auth: {
          type: 'apiKey',
          name: 'Authorization',
        },
        orgId: {
          type: 'apiKey',
          name: 'organizationId',
        },
      },
      security: [{ auth: [], orgId: [] }],
    },
    apis: [`${__dirname}/*.ts`, `${__dirname}/*.js`],
  };

  swaggerSpec = swaggerJSDoc(this.options);

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(`${this.path}/health_check`, this.getServiceHealth);
    this.router.use(
      `${this.path}`,
      swaggerUi.serve,
      swaggerUi.setup(this.swaggerSpec),
    );
  }

  private getServiceHealth = async (
    request: express.Request,
    response: express.Response,
  ): Promise<void> => {
    response.send(`Health check on ${new Date()}`);
  };
}

export default ExplorerController;
