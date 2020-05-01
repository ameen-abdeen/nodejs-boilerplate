import * as express from 'express';
import logger from '../utils/logger';
import { API, V1, HTTP_REPONSE_CODES, MESSAGES } from '../utils/constants';
import Controller from '../interfaces/controller.interface';
import validationMiddleware from '../middleware/validation.middleware';
import CreatePostDto from './post.dto';
import PostService from './post.service';
import Post from './post.entity';
import authMiddleware from '../middleware/auth.middleware';

class PostController implements Controller {
  public path = `/${API}/${V1}/post`;

  public router = express.Router();

  public postService = new PostService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    /**
     * @swagger
     * /post:
     *   get:
     *      tags:
     *        - Post
     *      description: Get all posts
     *      responses:
     *        200:
     *          description: Array of posts
     */
    this.router.get(this.path, this.getAllPosts);

    /**
     * @swagger
     * /post/{id}:
     *   get:
     *      tags:
     *        - Post
     *      description: Get post by id
     *      parameters:
     *        - in : path
     *          name: id
     *          type: integer
     *          required: true
     *      responses:
     *         200:
     *           description: returns an post object
     */
    this.router.get(`${this.path}/:id`, this.getPostById);

    this.router
      .all(`${this.path}/*`, authMiddleware)

      /**
       * @swagger
       * /post/{id}:
       *   patch:
       *      tags:
       *        - Post
       *      description: Update elements of a certain post
       *      parameters:
       *        - in : path
       *          name: id
       *          type: integer
       *          required: true
       *        - in: body
       *          name: PostObject
       *          description: Post object to be saved.
       *          schema:
       *              type: object
       *              properties:
       *                  author:
       *                      type: string
       *                  title:
       *                      type: string
       *                  content:
       *                      type: string
       *      responses:
       *         200:
       *           description: returns an post object
       */
      .patch(
        `${this.path}/:id`,
        validationMiddleware(CreatePostDto, true),
        this.modifyPost,
      )

      /**
       * @swagger
       * /post/{id}:
       *   delete:
       *      tags:
       *        - Post
       *      description: Delete a post by id
       *      parameters:
       *        - in : path
       *          name: id
       *          type: integer
       *          required: true
       *      responses:
       *         200:
       *           description: If success will send 200 status code
       */
      .delete(`${this.path}/:id`, this.deletePost)

      /**
       * @swagger
       * /post:
       *   post:
       *      tags:
       *        - Post
       *      description: Create a new Post
       *      parameters:
       *        - in: body
       *          name: PostObject
       *          description: Post object to be saved.
       *          schema:
       *              type: object
       *              required:
       *                  - author
       *                  - title
       *                  - content
       *              properties:
       *                  author:
       *                      type: string
       *                  title:
       *                      type: string
       *                  content:
       *                      type: string
       *      responses:
       *         201:
       *           description: Returns the created object
       */
      .post(
        this.path,
        authMiddleware,
        validationMiddleware(CreatePostDto),
        this.createPost,
      );
  }

  private getAllPosts = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction,
  ): Promise<void> => {
    try {
      logger.info(`Get All Post Invocation`);
      const posts = await this.postService.getAllPosts();
      response.send(posts);
    } catch (error) {
      next(error);
    }
  };

  private getPostById = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction,
  ): Promise<void> => {
    logger.info(`Get Post By Id Invocation`);
    logger.debug(`Post id passed - ${request.params}`);
    const { id } = request.params;
    try {
      const post = await this.postService.getPostById(Number(id));
      response.send(post);
    } catch (error) {
      next(error);
    }
  };

  private modifyPost = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction,
  ): Promise<void> => {
    logger.info(`Modify Post Invocation`);
    logger.debug(`Post id passed - ${request.params}`);
    logger.debug(
      `Post elements to be updated - ${JSON.stringify(request.body)}`,
    );
    const { id } = request.params;
    const postData: Post = request.body;
    try {
      const post = await this.postService.modifyPost(Number(id), postData);
      response.send(post);
    } catch (error) {
      next(error);
    }
  };

  private createPost = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction,
  ): Promise<void> => {
    logger.info(`Create Post Invocation`);
    logger.debug(`Post to be created - ${JSON.stringify(request.body)}`);
    const postData: CreatePostDto = request.body;
    try {
      const post = await this.postService.createPost(postData);
      response.status(HTTP_REPONSE_CODES.CREATED).send(post);
    } catch (error) {
      next(error);
    }
  };

  private deletePost = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction,
  ): Promise<void> => {
    logger.info(`Delete Post Invocation`);
    logger.debug(`Post to be deleted - ${request.params}`);
    const { id } = request.params;
    try {
      await this.postService.deletePost(Number(id));
      response.status(HTTP_REPONSE_CODES.OK).send(MESSAGES.POST_DELETE_SUCCESS);
    } catch (error) {
      next(error);
    }
  };
}

export default PostController;
