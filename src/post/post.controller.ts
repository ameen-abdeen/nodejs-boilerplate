import * as express from 'express';
import { API, V1 } from '../utils/constants';
import Controller from '../interfaces/controller.interface';
import validationMiddleware from '../middleware/validation.middleware';
import CreatePostDto from './post.dto';
import PostService from './post.service';
import Post from './post.entity';

class PostController implements Controller {
  public path = `/${API}/${V1}/post`;

  public router = express.Router();

  public postService = new PostService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(this.path, this.getAllPosts);
    this.router.get(`${this.path}/:id`, this.getPostById);
    this.router.patch(
      `${this.path}/:id`,
      validationMiddleware(CreatePostDto, true),
      this.modifyPost,
    );
    this.router.delete(`${this.path}/:id`, this.deletePost);
    this.router.post(
      this.path,
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
    const { id } = request.params;
    try {
      const post = await this.postService.getPostById(id);
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
    const { id } = request.params;
    const postData: Post = request.body;
    try {
      const post = await this.postService.modifyPost(id, postData);
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
    const postData: CreatePostDto = request.body;
    try {
      const post = await this.postService.createPost(postData);
      response.send(post);
    } catch (error) {
      next(error);
    }
  };

  private deletePost = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction,
  ): Promise<void> => {
    const { id } = request.params;
    try {
      await this.postService.deletePost(id);
      response.send(200);
    } catch (error) {
      next(error);
    }
  };
}

export default PostController;
